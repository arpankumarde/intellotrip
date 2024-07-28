import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Groq from "groq-sdk";
import { server } from "../server";

const SItinerary = () => {
  const { id } = useParams();
  const [hotspot, setHotspot] = useState([]);
  const [tabDay, setTabDay] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    server
      .post(`/api/itinerary/fetch`, { id: parseInt(id) })
      .then((res) => {
        let resul = res?.data?.results[0];
        console.log(resul);
        resul.itinerary = JSON.parse(resul.itinerary);
        setHotspot(resul);
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching data");
      });

    setLoading(false);
  }, [id]);

  return (
    <div className="space-y-2 mt-2">
      <div className="flex justify-between items-center px-2 md:px-4">
        <div className="flex gap-2 text-xl font-bold text-center">
          Optimised
        </div>
        <div className="flex justify-center divide-x">
          {hotspot?.itinerary?.map((day, index) => (
            <button
              key={index}
              onClick={() => setTabDay(day?.day)}
              className={`w-40 shadow-xl py-2 ${
                day?.day === tabDay ? "bg-white" : "bg-white/40"
              } first:rounded-s-md last:rounded-e-md`}
            >
              Day {day?.day}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2 flex justify-center">
        {hotspot?.itinerary
          ?.filter((day) => day?.day === tabDay)
          ?.map((day, index) => (
            <div key={index} className="w-full p-2 md:w-[80%]">
              <div className="text-xl font-bold">
                Day {tabDay}: {day?.title}
              </div>
              <div className="text-lg">{day?.description}</div>
              <div className="text-lg font-bold">Tourist Spots</div>
              <div className="grid grid-cols-1 gap-2">
                {day?.tourist_spots?.map((spot, index) => (
                  <div key={index} className="first:pt-2">
                    <ol className="relative border-l border-gray-400 ml-6">
                      <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-7 h-7 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                          {index + 1}
                        </span>
                        <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                          {spot?.name}
                        </h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-600">
                          Price: {spot?.price} | Time: {spot?.time}
                        </time>
                        <p className="mb-4 text-base font-normal text-gray-500">
                          {spot?.description}
                        </p>
                      </li>
                    </ol>
                  </div>
                ))}
              </div>
              <div className="text-lg font-bold">Food</div>
              <div className="grid grid-cols-1 gap-2">
                {day?.food?.map((food, index) => (
                  <div key={index} className="bg-white/30 p-2 rounded-md">
                    <div className="text-lg font-bold">{food?.name}</div>
                    <div className="text-md">{food?.description}</div>
                    <div className="text-md">
                      Price: {food?.price} | Time: {food?.time}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-lg font-bold">Hotels</div>
              <div className="grid grid-cols-1 gap-2">
                {day?.hotels?.map((hotel, index) => (
                  <div key={index} className="bg-white/30 p-2 rounded-md">
                    <div className="text-lg font-bold">{hotel?.name}</div>
                    <div className="text-md">{hotel?.description}</div>
                    <div className="text-md">
                      Price: {hotel?.price} | Rating: {hotel?.rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SItinerary;
