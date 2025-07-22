import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Admin from "../pages/Admin";
import Contact from "../pages/Contact";
import Impact from "../pages/Impact";
import Join from "../pages/Join";
import News from "../pages/News";
import Programs from "../pages/Programs";
import Videos from "../pages/Videos";
import ProblemSolution from "../pages/ProblemSolution";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/impact" element={<Impact />} />
    <Route path="/join" element={<Join />} />
    <Route path="/news" element={<News />} />
    <Route path="/programs" element={<Programs />} />
    <Route path="/videos" element={<Videos />} />
    <Route path="/ProblemSolution" element={<ProblemSolution />} />
  </Routes>
);

export default AppRoutes;
