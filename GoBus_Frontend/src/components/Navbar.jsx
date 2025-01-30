import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { HashLink } from "react-router-hash-link";
import propTypes from "prop-types";

const navItems = ["Home", "About", "Contact", "Language", "Login/Sign up"];

const Navbar = ({ classes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const { y: currentScrollY } = useWindowScroll();
  const navContainerRef = useRef(null);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavItemClick = (item) => {
    const sectionId = item.toLowerCase();
    
    if (location.pathname !== "/") {
      
      navigate("/");
      
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      
      scrollToSection(sectionId);
    }
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/GoBuslogo.png" alt="logo" className="w-16" onClick={()=>{navigate("/")}}/>
          </div>
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) =>
                item.toLowerCase() === "login/sign up" ? (
                  <Link
                    key={item}
                    to="/auth"
                    className={`nav-hover-btn ${classes}`}
                  >
                    {item}
                  </Link>
                ) : (
                  <HashLink
                    key={item}
                    // to={`/#${item.toLowerCase()}`}
                    className={`nav-hover-btn ${classes}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavItemClick(item);
                    }}
                  >
                    {item}
                  </HashLink>
                )
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

Navbar.propTypes = {
  classes: propTypes.string,
};

export default Navbar;