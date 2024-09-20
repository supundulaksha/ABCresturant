
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";



function RootLayout() {
  return (

    <div>
      <header>
        <Header />
      </header>
      <div>
        <Outlet />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
 
  );
}

export default RootLayout;
