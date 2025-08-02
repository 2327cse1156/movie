import { useState } from "react";
import { dummyTrailers } from "../assets/assets";

export default function TrailerSection() {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className="w-full flex flex-col items-center px-6 md:px-12 lg:px-24 py-10 bg-gradient-to-b from-gray-900 to-black text-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-2 text-center">
        🎬 <span>Trailers</span>
      </h2>

      {/* Main Video Player */}
      <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 mb-8">
        <iframe
          width="100%"
          height="100%"
          src={currentTrailer.videoUrl.replace("watch?v=", "embed/")}
          title="YouTube video"
          className="rounded-xl"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto justify-center w-full max-w-5xl pb-3">
        {dummyTrailers.map((trailer, index) => (
          <div
            key={index}
            className={`relative flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              currentTrailer.videoUrl === trailer.videoUrl
                ? "border-red-500 scale-105"
                : "border-transparent hover:scale-105"
            }`}
            onClick={() => setCurrentTrailer(trailer)}
          >
            <img
              src={trailer.image}
              alt={`Trailer ${index + 1}`}
              className="w-44 h-28 object-cover"
            />
            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
