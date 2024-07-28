import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { server } from "../server";

const ChooseHotspot = () => {
  const [searchParams] = useSearchParams();
  let lat = searchParams.get("lat");
  let lon = searchParams.get("lon");
  const [hotspots, setHotspots] = useState([]);

  useEffect(() => {
    server
      .post(`/api/itinerary/hotspot`, { lat, lon })
      .then((res) => {
        // console.log(res?.data?.hotspots);
        setHotspots(res?.data?.hotspots);
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching data");
      });
  }, [lat, lon]);

  return (
    <div className="pb-4 px-4 w-full md:max-w-[80%] lg:max-w-[60%] mx-auto my-10">
      <header className="text-center font-semibold mb-2">
        Choose a Hotspot Location
      </header>
      <ul
        role="list"
        className="divide-y divide-gray-100 h-[80dvh] overflow-auto no-scrollbar"
      >
        {hotspots.map((hotspot, index) => (
          <Link
            to={`/wb/${hotspot?.id}?lat=${lat}&lon=${lon}`}
            key={index}
            className="flex justify-between gap-x-6 hover:bg-white/40 p-4 rounded-md"
          >
            <div className="flex min-w-0 gap-x-4">
              <img
                alt={hotspot?.name}
                src={hotspot?.image}
                className="aspect-video h-24 flex-none rounded-md bg-gray-50"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {hotspot?.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {hotspot?.description}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{hotspot?.role}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                <time dateTime={hotspot?.lastSeenDateTime}>
                  {hotspot?.distance} km away
                </time>
              </p>
              {index === 0 && (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Recommended</p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ChooseHotspot;
