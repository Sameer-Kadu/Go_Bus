import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authentication from "./authentication/Authentication.jsx";

const App = () => {
  return (
    <Router navigator="" location="">
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <Routes>
          {/* Main Layout: Home and About */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <About />
              </>
            }
          />

          <Route path="/auth" element={<Authentication />} />
          {/*<Route path="/signup" element={<SignUp />} />*/}
        </Routes>
      </main>
    </Router>
  );
};
export default App;
