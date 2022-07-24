import Homepage from "./pages/Homepage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <article className="prose mx-auto">
        <h1 className="text-center relative top-4	">JOIN WITH A PIXEL</h1>
      </article>
      <div className="container mx-auto">
        <Homepage />
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
