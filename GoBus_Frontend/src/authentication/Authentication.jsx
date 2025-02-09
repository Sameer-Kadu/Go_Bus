import { useState } from "react";
import Button from "../components/Button";
import { TiLocationArrow } from "react-icons/ti";
import Squares from "./Backgroung";
import OperationOrTraveler from "./OperatorOrTraveler";
import { loginUser, registerUser } from "../services/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Authentication = () => {
  const navigate = useNavigate();
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

  const handleSignIn = async () => {
    event.preventDefault();
    if (!email.trim()) {
    
toast.warning("Please enter your email");

      // alert("Please enter your email");
      return;
    }
    if (!password) {
      toast.warning("Please enter your password");
      // alert("Please enter your password");
      return;
    }
    console.log(email + " , " + password);
    const result = await loginUser(email, password);
    console.log(result);
    if (result["status"] == 201) {
      const data = result.data;
      const token = data.jwt;
      const name = data.name;
      const email = data.email;
      console.log("your name" + name);
      sessionStorage["token"] = token;
      sessionStorage["name"] = name;
      sessionStorage["email"] = email;
      // ROLE_ADMIN, ROLE_TRAVELER, ROLE_OPERATOR
      if (data.role == "ROLE_ADMIN") {
        navigate("/adminhome");
      }
      if (data.role == "ROLE_TRAVELER") {
          // ✅ Check if there is a stored redirect path
      const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/";
      
      // ✅ Remove it after redirecting to prevent infinite redirects
      sessionStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      }
      if (data.role == "ROLE_OPERATOR") {

        // console.log("appeoved"+data.operatorDetailsEntity.approved)
        // console.log(data.operatorDetailsEntity);
        if (data.operatorDetailsEntity != null) {
          if (data.operatorDetailsEntity.approved) {
            navigate("/home");
          } else {
            
toast.info("Your account is not approved");
          }
        } else {
          navigate("/registration");
        }
      }
      } else {
        toast.error("Invalid email or password");
        }
        
    }
  
    const handleSignUp = async () => {
      event.preventDefault();
      if (!name.trim()) {
        toast.warning("Please enter your name");
        // alert("Please enter your name");
        return;
      }
      if (!phone.trim()) {
        toast.warning("Please enter your phone number");
        // alert("Please enter your phone number");
        return;
      }
      if (!email.trim()) {
        toast.warning("Please enter your email");
        // alert("Please enter your email");
        return;
      }
      if (!password) {
        toast.warning("Please enter your password");
        // alert("Please enter your password");
        return;
      }
      if (password !== reEnterPassword) {
        toast.warning("Passwords do not match");
        // alert("Passwords do not match");
        return;
      }
      if (!role) {
        toast.warning("Please select your role");
        // alert("Please select your role");
        return;
      }
  
      console.log("Traveler Registration:", {
        name,
        email,
        phone,
        password,
        role,
      });
      const result = await registerUser(name, email, phone, password, role);
      console.log("status result " + result.status);
      if (result["status"] == 201) {
        setIsActive(false);
        setShowModal(false);
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
                {/* <span>With phone</span>
                <input type="text" placeholder="Enter your phone number" />
                <span>or use your email password</span> */}
                <input
                  type="email"
                  placeholder="Enter your email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                
                <a href="#"  onClick={() => toast.info("forget password feature will be available soon! 🚀")}>Forget Your Password?</a>
                <Button
                  id="Sign_in"
                  title="Sign in"
                  change={handleSignIn}
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
