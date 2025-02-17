import { FaGithub, FaLinkedin } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer bg-cyan-50 glass text-base-content ">
      <div className="md:w-11/12 mx-auto py-6">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-bold">
              <span className="bg-gradient-to-r from-stone-300 to-cyan-600 bg-clip-text text-transparent">
                PIC-SEEK
              </span>
              <span className="text-cyan-600">AI</span>
            </Link>
          </div>
          <div className="flex gap-4 mt-4 lg:mt-0">
            <Link
              to="https://github.com/nahidn228"
              target="_blank"
              className=" hover:text-cyan-600"
            >
              <FaGithub size={24} />
            </Link>
            <Link
              to="https://www.linkedin.com/in/nahid-hasan01/"
              target="_blank"
              className=" hover:text-cyan-600"
            >
              <FaLinkedin size={24} />
            </Link>
            <Link
              to="https://nahidhasan-portfolio.vercel.app/"
              target="_blank"
              className=" hover:text-cyan-600"
            >
              <VscAccount size={24} />
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-4">
          <p className="text-sm text-center">
            © {new Date().getFullYear()} Nahid. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
