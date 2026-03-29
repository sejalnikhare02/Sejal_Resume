import { useSelector } from "react-redux";
import Header from "../../Header";
import About from "./About";
import Contact from "./Contact";
import Experience from "./Experience";
import Footer from "./Footer";
import Intro from "./Intro";
import LeftSider from "./LeftSider";
import Projects from "./Projects";

const Home = () => {
  const { portfolioData } = useSelector((state) => state.root);
  return (
    <div>
      <Header />
      {portfolioData && (
        <div className="bg-primary px-40 sm:px-5 sm:py-5">
          <Intro />
          <Contact />
          <About />
          <Experience />
          <Projects />
          <Footer />
          <LeftSider />
        </div>
      )}
    </div>
  );
};

export default Home;
