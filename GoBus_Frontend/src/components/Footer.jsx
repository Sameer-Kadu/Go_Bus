import { FaDiscord, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const links = [
  { href: "#", icon: <FaDiscord /> },
  { href: "#", icon: <FaTwitter /> },
  { href: "#", icon: <FaGithub /> },
  { href: "#", icon: <FaInstagram /> },
];
const Footer = () => {
  return (
    <footer className="w-screen bg-yellow-200 py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm md:text-left">
          &copy; 2024 GoBus. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 md:justify-start">
          {links.map((link) => (
            <a
              key={link}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {" "}
              {link.icon}
            </a>
          ))}
        </div>
        <a href="#privacy-policy" className="text-center text-sm hover-underline md:text-right">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
