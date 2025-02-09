import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { HashLink } from "react-router-hash-link";
import propTypes from "prop-types";
import { toast } from "react-toastify";
import { User, LogOut, Clock, Settings, Bell, ChevronDown, Globe } from "lucide-react";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

const Navbar = ({ classes }) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const { y: currentScrollY } = useWindowScroll();
  const navContainerRef = useRef(null);
  const userDropdownRef = useRef(null);
  const langDropdownRef = useRef(null);

  const [userName, setUserName] = useState(sessionStorage.getItem("name"));
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  useEffect(() => {
    const handleStorageChange = () => {
      setUserName(sessionStorage.getItem("name"));
    };

    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const baseNavItems = ["Home", "About", "Contact", "Language"];
  const getNavItems = () => [...baseNavItems, userName ? userName : "Login/Sign up"];

  // Existing scroll and GSAP effects remain the same...
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

  const handleLanguageChange = (language) => {
    
    setSelectedLanguage(language.name);
    setShowLanguageDropdown(false);
    i18n.changeLanguage(language.code); // Change language dynamically
    localStorage.setItem("language", language.code); // Persist selection
    // Here you would typically implement language change logic
    toast.success(`Language changed to ${language.name}`);
  };

  const handleNavItemClick = (item) => {
    if (item === userName || item === "Language") {
      return;
    }
    const sectionId = item.toLowerCase();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    setShowUserDropdown(false);
    sessionStorage.removeItem("name");
    window.dispatchEvent(new Event("storage"));
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  return (
    <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/GoBuslogo.png" alt="logo" className="w-16 cursor-pointer" onClick={() => navigate("/")} />
          </div>
          <div className="flex h-full items-center">
            <div className="hidden md:block relative">
              {getNavItems().map((item) => (
                item === userName ? (
                  <div
                    key={item}
                    ref={userDropdownRef}
                    className="relative inline-block"
                  >
                    <button
                      onClick={() => setShowUserDropdown(!showUserDropdown)}
                      className={`nav-hover-btn ${classes} flex items-center gap-2 rounded-lg px-4 py-2 transition-colors`}
                    >
                      <User size={20} className="text-gray-600" />
                      <span>{userName}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {showUserDropdown && (
                      <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out">
                        <div className="px-4 py-3 border-b">
                          <p className="text-sm text-gray-500">Signed in as</p>
                          <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                        </div>
                        <div className="py-1">
                          <Link
                            // to="/profile"
                            onClick={() => toast.info("Available soon! 🚀")}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                          >
                            <User size={16} />
                            Profile
                          </Link>
                          <button
                            onClick={() => toast.info("Booking history will be available soon! 🚀")}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                          >
                            <Clock size={16} />
                            My Bookings
                          </button>
                          <button
                            onClick={() => toast.info("Notifications coming soon!")}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                          >
                            <Bell size={16} />
                            Notifications
                          </button>
                          <button
                            // onClick={() => navigate("/settings")}
                            onClick={() => toast.info("Available soon! 🚀")}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                          >
                            <Settings size={16} />
                            Settings
                          </button>
                        </div>
                        <div className="py-1 border-t">
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <LogOut size={16} />
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : item === "Language" ? (
                  <div
                    key={item}
                    ref={langDropdownRef}
                    className="relative inline-block"
                  >
                    <button
                      onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                      className={`nav-hover-btn ${classes} flex items-center gap-2 rounded-lg px-4 py-2 transition-colors `}
                    >
                      {/* <Globe size={20} className="text-gray-600" /> */}
                      <span>{selectedLanguage}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${showLanguageDropdown ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {showLanguageDropdown && (
                      <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out">
                        <div className="py-1">
                          {languages.map((language) => (
                            <button
                              key={language.code}
                              onClick={() => handleLanguageChange(language)}
                              className={`flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg ${
                                selectedLanguage === language.name ? 'bg-gray-50 font-medium' : ''
                              }`}
                            >
                              <span className="text-base">{language.flag}</span>
                              <span>{language.name}</span>
                              {selectedLanguage === language.name && (
                                <span className="ml-auto text-blue-600">✓</span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : item === "Login/Sign up" ? (
                  <Link key={item} to="/auth" className={`nav-hover-btn ${classes}`}>
                    {item}
                  </Link>
                ) : (
                  <HashLink
                    key={item}
                    className={`nav-hover-btn ${classes}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavItemClick(item);
                    }}
                  >
                    {/* {t(`home.title.home`)} */}
                    {t(`home.title.${item.toLowerCase()}`)}
                    {/* {t(item)} */}
                  </HashLink>
                )
              ))}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

Navbar.propTypes = {
  classes: propTypes.string
};

export default Navbar;