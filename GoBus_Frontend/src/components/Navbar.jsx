import React, {useRef} from "react";
import Button from "./Button.jsx";
import {TiLocationArrow} from "react-icons/ti";
import home from "./Home.jsx";

const navItems = ['Home','About','Contact','Help','Language','Login/Sign up'];


const Navbar = () => {

    const navContainerRef = useRef(null);

    return (
        <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <div className="flex items-center gap-7">
                        <img src="/img/GoBuslogo.png" alt="logo" className="w-10"/>
                        <Button

                        id="product-button"
                        title="Bus Tickets"
                        rightIcon={<TiLocationArrow/>}
                        containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                        />
                    </div>
                    <div className="flex h-full items-center ">
                        <div className="hidden md:block">
                            {navItems.map((item)=>(
                                <a key={item} href={`#${item.toLowerCase()}`} className="nav-hover-btn">
                                    {item}
                                </a>
                            ))}
                        </div>

                    </div>
                </nav>
            </header>

        </div>
    )
}
export default Navbar;