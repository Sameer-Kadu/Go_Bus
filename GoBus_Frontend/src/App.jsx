import React from 'react';
import Home from './components/Home.jsx';
import About from "./components/About.jsx";
import Navbar from "./components/Navbar.jsx";
const App = () => {
    return (
        <main className="relateive min-h-screen w-screen overflow-x-hidden">
            <Navbar />
           <Home />
            <About />
        </main>
    )
}
export default App;