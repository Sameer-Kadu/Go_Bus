import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle.jsx";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[20px]">
          Welcome to GoBus
        </h2>

        <AnimatedTitle
          title="R<b>e</b>d<b>e</b>fining the way you tr<b>a</b>vel, with se<b>a</b>mless b<b>o</b><b>o</b>kings and unf<b>o</b>rgettable j<b>o</b>urneys"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext ">
          <p>The journey of journeys begins here with GoBus</p>
          <p>
            Connecting travelers from countless cities and destinations, GoBus
            unites every road and every mile
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/aboutUs.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default About;
