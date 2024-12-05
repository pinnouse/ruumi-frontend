import { getShowById, listShowEpisodes } from "@/app/lib/shows";
import EpisodeList from "./episodeList";
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";

type Params = Promise<{ showid: string }>;

export const revalidate = 3600;

export default async function AnimePage(props: { params: Params }) {
  const params = await props.params;
  const show = await getShowById(params.showid);
  const episodes = await listShowEpisodes(params.showid);
  return (
    <div className="relative h-svh">
      <div
        className="absolute top-0 opacity-10 left-0 bg-cover bg-top w-full h-96 z-0 blur-md"
        style={{ backgroundImage: `url('${show.poster_url}')` }}
      ></div>
      <Link className="relative p-1 hover:underline z-10" href="/browse">
        <ArrowLeftIcon className="inline h-4 w-4" /> Back
      </Link>
      <div className="relative flex flex-col md:flex-row z-10 p-8">
        <img
          src={show.poster_url || "none.jpg"}
          alt={show.title}
          className="w-48 h-72 rounded-sm mr-4 pointer-events-none"
        />
        <div className="flex flex-col justify-end">
          <h1 className="text-2xl">
            Watch <span className="font-bold">{show.title}</span>
          </h1>
          {show.alt_titles &&
            show.alt_titles.length > 0 &&
            show.alt_titles.map((t, i) => (
              <h2 key={i} className="text-lg">
                <i>{t}</i>
              </h2>
            ))}
          <a
            href={`https://anilist.co/anime/${show.anilist_id}`}
            target="_blank"
            className="text-teal-500 mt-2 hover:underline"
          >
            AniList <ArrowTopRightOnSquareIcon className="inline h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="bg-teal-50/15 rounded-lg shadow-lg p-8 relative z-10">
        {show.description && (
          <p className="text-gray-300 whitespace-pre-line">
            {show.description}
          </p>
        )}
        <div className="relative z-10 mt-3">
          <h2 className="text-lg">Episodes</h2>
          <p className="text-gray-400">
            Select an episode below to open a room and start watching
          </p>
          <EpisodeList episodes={episodes} />
        </div>
      </div>
    </div>
  );
}
