import ContactUs from "./ContactUs";

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="font-general text-[10px] uppercase">Join GoBus</p>
          <p className="special-font mt-10 mb-10 w-full font-zentry text-5xl leading-[0.9] md:text-[6rem]">
            L<b>e</b>t us k<b>n</b>ow
            <br /> h<b>o</b>w we c<b>a</b>n <br />h<b>e</b>lp y<b>o</b>u
          </p>

          <ContactUs />
        </div>
      </div>
    </div>
  );
};

export default Contact;
