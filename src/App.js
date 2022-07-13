import "./App.css";
import QnA from "./components/QnA/QnA.jsx";
import About from "./components/About/About";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Home/Main";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HeaderMobile from "./components/Header/HeaderMobile";
import { PrivateRoute } from "./PrivateRouter";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(undefined);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    width <= 767 ? setIsMobile(true) : setIsMobile(false);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return (
    <>
      <BrowserRouter>
        {isMobile ? <HeaderMobile /> : <Header />}
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Main />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/about" element={<About />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/qna" element={<QnA />} />
          </Route>
          <Route exact path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
