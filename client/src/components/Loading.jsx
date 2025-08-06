function Loading() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full max-w-7xl">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-lg overflow-hidden animate-pulse"
          >
            <div className="h-52 bg-gray-700"></div>
            <div className="p-3">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Loading;
