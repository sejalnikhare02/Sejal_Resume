import Header from "../../Header";
import About from "./About";
import Contact from "./Contact";
import Experience from "./Experience";
import Footer from "./Footer";
import Intro from "./Intro";
import LeftSider from "./LeftSider";
import Projects from "./Projects";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="bg-primary px-40 sm:px-5 sm:py-5">
        <Intro />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
        <LeftSider />
      </div>
    </div>
  );
};

export default Home;
