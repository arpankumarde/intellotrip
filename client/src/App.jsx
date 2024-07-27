import { Footer, Navbar } from "./components";
import Router from "./Router";

const App = () => {
  return (
    <>
      <Navbar />

      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 sm:py-12 bg-[url(/static/beams.jpg)] bg-repeat">
        <img
          src="/static/beams.jpg"
          alt="bg"
          className="absolute bg-repeat-y top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-[url(/static/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute top-0 left-0 w-full">
          <Router />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default App;
