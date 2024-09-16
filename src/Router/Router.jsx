import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import About from "../Pages/About/About";
import Details from "../Pages/Products/Details";
import Notfound from "../Pages/Notfound/Notfound";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Contact from "../Pages/Contact/Contact";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import FavoriteMovies from "../Pages/Favorites/Favorites";
import EmailVerification from "../Components/Verification/Verification";
export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/details/:id" element={<Details />} /> */}
          <Route path="/products/:id" element={<Details />} />
          <Route path="/favorites" element={<FavoriteMovies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
