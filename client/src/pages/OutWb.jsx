import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { server } from "../server";

const OutWb = () => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  console.log(params);

  const [trains, setTrains] = useState([]);

  useEffect(() => {
    server
      .post("/api/transit/trains", { from: params?.nearestRailStnCode })
      .then((res) => {
        setTrains(res?.data?.data);
        console.log(res?.data?.data);
      });
  }, [params]);

  return (
    <main className="grid min-h-dvh place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* <p className="text-6xl font-semibold text-indigo-600">404</p> */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page is not available yet
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          We are working on it
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
          <Link to="/support" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OutWb;
