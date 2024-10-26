import Link from "next/link";

export default function Home() {
  "use client";
  return (
    <div className="text-center">
      <h1 className="text-5xl mb-2">Welcome to <b>Ruumi</b></h1>
      <h2 className="mb-4">Watch videos in <i>ruums</i> with friends &lt;3</h2>
      <br />
      <Link className="p-3 rounded-md bg-white text-black" href="/browse">Browse Shows</Link>
    </div>
  );
}
