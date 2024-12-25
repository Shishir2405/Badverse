import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import HomescreenLayout from "./components/layouts/HomescreenLayout";
import Community from "./components/homescreen/Community";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
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
// Blog Components
import BlogList from "./components/blog/BlogList";
import BlogPost from "./components/blog/BlogPost";
import BlogAdmin from "./components/blog/BlogAdmin";
import BlogEditor from "./components/blog/BlogEditor";
import TeamPage from "./components/team/TeamPage";
import Products from "./components/products/products";
import Careerpg from "./components/career/Careerpg";
import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          {/* Navbar */}
          <div className="md:flex hidden">
            <Navbar />
          </div>
          <div className="md:hidden">
            <MobileNavbar />
          </div>

          {/* Main Content */}
          <Routes>
            <Route path="/" element={<HomescreenLayout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/admin-signup" element={<Signup />} />
            <Route path="/community" element={<Community />} />
            <Route path="/founders" element={<FounderSection />} />
            <Route path="/teams" element={<TeamPage />} />
            <Route path="/merchandise" element={<Products />} />
            <Route path="/career" element={<Careerpg/>} />

            {/* Public News Routes */}
            <Route path="/news" element={<PublicNewsList />} />
            <Route path="/news/:id" element={<NewsDetail />} />

            {/* Job Routes */}
            <Route path="/jobs" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route
              path="/admin/jobs"
              element={
                <PrivateRoute>
                  <AdminJob />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobs/new"
              element={
                <PrivateRoute>
                  <JobForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobs/:id/edit"
              element={
                <PrivateRoute>
                  <EditJob />
                </PrivateRoute>
              }
            />

            {/* Certificate Routes */}
            <Route
              path="/certificate/generate"
              element={
                <PrivateRoute>
                  <CertificateForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/certificate/preview"
              element={
                <PrivateRoute>
                  <CertificatePreview />
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

            {/* Public Event Routes */}
            <Route path="/events" element={<EventList />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route
              path="/events/:id/register"
              element={<EventRegistration />}
            />
            <Route
              path="/events/ticket/:ticketId"
              element={<EventTicketDisplay />}
            />

            {/* Protected Event Routes */}
            <Route
              path="/my-tickets"
              element={
                <PrivateRoute>
                  <UserTickets />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <PrivateRoute>
                  <AdminEventForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/events/new"
              element={
                <PrivateRoute>
                  <AdminEventForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/events/:id/edit"
              element={
                <PrivateRoute>
                  <AdminEventForm />
                </PrivateRoute>
              }
            />
            {/* Blog Routes - Public */}
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPost />} />

            {/* Blog Routes - Admin */}
            <Route
              path="/admin/blog"
              element={
                <PrivateRoute>
                  <BlogAdmin />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/blog/new"
              element={
                <PrivateRoute>
                  <BlogEditor />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/blog/:id/edit"
              element={
                <PrivateRoute>
                  <BlogEditor />
                </PrivateRoute>
              }
            />

            {/* Payment Routes */}
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/failure" element={<PaymentFailure />} />

            {/* Protected News Routes */}
            <Route
              path="/admin/news"
              element={
                <PrivateRoute>
                  <AdminNewsList />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/news/new"
              element={
                <PrivateRoute>
                  <NewsForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/news/:id/edit"
              element={
                <PrivateRoute>
                  <NewsForm />
                </PrivateRoute>
              }
            />
            <Route path="/workshops" element={<WorkshopList />} />
            <Route path="/workshops/:id" element={<WorkshopDetails />} />
            <Route
              path="/workshops/:id/register"
              element={<WorkshopRegistration />}
            />

            <Route
              path="/admin/workshops"
              element={
                <PrivateRoute>
                  <AdminWorkshopList />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/workshops/new"
              element={
                <PrivateRoute>
                  <AdminWorkshopForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/workshops/:id/edit"
              element={
                <PrivateRoute>
                  <AdminWorkshopForm />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
