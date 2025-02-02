import { useState } from "react";
import Button from "../components/Button";
import { TiLocationArrow } from "react-icons/ti";
import Squares from "./Backgroung";
import OperationOrTraveler from "./OperatorOrTraveler";
import { registerOperator, registerTraveler } from "../services/registration";

const Authentication = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [role, setRole] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const handleSignUpClick = () => {
    setIsActive(true);
    setShowModal(true);
  };

  const handleSignUp = () => {
    event.preventDefault()
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    if (!phone.trim()) {
      alert("Please enter your phone number");
      return;
    }
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }
    if (!password) {
      alert("Please enter your password");
      return;
    }
    if (password !== reEnterPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!role) {
      alert("Please select your role");
      return;
    }

    if (role === "Traveler") {
      console.log("Traveler Registration:", { name, email, phone, password });
      registerTraveler(name, email, phone, password);
    } else {
      console.log("Operator Registration:", { name, email, phone, password });
      registerOperator(name, email, phone, password);
    }
  };

  return (
    <div className="bodydiv all text-black">
      <div className="h-screen w-screen absolute">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="gray"
          hoverFillColor="yellow-200"
          className="h-screen w-screen"
        />
      </div>
      <div className="relative z-10">
        <div
          className={`container1 all ${isActive ? "active" : ""}`}
          id="container1"
        >
          {/* Sign Up Form */}
          <div className="form-container1 sign-up all">
            <div>
              {/* Modal for Selecting Role */}
              {showModal && (
                <OperationOrTraveler
                  onClose={(selectedRole) => {
                    setShowModal(false);
                    setRole(selectedRole);
                  }}
                />
              )}
            </div>
            <form>
              <h1 className="all heading">Create Account</h1>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Re-enter your password"
                value={reEnterPassword}
                onChange={(e) => setReEnterPassword(e.target.value)}
              />

              <Button
                id="Sign_up"
                title="Sign Up"
                change={handleSignUp}
                leftIcon={<TiLocationArrow />}
                containerClass="!bg-yellow-300 flex-center gap-1"
              />
            </form>
          </div>

          {/* Sign In Form */}
          <div className="form-container1 sign-in all">
            <form>
              <h1 className="heading">Sign In</h1>
              <span>With phone</span>
              <input type="text" placeholder="Enter your phone number" />
              <span>or use your email password</span>
              <input type="email" placeholder="Enter your email address" />
              <input type="password" placeholder="Enter your password" />
              <a href="#">Forget Your Password?</a>
              <Button
                id="Sign_in"
                title="Sign in"
                leftIcon={<TiLocationArrow />}
                containerClass="!bg-yellow-300 flex-center gap-1"
              />
            </form>
          </div>

          {/* Toggle Between Sign In & Sign Up */}
          <div className="toggle-container1 all">
            <div className="toggle all">
              <div className="toggle-panel toggle-left all text-black">
                <h1 className="all heading">Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button
                  className="hid all"
                  id="login"
                  onClick={() => {
                    setIsActive(false);
                    setShowModal(false);
                  }}
                >
                  <TiLocationArrow className="inline-flex mr-1" />
                  Sign In
                </button>
              </div>
              <div className="toggle-panel toggle-right all text-black">
                <h1 className="all heading text-black">Hello, Friend!</h1>
                <p>
                  Register with your personal details to use all of site
                  features
                </p>
                <button
                  className="hid all"
                  id="register"
                  onClick={handleSignUpClick}
                >
                  <TiLocationArrow className="inline-flex mr-1" />
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
