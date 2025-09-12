import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Impact from "../pages/Impact";
import Join from "../pages/Join";
import News from "../pages/News";
import Programs from "../pages/Programs";
import Videos from "../pages/Videos";
import ProblemSolution from "../pages/ProblemSolution";

import Admin from "../pages/Admin/Admin";
import YouthApp from "../pages/Admin/Youth/YouthApp";
import VideosApp from "../pages/Admin/Videos-/VideosApp";
import ProgramsApp from "../pages/Admin/Programs/ProgramsApp";
import NewsApp from "../pages/Admin/News-/NewsApp";
import Farmers from "../pages/Admin/Farmer/FarmerApp";
import ParentOrgApp from "../pages/Admin/Parent Organizations/ParentOrgApp";
import EmailSubApp from "../pages/Admin/Email Subscriptions/EmailSubApp";
import ContactMessagesApp from "../pages/Admin/Contact Messages/ContactMessagesApp";
import System_UserApp from "../pages/Admin/System Users/System_UserApp";

import Login from "../pages/Login"; // your login page
import ProtectedRoute from "../components/ProtectedRoute"; // wrapper

import NewsPage from "../pages/News/NewsPage";
import NewsDetail from "../pages/News/NewsDetail";

import ProramsPage from "../pages/programs/ProgramPage";
import ProramsDetail from "../pages/programs/ProgramDetail";

import VideoPage from "../pages/Videos/VideoPage";
import VideoDetailPage from "../pages/Videos/VideoDetailPage";

import YouthForm from "../pages/Join/YouthForm";
import FarmerFormJ from "../pages/Join/FarmerFormJ";
import ParentOrgForm from "../pages/Join/ParentOrgForm";

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/impact" element={<Impact />} />

    <Route path="/join" element={<Join />} />
    <Route path="/joinYouth" element={<YouthForm />} />
    <Route path="/joinFarmer" element={<FarmerFormJ />} />
    <Route path="/joinParentOrg" element={<ParentOrgForm />} />

    <Route path="/news" element={<News />} />
    <Route path="/programs" element={<Programs />} />
    <Route path="/videos" element={<Videos />} />
    <Route path="/ProblemSolution" element={<ProblemSolution />} />

    <Route path="/allprograms" element={<ProramsPage />} />
    <Route path="/programsDetail/:id" element={<ProramsDetail />} />

    <Route path="/allnews" element={<NewsPage />} />
    <Route path="/newsDetail/:id" element={<NewsDetail />} />

    <Route path="/allvideo" element={<VideoPage />} />
    <Route path="/videoDetails/:id" element={<VideoDetailPage />} />

    {/* Login route */}
    <Route path="/login" element={<Login />} />

    {/* Admin routes (protected) */}
    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <Admin />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/Youths"
      element={
        <ProtectedRoute>
          <YouthApp />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/Videos"
      element={
        <ProtectedRoute>
          <VideosApp />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/Programs"
      element={
        <ProtectedRoute>
          <ProgramsApp />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/News"
      element={
        <ProtectedRoute>
          <NewsApp />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/Farmers"
      element={
        <ProtectedRoute>
          <Farmers />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/Parent_organizations"
      element={
        <ProtectedRoute>
          <ParentOrgApp />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/Email_subscriptions"
      element={
        <ProtectedRoute>
          <EmailSubApp />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/Contact_messages"
      element={
        <ProtectedRoute>
          <ContactMessagesApp />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/System_users"
      element={
        <ProtectedRoute>
          <System_UserApp />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;


