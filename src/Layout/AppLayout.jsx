import { useContext } from "react";
import Marquee from "react-fast-marquee";
import { Outlet } from "react-router";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import { AuthContext } from "../provider/AuthProvider";

const AppLayout = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user && user?.email && (
        <Marquee
          pauseOnHover={true}
          gradient={true}
          className="bg-primary text-base-100"
        >
          Welcome, Mr. {user?.displayName} 🐦‍🔥 ! Unleash the power of
          PicSeek-AI. Crafted by Nahid Hasan.
        </Marquee>
      )}
      <header className="bg-gradient-to-t lg:bg-gradient-to-l from-cyan-100 ">
        <nav className="md:w-11/12 mx-auto">
          <Navbar></Navbar>
        </nav>
      </header>

      <main className="min-h-[calc(100svh-125px)]">
        <Outlet></Outlet>
      </main>

      <Footer />

      {/* <footer className="footer footer-center bg-cyan-50 glass text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by{" "}
            <a href="https://nahidhasan-portfolio.vercel.app/" target="_blank">
              Nahid Hasan
            </a>
          </p>
        </aside>
      </footer> */}
    </>
  );
};

export default AppLayout;
