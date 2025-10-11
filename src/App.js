import { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import LoadingScreen from "./components/common/LoadingScreen";
import { closeDropdown } from "./features/uiSlice";
import Dropdown from "./components/common/DropDown";
import FloatingButtons from "./components/common/FloatingButtons";

const BackToTopButton = lazy(() =>
  import("./components/common/BackToTopButton")
);
const Footer = lazy(() => import("./components/common/Footer"));
const BackgroundAnimation = lazy(() =>
  import("./components/BackgroundAnimation")
);

const Home = lazy(() => import("./pages/Home"));
const AboutTwo = lazy(() => import("./pages/AboutTwo"));
const Services = lazy(() => import("./pages/Services"));
const PropertyFive = lazy(() => import("./pages/PropertyFive"));
const BlogThree = lazy(() => import("./pages/BlogThree"));
const Contact = lazy(() => import("./pages/Contact"));
const Portifolio = lazy(() => import("./pages/Portifolio"));
const Faqs = lazy(() => import("./pages/Faqs"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// import NewsLetter from "./components/common/NewsLetter";
function App() {
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const route = useLocation();
  const isAdminRoute = route.pathname.startsWith("/admin");

  // Show/Hide scroll to top button
  window.addEventListener("scroll", () => {
    window.scrollY > 500 ? setShowButton(true) : setShowButton(false);
  });

  const handleCloseDropdown = (e) => {
    dispatch(closeDropdown());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  // Admin routes layout (without navbar/footer)
  if (isAdminRoute) {
    return (
      <div>
        {loading ? (
          <LoadingScreen onComplete={() => setLoading(false)} />
        ) : (
          <Suspense
            fallback={<div className="loading-placeholder">Loading...</div>}
          >
            <Routes>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        )}
      </div>
    );
  }

  // Regular routes layout (with navbar/footer)
  return (
    <div>
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Suspense
            fallback={<div className="loading-placeholder">Loading...</div>}
          >
            <BackgroundAnimation />
          </Suspense>
          <Navbar />
          <Dropdown />
          <div
            className="min-h-screen pb-40 relative"
            onClick={handleCloseDropdown}
            onMouseOver={() => dispatch(closeDropdown())}
          >
            <Suspense fallback={<div className="loading-placeholder"></div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-2" element={<AboutTwo />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<PropertyFive />} />
                <Route path="/blog-3" element={<BlogThree />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/portifolio" element={<Portifolio />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </div>
          <div className="px-[2%] md:px-[6%] bg-black  py-5">
            {/* <NewsLetter /> */}
            <div className="mt-20">
              <Suspense
                fallback={
                  <div className="loading-placeholder">Loading footer...</div>
                }
              >
                <Footer />
              </Suspense>
            </div>
          </div>
          <Suspense fallback={null}>
            <BackToTopButton showButton={showButton} />
            <FloatingButtons />
          </Suspense>
        </>
      )}
    </div>
  );
}

export default App;
