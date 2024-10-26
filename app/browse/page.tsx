import { listAllShows } from "@/app/lib/shows";
import Link from "next/link";

interface ShowData {
  id: string;
  title: string;
  poster_url: string;
}

function ShowCard(showData: ShowData) {
  const safeUrl = encodeURI(showData.poster_url);
  return (
    <Link key={showData.id} href={`/browse/${showData.id}`}>
      <div className="relative w-72 h-48 m-4 transition duration-300 rounded-lg overflow-hidden p-2 ring-1 ring-white hover:ring-2 hover:scale-105 hover:underline">
        <div
          className="absolute opacity-50 top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center z-0"
          style={{ backgroundImage: `url('${safeUrl}')` }}
        ></div>
        <div className="relative top-2 left-2 font-bold z-10">
          {showData.title}
        </div>
      </div>
    </Link>
  );
}

export const revalidate = 300;

export default async function Page() {
  const shows = (await listAllShows()) as ShowData[];
  return (
    <div>
      <h1 className="text-2xl">
        <b>Browse</b> all shows
      </h1>
      <h2 className="text-gray-400">Search coming soon...</h2>
      <div className="flex flex-wrap">{shows.map((s) => ShowCard(s))}</div>
    </div>
  );
}
