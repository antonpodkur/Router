import { useEffect } from "react";
import Glide from "@glidejs/glide";
import { divIcon } from "leaflet";
import ImageOverlayCard from "../components/ImageOverlayCard";
import Leaf from '../assets/leaf.png'

function Welcome() {
  useEffect(() => {
    const slider = new Glide(".glide-05", {
      type: "slider",
      focusAt: "center",
      perView: 1,
      autoplay: 3000,
      animationDuration: 700,
      gap: 0,
      classes: {
        nav: {
          active: "[&>*]:bg-black",
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-r from-emerald-100">
        <div className="absolute bottom-[0px] right-[0px] w-3/6 md:w-auto bg-transparent">
            <img src={Leaf} alt="leaf" />
        </div>
      <div className="relative flex flex-col w-full h-[80%] justify-center items-center">
        <div className="m-6 mx-auto text-center text-[35px] md:text-[50px] font-bold">
          Welcome to Router
        </div>
        <div className="mb-6 mx-auto text-center text-[24px] md:text-[30] font-semibold">
          With Router you can:
        </div>
        {/*<!-- Component: Slider with indicators outside --> */}
        <div className="relative w-8/12  lg:w-3/6 glide-05">
          {/*    <!-- Slides --> */}
          <div className="overflow-hidden" data-glide-el="track">
            <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
              <li>
                <ImageOverlayCard
                  imageUrl="https://images.pexels.com/photos/4905089/pexels-photo-4905089.jpeg?cs=srgb&dl=pexels-arthouse-studio-4905089.jpg&fm=jpg"
                  text="Build routes"
                />
              </li>
              <li>
                <ImageOverlayCard
                  imageUrl="https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?cs=srgb&dl=pexels-element-digital-1051075.jpg&fm=jpg"
                  text="Access your routes in personal cabinet"
                />
              </li>
              <li>
                <ImageOverlayCard
                  imageUrl="https://images.pexels.com/photos/35969/pexels-photo.jpg?cs=srgb&dl=pexels-ingo-joseph-35969.jpg&fm=jpg"
                  text="Share routes"
                />
              </li>
              <li>
                <ImageOverlayCard
                  imageUrl="https://images.pexels.com/photos/793088/pexels-photo-793088.jpeg?cs=srgb&dl=pexels-francesco-paggiaro-793088.jpg&fm=jpg"
                  text="Export routes"
                />
              </li>
            </ul>
          </div>
          {/*    <!-- Indicators --> */}
          <div
            className="flex items-center justify-center w-full gap-2"
            data-glide-el="controls[nav]"
          >
            <button
              className="p-4 group"
              data-glide-dir="=0"
              aria-label="goto slide 1"
            >
              <span className="block w-2 h-2 transition-colors duration-300 rounded-full bg-white/20 ring-1 ring-slate-700 focus:outline-none"></span>
            </button>
            <button
              className="p-4 group"
              data-glide-dir="=1"
              aria-label="goto slide 2"
            >
              <span className="block w-2 h-2 transition-colors duration-300 rounded-full bg-white/20 ring-1 ring-slate-700 focus:outline-none"></span>
            </button>
            <button
              className="p-4 group"
              data-glide-dir="=2"
              aria-label="goto slide 3"
            >
              <span className="block w-2 h-2 transition-colors duration-300 rounded-full bg-white/20 ring-1 ring-slate-700 focus:outline-none"></span>
            </button>
            <button
              className="p-4 group"
              data-glide-dir="=3"
              aria-label="goto slide 4"
            >
              <span className="block w-2 h-2 transition-colors duration-300 rounded-full bg-white/20 ring-1 ring-slate-700 focus:outline-none"></span>
            </button>
          </div>
        </div>
        {/*<!-- End Slider with indicators outside --> */}
      </div>
    </div>
  );
}

export default Welcome;
