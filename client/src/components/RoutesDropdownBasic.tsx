import React, { useState, useEffect, useRef } from "react";
import { Route as RouteModel } from "../models/route";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

interface RoutesDropdownBasicProps {
  route: RouteModel;
  fetchRoutes: () => void;
}

const RoutesDropdownBasic: React.FC<RoutesDropdownBasicProps> = ({route, fetchRoutes}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const axiosPrivate = useAxiosPrivate()


  const handleDeleteRoute = async () => {
    const result = await axiosPrivate.delete(`/api/v1/route/${route.id}`)
    if (result.status !== 200) {
      console.log(result.data.message)
    }
    fetchRoutes()
  }

  const handleExportRoute = () => {
    navigator.clipboard.writeText(JSON.stringify(route))
  }

  const navigationItems = [
    {
      name: "Open",
      link: "/map",
      handleFunc: () => {
        console.log("Open")
      },
    },
    {
      name: "Delete",
      link: "/cabinet",
      handleFunc: handleDeleteRoute
    },
    {
      name: "Export",
      link: "/cabinet",
      handleFunc: handleExportRoute 
    },
  ];

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      event.preventDefault();
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isOpen) {
      e.preventDefault();

      switch (e.keyCode) {
        // KeyDown
        case 40:
          if (currentItem === navigationItems.length - 1) {
            setCurrentItem(0);
          } else {
            setCurrentItem(currentItem + 1);
          }
          break;
        // KeyUp
        case 38:
          if (currentItem === 0) {
            setCurrentItem(navigationItems.length - 1);
          } else {
            setCurrentItem(currentItem - 1);
          }
          break;
        // Escape
        case 27:
          setCurrentItem(1);
          setIsOpen(false);
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      {/* <!-- Component: Basic dropdown menu--> */}
      <div ref={wrapperRef} className="relative inline-flex " id="dropdown">
        {/*  <!--  Start Dropdown trigger --> */}
        <button
          className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen ? true : false}
        >
          <span>Actions</span>
          <span className="relative only:-mx-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-labelledby="t-01 d-01"
              role="graphics-symbol"
            >
              <title id="t-01">Button icon</title>
              <desc id="d-01">An icon describing the buttons usage</desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </button>
        {/*  <!--  End Dropdown trigger --> */}
        {/*  <!-- Start Menu list --> */}
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } text-sla absolute top-full z-10 mt-1 flex w-72 list-none flex-col rounded bg-white py-2 shadow-md shadow-slate-500/10 `}
        >
          {navigationItems.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  to={item.link}
                  onClick={() => item.handleFunc()}
                  state={{route: route}}
                  className={` ${
                    index === currentItem
                      ? "bg-emerald-50 text-emerald-500"
                      : "bg-none text-slate-500"
                  } flex items-start justify-start gap-2 p-2 px-5 transition-colors duration-300 hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 focus:text-emerald-600 focus:outline-none focus-visible:outline-none`}
                  aria-current={index + 1 === currentItem ? "page" : "false"}
                >
                  <span className="flex flex-col gap-1 overflow-hidden whitespace-nowrap">
                    <span className="leading-5 truncate">{item.name}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        {/*  <!-- End Menu list --> */}
      </div>
      {/* <!-- End Basic dropdown menu--> */}
    </>
  );
};

export default RoutesDropdownBasic;
