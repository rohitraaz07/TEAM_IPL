import { FaFacebookSquare, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa"
import { TfiEmail } from "react-icons/tfi"

const Footer = () => {
  return (
    <>
      <div className="mx-10">
        <hr className="border-t border-slate-300 " />
      </div>

      <footer className="fixed bottom-0 inset-x-0 pb-2 bg-black rounded-b-md">
        <div className="mx-auto text-center">
          
          <p className="text-white font-bold text-base sm:text-lg mt-2">
            Contact Me
          </p>

          <div className="flex justify-center space-x-6 mt-3">
            
            <a
              href="mailto:yourmail@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-violet-400 transition"
            >
              <TfiEmail />
            </a>

            <a
              href="https://github.com/rohitraaz07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-violet-400 transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/rohit-raj-96a664243"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-violet-400 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://www.instagram.com/_ro_hit.07/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-violet-400 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com/rohitraj.prasad.9/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-violet-400 transition"
            >
              <FaFacebookSquare />
            </a>

          </div>
          <p className="text-white  text-base sm:text-sm mt-3">
            © 2026 Rohit Raj | Designed & Developed with Passion
          </p> 
        </div>
      </footer>
       
    </>
  )
}

export default Footer


