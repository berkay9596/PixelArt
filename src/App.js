import Canvas from "./Canvas";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  // const [grid, setGrid] = useState(
  //   JSON.parse(localStorage.grid || "null") ||
  //     Array(25)
  //       .fill(0)
  //       .map(() =>
  //         Array(25)
  //           .fill(0)
  //           .map((e) => "")
  //       )
  // );
  return (
    <>
      <Navbar />
      <article className="prose mx-auto">
        <h1 className="text-center my-8">JOIN WITH A PIXEL</h1>
      </article>
      <div className="container mx-auto">
        <Canvas />
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
