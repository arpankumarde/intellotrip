import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Groq from "groq-sdk";
import { server } from "../server";
import { LiaRedoAltSolid } from "react-icons/lia";
import { IoMdShare } from "react-icons/io";

// const groq = new Groq({
//   apiKey: import.meta.env.VITE_GROQ_API_KEY,
//   dangerouslyAllowBrowser: true,
// });

// const GroqGenAI = ({ start, tourist_spots }) => {
//   return groq.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content:
//           "You are a tour itinerary planner. Your task is to generate a detailed daily itinerary for a tour in JSON format. The itinerary should be based on the provided starting location, and an array of available tourist spots with their distances from the starting location (hotspot). The JSON format should strictly follow the structure provided below. Each day, tourists should check into a new hotel and visit 2 to 3 tourist spots. Ensure that the schedule is realistic and enjoyable. Make sure the farthest place of the route is scheduled to be be visited first and then on the way back to hotel, other nearby spots can be covered. Input Data: Start Date, End Date, Starting Location (Hotspot) and Tourist Spots. {itinerary:[{day:1,title:Arrival & Cultural Immersion,description:Explore the heart of Kolkata, starting with its iconic landmarks and vibrant culture.,tourist_spots:[{name:Victoria Memorial,description:Admire the majestic architecture and learn about colonial history.,price:INR 20,time:2 hours},{name:St. Paul's Cathedral,description:Visit this historic church and appreciate its gothic design.,price:Free,time:1 hour},{name:Indian Museum,description:Explore a vast collection of artifacts showcasing India's rich cultural heritage.,price:INR 10,time:3 hours}],food:[{name:Park Street,description:Experience Kolkata's vibrant nightlife with a wide range of restaurants and bars.,price:INR 500-1000,time:Dinner}],hotels:[{name:The Oberoi Grand,checkInTime:,checkOutTime:,price:INR 8000-10000 per night,rating:5 stars,description:A luxurious heritage hotel known for its impeccable service and elegant ambience.}]},{day:2,title:Calcutta's Soul: Temples & Markets,description:Dive into the spirituality and bustling marketplaces that define Kolkata.,tourist_spots:[{name:Kalighat Kali Temple,description:Experience the powerful energy of this sacred temple dedicated to the goddess Kali.,price:Free,time:1 hour},{name:Dakshineswar Kali Temple,description:Visit this picturesque temple on the banks of the Ganges.,price:Free,time:2 hours},{name:College Street Book Market,description:Explore a vibrant marketplace offering a wide array of books and stationery.,price:Free,time:2 hours}],food:[{name:Oh! Calcutta,description:Enjoy authentic Bengali cuisine at this popular restaurant.,price:INR 500-1000,time:Lunch}],hotels:[{name:The Oberoi Grand,checkInTime:,checkOutTime:,price:INR 8000-10000 per night,rating:5 stars,description:A luxurious heritage hotel known for its impeccable service and elegant ambience.}]},{day:3,title:A Glimpse of Colonial History,description:Journey back in time through architectural marvels and colonial remnants.,tourist_spots:[{name:Fort William,description:Explore the historic fort and learn about its role in colonial India.,price:INR 10,time:2 hours},{name:Writers' Building,description:Admire the colonial architecture and its association with the British East India Company.,price:Free,time:1 hour},{name:Howrah Bridge,description:Walk or take a ferry across this iconic bridge for stunning views of the city.,price:Free (Ferry: INR 5-10),time:1 hour}],food:[{name:6 Ballygunge Place,description:Indulge in fine dining with a modern twist on traditional Bengali cuisine.,price:INR 1000-1500,time:Dinner}],hotels:[{name:The Oberoi Grand,checkInTime:,checkOutTime:,price:INR 8000-10000 per night,rating:5 stars,description:A luxurious heritage hotel known for its impeccable service and elegant ambience.}]},{day:4,title:Art & Culture,description:Immerse yourself in Kolkata's thriving artistic scene and cultural heritage.,tourist_spots:[{name:Academy of Fine Arts,description:Explore the largest art gallery in Eastern India.,price:INR 10,time:2 hours},{name:Birla Planetarium,description:Experience immersive shows about space and astronomy.,price:INR 60-100,time:1 hour},{name:National Library of India,description:Explore a vast collection of books and documents.,price:Free,time:2 hours}],food:[{name:Arsalan,description:Enjoy delicious street food like biryani and kebabs.,price:INR 200-500,time:Lunch}],hotels:[{name:The Oberoi Grand,checkInTime:,checkOutTime:,price:INR 8000-10000 per night,rating:5 stars,description:A luxurious heritage hotel known for its impeccable service and elegant ambience.}]},{day:5,title:Farewell & Departure,description:Experience the tranquility of a serene garden and savor the last moments in Kolkata.,tourist_spots:[{name:Botanical Garden,description:Enjoy a peaceful walk amidst beautiful flora and fauna.,price:INR 20,time:2 hours},{name:Shopping at New Market,description:Find unique souvenirs and local crafts at this bustling market.,price:Varies,time:2 hours}],food:[{name:Flurys,description:Enjoy a classic afternoon tea experience at this iconic cafe.,price:INR 500-1000,time:Afternoon Tea}],hotels:[{name:The Oberoi Grand,checkInTime:,checkOutTime:,price:INR 8000-10000 per night,rating:5 stars,description:A luxurious heritage hotel known for its impeccable service and elegant ambience.}]}],budget:INR 7000-8000 (estimated)}",
//       },
//       {
//         role: "user",
//         content: `Generate a detailed daily itinerary for a tour. Starting location: ${start}. The allowed tourist spots are: ${JSON.stringify(
//           { tourist_spots }
//         )}.`,
//       },
//     ],
//     model: "llama3-8b-8192",
//     response_format: { type: "json_object" },
//   });
// };

const Itinerary = () => {
  const { id } = useParams();
  const [hotspot, setHotspot] = useState([]);
  const [tabDay, setTabDay] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    server
      .post(`/api/itinerary/distance`, { hotspot_id: parseInt(id) })
      .then((res) => {
        let dataString = res?.data?.data;
        dataString = dataString.replace(/```json\n/, "").replace(/\n```/, "");
        const resParsed = JSON.parse(dataString);
        setHotspot(resParsed);
        console.log(resParsed);
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching data");
      });

    // const callGroq = async () => {
    //   const chatCompletion = await GroqGenAI({
    //     start: hotspot[0]?.hotspot,
    //     tourist_spots: hotspot,
    //   });
    //   // Print the completion returned by the LLM.
    //   console.log(
    //     JSON.parse(chatCompletion.choices[0]?.message?.content) || ""
    //   );
    // };
    // callGroq();

    setLoading(false);
  }, [id]);

  const handleRegenerate = (e) => {
    e.preventDefault();
    setLoading(true);

    server
      .post(`/api/itinerary/distance`, { hotspot_id: parseInt(id) })
      .then((res) => {
        let dataString = res?.data?.data;
        dataString = dataString.replace(/```json\n/, "").replace(/\n```/, "");
        const resParsed = JSON.parse(dataString);
        setHotspot(resParsed);
        console.log(resParsed);
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching data");
      });

    setLoading(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    server
      .post(`/api/itinerary/save`, { itinerary: hotspot?.itinerary })
      .then((res) => {
        console.log(res);
        let share_url = `http://localhost:3000/plans/${res?.data?.results?.insertId}`;
        navigator.clipboard.writeText(share_url);
        // prompt the native dialogue box to share the link
        alert("Link copied to clipboard: " + share_url);
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching data");
      });

    setLoading(false);
  };

  return (
    <div className="space-y-2 mt-2">
      <div className="flex justify-between items-center px-2 md:px-4">
        <div className="flex gap-2 text-xl font-bold text-center">
          Optimised
          <button>
            <LiaRedoAltSolid
              className={loading ? "animate-spin origin-center mb-2" : "mb-1"}
              onClick={handleRegenerate}
            />
          </button>
          <button>
            <IoMdShare className="mb-1" onClick={handleSave} />
          </button>
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
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                          Price: {spot?.price} | Time: {spot?.time} hours
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

export default Itinerary;
