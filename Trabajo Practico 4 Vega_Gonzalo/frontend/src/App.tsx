import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Container from "react-bootstrap/esm/Container";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Container style={{ minHeight: "91vh", minWidth: "100%", padding: "0" }}>
          <AppRoutes></AppRoutes>
        </Container>
        <Footer></Footer>

      </BrowserRouter>

    </>
  )
}

export default App
