import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Container from "react-bootstrap/esm/Container";
import { AppRoutes } from "./routes/AppRoutes";
import { CartProvider } from "./context/CarritoContext";
import { Suspense } from "react";
import MySpinner from "./components/MySpinner";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header></Header>
          <Container style={{ minHeight: "91vh", minWidth: "100%", padding: "0" }}>
            <CartProvider>
              <Suspense fallback={<MySpinner></MySpinner>}>
                <AppRoutes></AppRoutes>
              </Suspense>
            </CartProvider>
          </Container>
          <Footer></Footer>

        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
