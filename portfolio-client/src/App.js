import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/pages/home/Index";
import { useEffect } from "react";
import Loader from "./components/Loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, setPortfolioData, showLoading } from "./redux/rootSlice";
import Admin from "./components/pages/admin/Index";
import AdminLogin from "./components/pages/admin/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPortfolioData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL + "/api/portfolio/get-portfolio-data",
        );
        dispatch(setPortfolioData(response.data));
        dispatch(HideLoading());
      } catch (error) {
        dispatch(HideLoading());
      }
    };

    if (!portfolioData) {
      getPortfolioData();
    }
  }, [portfolioData, dispatch]);

  return (
    <>
      <BrowserRouter>
        {loading ? <Loader /> : null}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
