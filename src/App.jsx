import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import AdminRoute from "./components/auth/AdminRoute";
import HomescreenLayout from "./components/layouts/HomescreenLayout";
import Community from "./components/homescreen/Community";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AdminLogin from "./components/auth/AdminLogin";
import AdminSignup from "./components/auth/AdminSignup";
import JobList from "./components/jobs/JobList";
import JobForm from "./components/jobs/JobForm";
import JobDetail from "./components/jobs/JobDetail";
import EditJob from "./components/jobs/EditJob";
import AdminJob from "./components/jobs/AdminJob";
import Navbar from "./components/core/navbar";
import MobileNavbar from "./components/core/MobileNavbar";
import PublicNewsList from "./components/news/PublicNewsList";
import NewsDetail from "./components/news/NewsDetail";
import AdminNewsList from "./components/news/AdminNewsList";
import NewsForm from "./components/news/NewsForm";
import CertificateForm from "./components/certificate/CertificateForm";
import CertificatePreview from "./components/certificate/CertificatePreview";
import CertificateVerification from "./components/certificate/CertificateVerification";
import EventList from "./components/event/EventList";
import EventDetails from "./components/event/EventDetails";
import EventRegistration from "./components/event/EventRegistration";
import EventTicketDisplay from "./components/event/EventTicketDisplay";
import UserTickets from "./components/event/UserTicket";
import AdminEventList from "./components/event/AdminEventList";
import AdminEventForm from "./components/event/AdminEventForm";
import PaymentSuccess from "./components/event/PaymentSuccess";
import PaymentFailure from "./components/event/PaymentFailure";
import WorkshopList from "./components/workshops/WorkshopList";
import WorkshopDetails from "./components/workshops/WorkshopDetails";
import WorkshopRegistration from "./components/workshops/WorkshopRegistration";
import AdminWorkshopList from "./components/workshops/AdminWorkshopList";
import AdminWorkshopForm from "./components/workshops/AdminWorkshopForm";
import FounderSection from "./components/founders/FounderSection";
import BlogList from "./components/blog/BlogList";
import BlogPost from "./components/blog/BlogPost";
import BlogAdmin from "./components/blog/BlogAdmin";
import BlogEditor from "./components/blog/BlogEditor";
import TeamPage from "./components/team/TeamPage";
import Products from "./components/products/products";
import Careerpg from "./components/career/Careerpg";
import InternshipList from "./components/internship/InternshipList";
import InternshipDetail from "./components/internship/InternshipDetail";
import InternshipForm from "./components/internship/InternshipForm";
import EditInternship from "./components/internship/EditInternship";
import AdminInternship from "./components/internship/AdminInternship";
import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <div className="md:flex hidden">
            <Navbar />
          </div>
          <div className="md:hidden">
            <MobileNavbar />
          </div>

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomescreenLayout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/community" element={<Community />} />
            <Route path="/founders" element={<FounderSection />} />
            <Route path="/teams" element={<TeamPage />} />
            <Route path="/merchandise" element={<Products />} />
            <Route path="/career" element={<Careerpg />} />
            <Route path="/news" element={<PublicNewsList />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/internships" element={<InternshipList />} />
            <Route path="/internships/:id" element={<InternshipDetail />} />

            <Route
              path="/events/:id/register"
              element={<EventRegistration />}
            />
            <Route
              path="/events/ticket/:ticketId"
              element={<EventTicketDisplay />}
            />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/workshops" element={<WorkshopList />} />
            <Route path="/workshops/:id" element={<WorkshopDetails />} />
            <Route
              path="/workshops/:id/register"
              element={<WorkshopRegistration />}
            />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/failure" element={<PaymentFailure />} />

            {/* Protected User Routes */}
            <Route
              path="/my-tickets"
              element={
                <PrivateRoute>
                  <UserTickets />
                </PrivateRoute>
              }
            />
            <Route
              path="/verify-certificate"
              element={
                <PrivateRoute>
                  <CertificateVerification />
                </PrivateRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/jobs"
              element={
                <AdminRoute>
                  <AdminJob />
                </AdminRoute>
              }
            />
            <Route
              path="/jobs/new"
              element={
                <AdminRoute>
                  <JobForm />
                </AdminRoute>
              }
            />
            <Route
              path="/jobs/:id/edit"
              element={
                <AdminRoute>
                  <EditJob />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/news"
              element={
                <AdminRoute>
                  <AdminNewsList />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/news/new"
              element={
                <AdminRoute>
                  <NewsForm />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/news/:id/edit"
              element={
                <AdminRoute>
                  <NewsForm />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/events"
              element={
                <AdminRoute>
                  <AdminEventList />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/events/new"
              element={
                <AdminRoute>
                  <AdminEventForm />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/events/:id/edit"
              element={
                <AdminRoute>
                  <AdminEventForm />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/blog"
              element={
                <AdminRoute>
                  <BlogAdmin />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/blog/new"
              element={
                <AdminRoute>
                  <BlogEditor />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/blog/:id/edit"
              element={
                <AdminRoute>
                  <BlogEditor />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/workshops"
              element={
                <AdminRoute>
                  <AdminWorkshopList />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/workshops/new"
              element={
                <AdminRoute>
                  <AdminWorkshopForm />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/workshops/:id/edit"
              element={
                <AdminRoute>
                  <AdminWorkshopForm />
                </AdminRoute>
              }
            />

            <Route
              path="/certificate/generate"
              element={
                <AdminRoute>
                  <CertificateForm />
                </AdminRoute>
              }
            />
            <Route
              path="/certificate/preview"
              element={
                <AdminRoute>
                  <CertificatePreview />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/internships"
              element={
                <AdminRoute>
                  <AdminInternship />
                </AdminRoute>
              }
            />
            <Route
              path="/internships/new"
              element={
                <AdminRoute>
                  <InternshipForm />
                </AdminRoute>
              }
            />
            <Route
              path="/internships/:id/edit"
              element={
                <AdminRoute>
                  <EditInternship />
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
