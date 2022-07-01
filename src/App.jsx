import { createContext, useState } from "react";
import Canvas from "./Canvas";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
export const CanvasContext = createContext();

function App() {
  const [grid, setGrid] = useState(
    JSON.parse(localStorage.grid || "null") ||
      Array(25)
        .fill(0)
        .map(() =>
          Array(25)
            .fill(0)
            .map((e) => "")
        )
  );

  return (
    <CanvasContext.Provider value={{ grid, setGrid }}>
      <Navbar />
      {/* <img className="background-img" src={bg}></img> */}
      <article className="prose mx-auto">
          <h1 className="text-center my-8">JOIN WITH A PIXEL</h1>
        </article>
      <div className="container mx-auto">
        
        <Canvas />
      </div>
      <Footer />
      <ToastContainer />
    </CanvasContext.Provider>
  );
}

export default App;
