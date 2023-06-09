import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut, selectIsLoggedIn } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useTranslation } from 'react-i18next'
import LanguageChangeSwitch from "./LanguageChangeSwitch";

export default function NavbarBasicPreview() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();


  const handleLogout = async () => {
    try {
      const result = await axiosPrivate.get("/api/v1/auth/logout");
      if (result.status === 200) {
        dispatch(logOut({}));
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {/*<!-- Component: Basic Navbar --> */}
      <header className="border-b-1 relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[4.5rem] items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}
            <Link
              to="/"
              id="WindUI"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
            >
              <svg
                height="30px"
                width="30px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <polygon
                    fill="#CDE6F8;"
                    points="135.278,433.678 14.556,447.603 14.556,78.301 135.278,64.376 	"
                  />
                  <polygon
                    fill="#CDE6F8;"
                    points="376.721,391.903 256.001,489.378 256.001,120.075 376.721,22.601 	"
                  />
                </g>
                <path
                  fill="#2D527C;"
                  d="M497.444,291.433c8.038,0,14.556-6.518,14.556-14.556V78.301c0-5.678-3.303-10.839-8.459-13.217
	L382.821,9.384c-0.566-0.261-1.146-0.483-1.732-0.668c-0.131-0.041-0.263-0.061-0.394-0.098c-0.492-0.14-0.985-0.265-1.486-0.352
	c-0.259-0.045-0.52-0.061-0.78-0.092c-0.377-0.045-0.753-0.09-1.131-0.105c-0.285-0.012-0.568,0-0.852,0.006
	c-0.357,0.007-0.712,0.017-1.068,0.051c-0.288,0.028-0.574,0.068-0.859,0.114c-0.349,0.054-0.696,0.116-1.041,0.197
	c-0.282,0.064-0.56,0.137-0.84,0.218c-0.344,0.1-0.681,0.217-1.019,0.344c-0.268,0.1-0.534,0.201-0.796,0.319
	c-0.341,0.151-0.67,0.325-1,0.502c-0.245,0.132-0.491,0.256-0.728,0.403c-0.07,0.044-0.146,0.076-0.215,0.119
	c-0.294,0.188-0.562,0.408-0.84,0.616c-0.15,0.112-0.313,0.201-0.46,0.32L253.89,103.071L141.378,51.159
	c-0.042-0.019-0.087-0.031-0.13-0.049c-0.515-0.231-1.041-0.44-1.579-0.61c-0.047-0.015-0.095-0.022-0.141-0.036
	c-0.492-0.15-0.991-0.274-1.496-0.371c-0.192-0.036-0.384-0.058-0.578-0.087c-0.365-0.055-0.732-0.103-1.102-0.13
	c-0.214-0.016-0.428-0.022-0.643-0.029c-0.357-0.01-0.712-0.009-1.07,0.007c-0.211,0.009-0.421,0.02-0.632,0.038
	c-0.132,0.012-0.265,0.009-0.396,0.025L12.888,63.84C5.543,64.689,0,70.907,0,78.301v369.302c0,4.151,1.771,8.103,4.871,10.866
	c2.681,2.39,6.133,3.69,9.684,3.69c0.555,0,1.112-0.031,1.668-0.095l116.665-13.457l44.414,20.492
	c7.299,3.367,15.949,0.181,19.316-7.119c3.368-7.3,0.18-15.948-7.119-19.316l-39.666-18.302V87.123l91.61,42.268v359.986
	c0,0.636,0.055,1.258,0.134,1.872c0.02,0.154,0.045,0.307,0.07,0.46c0.086,0.528,0.196,1.047,0.338,1.555
	c0.023,0.086,0.041,0.173,0.067,0.259c0.178,0.598,0.394,1.179,0.643,1.742c0.042,0.096,0.092,0.188,0.137,0.284
	c0.223,0.473,0.469,0.93,0.738,1.374c0.068,0.114,0.134,0.227,0.205,0.339c0.326,0.505,0.678,0.993,1.063,1.453
	c0.063,0.074,0.132,0.143,0.197,0.215c0.338,0.387,0.696,0.754,1.073,1.103c0.118,0.109,0.236,0.218,0.357,0.325
	c0.457,0.397,0.933,0.776,1.438,1.115c0.022,0.015,0.045,0.026,0.067,0.041c0.505,0.335,1.036,0.629,1.582,0.9
	c0.06,0.029,0.111,0.068,0.172,0.098c0.068,0.032,0.14,0.054,0.208,0.086c0.342,0.157,0.69,0.298,1.045,0.429
	c0.138,0.051,0.277,0.106,0.416,0.153c0.364,0.121,0.737,0.223,1.112,0.316c0.132,0.032,0.263,0.073,0.396,0.102
	c0.392,0.086,0.792,0.147,1.195,0.199c0.115,0.015,0.23,0.041,0.345,0.052c0.504,0.054,1.015,0.083,1.531,0.084
	c0.007,0,0.016,0.001,0.023,0.001h0.001l0,0c0.004,0,0.007,0,0.01,0c0.45,0,0.898-0.026,1.345-0.068
	c0.175-0.016,0.346-0.044,0.52-0.066c0.268-0.035,0.534-0.073,0.799-0.122c0.207-0.038,0.409-0.083,0.613-0.131
	c0.227-0.052,0.451-0.111,0.675-0.175c0.211-0.06,0.422-0.121,0.629-0.191c0.215-0.071,0.426-0.151,0.638-0.233
	c0.201-0.077,0.403-0.153,0.6-0.239c0.226-0.099,0.447-0.211,0.668-0.322c0.172-0.086,0.346-0.166,0.515-0.258
	c0.351-0.192,0.693-0.402,1.029-0.624c0.099-0.066,0.195-0.137,0.293-0.205c0.274-0.192,0.546-0.386,0.809-0.597l113.687-91.795
	l112.513,51.913c1.942,0.895,4.023,1.339,6.096,1.339c2.741,0,5.469-0.773,7.847-2.296c4.182-2.675,6.71-7.297,6.71-12.261V346.453
	c0-8.038-6.518-14.556-14.556-14.556s-14.556,6.518-14.556,14.556v78.407l-91.61-42.268V45.348l91.61,42.267v189.262
	C482.888,284.916,489.404,291.433,497.444,291.433z M29.112,91.274l91.61-10.568v339.997l-91.61,10.566V91.274z M270.557,127.032
	l91.61-73.968v331.884l-91.61,73.968V127.032z"
                />
              </svg>
              Router
            </Link>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
                ${
                  isToggleOpen
                    ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
                    : ""
                }
              `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
            {/*      <!-- Navigation links --> */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute top-0 left-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              <li role="none" className="flex items-stretch">
                <Link
                  to="/map"
                  role="menuitem"
                  aria-current="page"
                  aria-haspopup="false"
                  tabIndex={0}
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:bg-emerald-50 focus:outline-none focus-visible:outline-none lg:px-8"
                >
                  <span>{t("Map")}</span>
                </Link>
              </li>
              {isLoggedIn && (
                <li role="none" className="flex items-stretch">
                  <Link
                    to="/cabinet"
                    role="menuitem"
                    aria-current="page"
                    aria-haspopup="false"
                    tabIndex={0}
                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:bg-emerald-50 focus:outline-none focus-visible:outline-none lg:px-8"
                  >
                    <span>{t("Personal Cabinet")}</span>
                  </Link>
                </li>
              )}
              <li role="none" className="flex items-stretch">
                <Link
                  to={"/about"}
                  role="menuitem"
                  aria-haspopup="false"
                  tabIndex={0}
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:bg-emerald-50 focus:outline-none focus-visible:outline-none lg:px-8"
                >
                  <span>{t("About")}</span>
                </Link>
              </li>
              {!isLoggedIn && (
                <li role="none" className="flex items-stretch">
                  <Link
                    to="/register"
                    role="menuitem"
                    aria-current="page"
                    aria-haspopup="false"
                    tabIndex={0}
                    className="flex items-center gap-1 py-4 transition-colors duration-300 hover:text-emerald-500 focus:bg-emerald-50 focus:outline-none focus-visible:outline-none lg:px-2"
                  >
                    <button className="inline-flex items-center justify-center h-10 gap-1 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-emerald-500 shadow-emerald-200 hover:bg-emerald-600 hover:shadow-sm hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-sm focus:shadow-emerald-200 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                      <span>{t("Sign Up")}</span>
                    </button>
                  </Link>
                  <Link
                    to="/login"
                    role="menuitem"
                    aria-current="page"
                    aria-haspopup="false"
                    tabIndex={0}
                    className="flex items-center gap-1 py-4 transition-colors duration-300 hover:text-emerald-500 focus:bg-emerald-50 focus:outline-none focus-visible:outline-none px-2"
                  >
                    <button className="inline-flex items-center justify-center h-10 gap-1 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-emerald-500 shadow-emerald-200 hover:bg-emerald-600 hover:shadow-sm hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-sm focus:shadow-emerald-200 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                      <span>{t("Sign In")}</span>
                    </button>
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <Link
                    to="/login"
                    role="menuitem"
                    aria-current="page"
                    aria-haspopup="false"
                    tabIndex={0}
                    className="flex items-center gap-1 py-4 transition-colors duration-300 hover:text-emerald-500 focus:bg-emerald-50 focus:outline-none focus-visible:outline-none px-2"
                    onClick={async () => await handleLogout()}
                  >
                    <button className="inline-flex items-center justify-center h-10 gap-1 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-emerald-500 shadow-emerald-200 hover:bg-emerald-600 hover:shadow-sm hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-sm focus:shadow-emerald-200 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                      <span>{t("Log Out")}</span>
                    </button>
                  </Link>
                </li>
              )}
              <li role="none" className="flex items-stretch">
                <LanguageChangeSwitch/>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {/*<!-- End Basic Navbar--> */}
    </>
  );
}
