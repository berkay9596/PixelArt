import Canvas from "./pages/Canvas";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <article className="prose mx-auto">
        <h1 className="text-center relative top-4	">JOIN WITH A PIXEL</h1>
      </article>
      <div className="container mx-auto">
        <Canvas />
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
