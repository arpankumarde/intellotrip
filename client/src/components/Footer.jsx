import { useState } from "react";
import { RiSpam2Line } from "react-icons/ri";
import { PiNewspaper } from "react-icons/pi";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    alert("Subscribed successfully!");
    setEmail("");
  };

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-8 sm:py-24 lg:py-12 mx-4 md:mx-8 rounded-2xl shadow-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Subscribe to our newsletter.
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                Receive weekly articles, no spam! Enter your email address below
              </p>
              <form
                className="mt-6 flex max-w-md gap-x-4"
                onSubmit={handleSubmit}
              >
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <PiNewspaper className="h-6 w-6 text-white" />
                </div>
                <dt className="mt-4 font-semibold text-white">
                  Weekly articles
                </dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  Get the latest travel tips, guides, and inspiration delivered
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <RiSpam2Line className="h-6 w-6 text-white" />
                </div>
                <dt className="mt-4 font-semibold text-white">No spam</dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  We respect your privacy and will never share your email
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
      </div>

      <footer className="text-gray-600 pt-10 pb-8border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h6 className="font-semibold mb-4">About Mello Trips</h6>
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Press
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Resources and Policies
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Careers
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Investor Relations
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Trust & Safety
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Contact us
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Accessibility Statement
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Explore</h6>
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Write a review
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Add a Place
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Join
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Travelers Choice
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    GreenLeaders
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Blog
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Help Center
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Travel Articles
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Do Business With Us</h6>
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Owners
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Business Advantage
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Sponsored Placements
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Advertise with Us
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Access our Content API
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Become an Affiliate
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Get The App
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    iPhone App
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Android App
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold">Mello Sites</h6>
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Discover your dream destination with Jetsetter
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Book the best restaurants with TheFork
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Book tours and attraction tickets on Viator
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Read cruise reviews on Cruise Critic
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Get airline seating charts on Seat Guru
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Find vacation rentals on FlipKey
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Search for holiday rentals on Holiday Lettings
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-900">
                    Plan and book your next trip with Reco Trip Designers
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-8" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <p className="text-sm">
                © 2024 Mello Trips LLC All rights reserved.
              </p>
              <ul className="flex flex-wrap justify-center md:justify-start space-x-4 text-sm mt-2">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Privacy Statement
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Cookie consent
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Site Map
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    How the site works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <select className="bg-white border rounded-md px-4 py-2 text-sm">
                <option>₹ INR</option>
                <option>$ USD</option>
              </select>
              <select className="bg-white border rounded-md px-4 py-2 text-sm">
                <option>India</option>
                <option>United States</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center md:justify-start mt-4 space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fab fa-pinterest"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
