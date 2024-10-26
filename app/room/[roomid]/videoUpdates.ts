'use server'

import { getUser } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";

export async function seekVideo(roomID: string, seekTime: number) {
    const user = await getUser();
    const supabase = await createClient();
    const { data: roomRow, error } = await supabase.from('rooms').select('created_by, open_control').eq('id', roomID).single();
    if (error) {
        throw error;
    } else if (!roomRow.open_control && user.id != roomRow.created_by) {
        return;
    }
    await supabase.from('rooms').update({ seek_time: seekTime, state_changed_at: 'NOW()' }).eq('id', roomID);
}

export async function pausePlayVideo(roomID: string, state: "paused" | "playing", seekTime: number) {
    const user = await getUser();
    const supabase = await createClient();
    const { data: roomRow, error } = await supabase.from('rooms').select('created_by, open_control').eq('id', roomID).single();
    if (error) {
        throw error;
    } else if (!roomRow.open_control && user.id != roomRow.created_by) {
        return;
    }
    await supabase.from('rooms').update({ video_state: state, seek_time: seekTime, state_changed_at: 'NOW()' }).eq('id', roomID);
}