
import { useState } from "react";
import Button from "../components/Button";
import { TiLocationArrow } from "react-icons/ti";
import Squares from "./Backgroung";

const Authentication = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="bodydiv all text-black">
     
    <div className="h-screen w-screen absolute">
    <Squares 
      speed={0.5} 
      squareSize={40}
      direction='diagonal' // up, down, left, right, diagonal
      borderColor='gray'
      hoverFillColor='yellow-200'
      className="h-screen w-screen"
    />
    </div>
    <div className="">
      <div
        className={` z-0 container all  ${isActive ? "active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up all">
          <form>
            <h1 className="all heading">Create Account</h1>

            <input type="text" placeholder="Enter your name" />
            <input type="text" placeholder="Enter your phone number" />
            <input type="email" placeholder="Enter your email" />
            <input type="password" placeholder="Enter your password" />
            <input type="password" placeholder="Re-enter your password" />
            <Button
              id="watch-trailer"
              title="Sign Up"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </form>
        </div>
        <div className="form-container sign-in all">
          <form>
            <h1 className="heading">Sign In</h1>
            <span>With phone</span>
            <input type="text" placeholder="Enter your phone number" />
            <span>or use your email password</span>
            <input type="email" placeholder="Enter your email address" />
            <input type="password" placeholder="Enter your password" />
            <a href="#">Forget Your Password?</a>
            <Button
              id="watch-trailer"
              title="Sign in"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </form>
        </div>
        <div className="toggle-container all">
          <div className="toggle all">
            <div className="toggle-panel toggle-left all text-black">
              <h1 className="all heading">Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              
              <button
                className="hid all"
                id="login"
                onClick={() => setIsActive(false)}
              ><TiLocationArrow className="inline-flex mr-1"/>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right all text-black">
              <h1 className="all heading text-black">Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button
                className="hid all"
                id="register"
                onClick={() => setIsActive(true)}
              ><TiLocationArrow className="inline-flex mr-1"/>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>.
      </div>
    </div>
  );
};
export default Authentication;
