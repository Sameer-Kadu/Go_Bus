
import { useState } from "react";

const Authentication = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="bodydiv all">
      <div
        className={`container all  ${isActive ? "active" : ""}`}
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
            <button className="all">Sign Up</button>
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
            <button className="text-black">Sign In</button>
          </form>
        </div>
        <div className="toggle-container all">
          <div className="toggle all">
            <div className="toggle-panel toggle-left all">
              <h1 className="all heading">Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button
                className="hid all"
                id="login"
                onClick={() => setIsActive(false)}
              >
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right all">
              <h1 className="all heading">Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button
                className="hid all"
                id="register"
                onClick={() => setIsActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Authentication;
