import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../server";
import { ImSpinner9 } from "react-icons/im";
import { MdArrowOutward } from "react-icons/md";

const Home = () => {
  const [modal, setModal] = useState(false);
  const [place, setPlace] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    server
      .post(`/api/itinerary/state`, {
        place: place,
      })
      .then((res) => {
        let dataString = res?.data?.data;
        dataString = dataString.replace(/```json\n/, "").replace(/\n```/, "");
        const resParsed = JSON.parse(dataString);
        setResult(resParsed);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching data");
        setLoading(false);
      });
  };

  // an useEffect which looks for changes in result and redirects to the respective page after around 3 seconds
  useEffect(() => {
    if (result) {
      setTimeout(() => {
        if (result?.wb) {
          navigate(`/wb?lat=${result.lat}&lon=${result.lon}`);
        } else {
          navigate("/out");
        }
      }, 5000);
    }
  }, [result, navigate]);

  return (
    <>
      <div className="bg-white">
        <div className="relative isolate p-10 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-56"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-2xl py-24 sm:py-36 lg:py-32">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                North Bengal’s Unspoiled Beauty Beckons{" "}
                <Link href="#" className="font-semibold text-indigo-600">
                  <span aria-hidden="true" className="absolute inset-0" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Explore North Bengal like never before
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Discover the hidden gems of North Bengal, where mist-kissed tea
                gardens meet snow-capped peaks. From the roar of the Royal
                Bengal tiger in the Sundarbans to tranquil boat rides on the
                Teesta River, every moment here is an adventure waiting to
                unfold
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  onClick={() => setModal(true)}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </button>
                <Link
                  to="/"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>

      <div
        className={
          modal &&
          `fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`
        }
      >
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-4">
          <button
            className={
              modal &&
              `absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800`
            }
            onClick={() => setModal(false)}
          >
            &times;
          </button>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Your Start Location
            </label>
            <form
              onSubmit={handleSubmit}
              className="relative mt-2 rounded-md shadow-sm"
            >
              <input
                id="price"
                name="price"
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Delhi"
                required
                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute inset-y-0 right-0 flex items-center justify-center px-4 text-sm font-semibold text-white bg-indigo-600 rounded-r-md"
              >
                {loading ? (
                  <ImSpinner9 className={loading && "animate-spin"} />
                ) : (
                  "Search"
                )}
              </button>
            </form>

            <div
              className={
                loading ? "animate-pulse mt-2 rounded-lg" : "text-sm mt-2"
              }
            >
              {loading ? (
                <div className="h-4 bg-gray-200 w-3/5"></div>
              ) : (
                <>
                  {result?.wb != null && (
                    <div>
                      {result?.wb ? "From Bengal" : "Outside of Bengal"},
                      Redirecting <MdArrowOutward className="inline" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
