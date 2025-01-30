import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authentication from "./authentication/Authentication.jsx";
import Features from "./components/Features.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Buses from "./Buses/Buses.jsx";
import PassengerInformation from "./Passenger/PassengerInformation.jsx";
import TicketSummary from "./Payment/TicketSummary.jsx";

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
                <Features />
                <Contact />
                <Footer />
              </>
            }
          />

          <Route path="/auth" element={<Authentication />} />
          <Route path="/buses" element={<Buses />} />
          <Route path="/selectSeat" element={<PassengerInformation/>} />
          <Route path="/payment" element={<TicketSummary/>} />
        </Routes>
        
      </main>
    </Router>
  );
};
export default App;
