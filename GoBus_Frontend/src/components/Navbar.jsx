import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { HashLink } from "react-router-hash-link";
import propTypes from "prop-types";

const Navbar = ({ classes, name }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const { y: currentScrollY } = useWindowScroll();
  const navContainerRef = useRef(null);
  
  // Create base nav items without login/signup
  const baseNavItems = ["Home", "About", "Contact", "Language"];
  
  // Determine the last nav item based on login status
  const getNavItems = () => {
    return [...baseNavItems, name ? name : "Login/Sign up"];
  };

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
    // Handle user profile click when logged in
    if (item === name) {
      navigate("/profile"); // Add your profile route
      return;
    }

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
            <img 
              src="/img/GoBuslogo.png" 
              alt="logo" 
              className="w-16 cursor-pointer" 
              onClick={() => navigate("/")}
            />
          </div>
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {getNavItems().map((item) => {
                // If user is logged in and this is their name
                if (item === name) {
                  return (
                    <div key={item} className="relative inline-block">
                      <button 
                        className={`nav-hover-btn ${classes}`}
                        onClick={() => handleNavItemClick(item)}
                      >
                        {name}
                      </button>
                     
                    </div>
                  );
                }
                
                // If it's the login/signup button
                if (item === "Login/Sign up") {
                  return (
                    <Link
                      key={item}
                      to="/auth"
                      className={`nav-hover-btn ${classes}`}
                    >
                      {item}
                    </Link>
                  );
                }
                
                // For all other nav items
                return (
                  <HashLink
                    key={item}
                    className={`nav-hover-btn ${classes}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavItemClick(item);
                    }}
                  >
                    {item}
                  </HashLink>
                );
              })}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

Navbar.propTypes = {
  classes: propTypes.string,
  name: propTypes.string
};

export default Navbar;