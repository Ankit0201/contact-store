import "./App.css";
import Header from "./Components/Header";
import ComponentRoutes from "./Components/ComponentRoutes";
import { BrowserRouter } from "react-router-dom";
import { Loader } from "./Components/Loader";
import { useLoader } from "./services/LoaderContextProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isLoading } = useLoader();
  return (
    <>
    <ToastContainer />
      {isLoading && <Loader />}
      <BrowserRouter>
        <Header />
        <ComponentRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
