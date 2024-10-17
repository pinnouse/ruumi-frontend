import { getShowById, listShowEpisodes } from "@/app/lib/shows";
import EpisodeCard from "./episodeCard";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";

export default async function AnimePage({
  params,
}: {
  params: { showid: string };
}) {
  const show = await getShowById(params.showid);
  const episodes = await listShowEpisodes(params.showid);
  return (
    <div className="relative h-svh">
      <div
        className="absolute top-0 opacity-10 left-0 bg-cover bg-top w-full h-svh z-0 blur-md"
        style={{ backgroundImage: `url('${show.poster_url}')` }}
      ></div>
      <div className="relative flex flex-col md:flex-row z-10 p-8 rounded-lg">
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
          {show.description && <p>{show.description}</p>}
          <a
            href={`https://anilist.co/anime/${show.anilist_id}`}
            target="_blank"
            className="text-teal-500 hover:underline"
          >
            AniList <ArrowTopRightOnSquareIcon className="inline h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="relative z-10">
        <h2 className="text-lg">Episodes</h2>
        <p className="text-gray-400">
          Select an episode below to open a room and start watching
        </p>
        <div className="flex flex-wrap">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode_data={episode} />
          ))}
        </div>
      </div>
    </div>
  );
}
