import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import SellerDashboard from "./pages/seller/SellerDashboard";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import PageWrapper from "./components/PageWrapper";
import BookForm from "./pages/seller/BookForm";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/buyer/AddToCart";
import ProtectedRoute from "./components/ProtectedRoute";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route
          path="/signup"
          element={
            <PageWrapper>
              <RegisterPage />
            </PageWrapper>
          }
        />
        <Route
          path="/"
          element={
            <PageWrapper>
              <LoginPage />
            </PageWrapper>
          }
        />

        {/* Protected routes */}
        <Route
          path="/buyer-dashboard"
          element={
            <ProtectedRoute element={<PageWrapper><BuyerDashboard /></PageWrapper>} requiredRole="buyer" />
          }
        />
        <Route
          path="/seller-dashboard"
          element={
            <ProtectedRoute element={<PageWrapper><SellerDashboard /></PageWrapper>} requiredRole="seller" />
          }
        />

        <Route
          path="/add-book"
          element={
            <PageWrapper>
              <BookForm closeModal={() => {}} refreshBooks={() => {}} />
            </PageWrapper>
          }
        />
        <Route
          path="/cart-item"
          element={
            <PageWrapper>
              <CartPage />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => {
  return (
    <Router>
      <CartProvider>
        <AnimatedRoutes />
      </CartProvider>
    </Router>
  );
};

export default App;
