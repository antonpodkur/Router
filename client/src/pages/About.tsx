const About: React.FC = () => {
  return (
    <div className="relative h-full flex flex-col m-8 items-center">
      <div>
        <div className="text-2xl font-bold text-slate-700 ">
          What is Router?
        </div>
        <div className="text-slate-600 text-lg m-6">
          Router is a piece of software that helps you to create, keep track and
          share your routes
        </div>
      </div>
      {/*<!-- Component: Basic accordion --> */}
      <section className="w-full lg:w-3/6 divide-y rounded divide-slate-200 ">
        <details className="p-4 group" open>
          <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
            How to use Router?
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-labelledby="title-ac01 desc-ac01"
            >
              <title id="title-ac01">Open icon</title>
              <desc id="desc-ac01">
                icon that represents the state of the summary
              </desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </summary>
          <p className="mt-4 text-slate-500">
            To create a route just navigate to map page. No registration needed.
            <br />
            If you want to save a route, and have access to personal cabinet you
            have to be registered.
          </p>
        </details>
        <details className="p-4 group">
          <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
            Will Router become paid?
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-labelledby="title-ac01 desc-ac01"
            >
              <title id="title-ac01">Open icon</title>
              <desc id="desc-ac01">
                icon that represents the state of the summary
              </desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </summary>
          <p className="mt-4 text-slate-500">
            Router is free and open source software. Made by volunteer for
            volunteers.
          </p>
        </details>
      </section>
      {/*<!-- End Basic accordion --> */}
      <div className="mt-32 md:mt-80">
        <div className="text-2xl font-bold text-slate-700 text-center">
          Contact Us
        </div>
        <div className="text-slate-600 text-md lg:text-lg m-6">
            Email: anton.podkur@gmail.com
        </div>
      </div>
    </div>
  );
};

export default About;
