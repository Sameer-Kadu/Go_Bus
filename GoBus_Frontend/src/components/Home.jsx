import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "./Button.jsx";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import To_destination from "./To_destination.jsx";
import From_Source from "./From_Source.jsx";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const totalVideos = 4;
  const nextVideoRef = useRef(null);
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  useEffect(() => {
    if (loadedVideos > -1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",

          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,

          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%,0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%,0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  // video source
  const getVideoSrc = (index) => `videos/Home-${index}.mp4`;
  return (
    // dvh = dynamic viewport-percentage
    <div id="home" className=" relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violete-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75 "
      >
        <div className="absolute left-0 top-0 z-30 size-full bg-black bg-opacity-40 "></div>
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            {/*If want to chance position of mini video popup*/}
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            // onLoadData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-100">
          Tr<b className="text-yellow-200">a</b>veling
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Booki<b className="text-yellow-200">n</b>g
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-yellow-200">
              {/* &apos for ' */}
              India&apos;s No. 1 Online Bus Ticket Booking Site
            </p>
            {/*<input type="text"/>*/}

            {/**/}

            <From_Source />

            {/**/}

            <div className=" h-12 absolute pl-80 " id="Enterchange">
              <img
                src="/img/Stop_exchange.svg "
                alt=""
                className="h-12 -mt-4 "
              />
            </div>

            {/**/}

            <To_destination />

            {/**/}
            <div className=" py-2 mb-3 flex items-center h-full gap-3 group relative pr-12">
              <img src="/img/Booking_date.svg" alt="" className="h-10 w-10 " />
              <input
                className="pl-[50px] absolute appearance-none bg-transparent text-white text-lg outline-none cursor-pointer date-input border-none"
                type="date"
                placeholder="Select a date"
              />
              {/*<p className="text-gray-400">Date</p>*/}
            </div>
            {/**/}
            <Link to="/buses">
              <Button
                id="Search_Bus"
                title="Search Bus"
                leftIcon={<TiLocationArrow />}
                containerClass="!bg-yellow-300 flex-center gap-1"
              />
            </Link>
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        Tr<b className="text-yellow-200">a</b>veling
      </h1>
    </div>
  );
};
export default Home;
