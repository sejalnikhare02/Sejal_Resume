import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/pages/home/Index";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
