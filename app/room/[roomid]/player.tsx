"use client";

import { createClient } from "@/app/lib/supabase/client";
import { Tables } from "@/app/lib/supabase/database.types";
import { useMediaRemote, MediaPlayer, MediaProvider, MediaSeekRequestEvent, MediaPlayerInstance, MediaPlayEvent, MediaPauseEvent } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useEffect, useRef, useState } from "react";
import { pausePlayVideo, seekVideo } from "@/app/room/[roomid]/videoUpdates";

type EpisodeMeta = {
        episode_number: number;
        anime: {
            id: string;
            title: string;
            poster_url: string | null;
        } | null;
};

type PlayState = {
    state: 'playing' | 'paused';
    seek: number;
    open: boolean;
}

export default function Player({ roomData, meta, userID }: { roomData: Tables<"rooms">, meta: EpisodeMeta, userID: string }) {
    const player = useRef<MediaPlayerInstance>(null);
    const remote = useMediaRemote();
    useEffect(() => {
        remote.setPlayer(player.current);
    }, [player]);
    const [state, setState] = useState<PlayState>({
        state: 'paused', seek: 0, open: false
    });
    const [authed, setAuthed] = useState(roomData.created_by == userID);
    useEffect(() => {
        handleUpdate({
            "video_state": roomData.video_state,
            "seek_time": roomData.seek_time,
            "open_control": roomData.open_control
        });

        const supabase = createClient();
        supabase.channel('room_updates').on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rooms' }, payload => {
            handleUpdate(payload.new);
        }).subscribe();
    }, []);

    function handleUpdate(newState: {[key: string]: any}) {
        let oldState = state;
        const seek = newState['seek_time'], playState = newState['video_state'], openState = newState['open_control']
        console.log('new play state', playState)
        if (seek != oldState.seek) {
            oldState.seek = seek;
            remote.seeking(seek/100);
            remote.seek(seek/100);
        }

        if (playState == 'paused') {
            remote.pause();
            oldState.state = 'paused';
        } else {
            remote.play();
            oldState.state = 'playing';
        }

        if (openState) {
            setAuthed(true);
        }
        setState(oldState);
    }

    function seekHandler(time: number, nativeEvent: MediaSeekRequestEvent) {
        // nativeEvent.preventDefault();
        if (authed) {
            const timeMS = Math.round(time * 100);
            setState({ ...state, seek: timeMS });
            seekVideo(roomData.id, timeMS);
        }
    }

    function playHandler(nativeEvent: MediaPlayEvent) {
        if (authed) {
            console.log('playing')
            const timeMS = Math.round(player.current!.currentTime * 100);
            setState({ ...state, seek: timeMS, state: 'playing' });
            pausePlayVideo(roomData.id, 'playing', timeMS);
        }
    }

    function pauseHandler(nativeEvent: MediaPauseEvent) {
        if (authed) {
            console.log('pausing')
            const timeMS = Math.round(player.current!.currentTime * 100);
            setState({ ...state, seek: timeMS, state: 'paused' });
            pausePlayVideo(roomData.id, 'paused', timeMS);
        }
    }

    return <div>
        <MediaPlayer
        ref={player}
        title={`${meta.anime!.title} - ${meta.episode_number.toString().padStart(2, '0')}`}
        src={roomData.video_url}
        onSeeked={seekHandler}
        onPlay={playHandler}
        onPause={pauseHandler}
        >
            <MediaProvider />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
        </MediaPlayer>
    </div>
}