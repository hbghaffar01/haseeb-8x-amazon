import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header.jsx";
import { CategoryBar } from "./components/layout/CategoryBar.jsx";
import { Footer } from "./components/layout/Footer.jsx";

// Code-split routes so the initial bundle (and FCP/LCP) stays small.
const HomePage = lazy(() =>
  import("./pages/HomePage.jsx").then((m) => ({ default: m.HomePage }))
);
const ProductDetailPage = lazy(() =>
  import("./pages/ProductDetailPage.jsx").then((m) => ({
    default: m.ProductDetailPage,
  }))
);
const CartPage = lazy(() =>
  import("./pages/CartPage.jsx").then((m) => ({ default: m.CartPage }))
);

export function App() {
  return (
    <>
      <Header />
      <CategoryBar />
      <main>
        <Suspense fallback={<p className="home-msg">Loading…</p>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
