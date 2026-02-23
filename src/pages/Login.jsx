import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { toast } from "react-toastify"

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home", { replace: true })
      }
    })
    return () => unsubscribe()
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("Login Successful")
      navigate("/home", { replace: true })
    } catch (err) {
      toast.error("Email or Password has wrong credentials")
      console.log(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* left side */}
        <div className="hidden lg:flex items-center justify-center bg-gray-50">
          <img
            src="https://cdn.dribbble.com/users/2477004/screenshots/4944037/media/69078450a2146fb2f0fef203789291ec.gif"
            alt="Login Illustration"
            className="w-full h-auto object-contain mb-13"
          />
        </div>

       {/* Right side */}
        <div className="p-4">
          <div className=" w-auto p-1">
         <div className="max-w-sm sm:ml-20 mx-auto lg:mx-0 p-7 border mt-2x my-3">

           <div className="text-center my-7">
             <h1 className="text-3xl text-black uppercase font-extrabold underline">
               IPL TEAMS
             </h1>
           </div>

           <form onSubmit={handleLogin} className="max-w-sm mx-auto pl-2 pr-2 my-4">

              <div className="my-1">
               <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-9 pl-3 rounded text-xs text-black border border-slate-300 bg-slate-50"
                required
              />
            </div>

            <div className="my-2 mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-9 pl-3 rounded text-xs text-black border border-slate-300 bg-slate-50"
                required
              />
            </div>

            <div className="grid mt-7">
              <button
                type="submit"
                className="w-full h-11 font-semibold text-white rounded-sm bg-blue-400 hover:bg-blue-700 transition duration-300 cursor-pointer"
              >
                Log in
              </button>
            </div>

          </form>

          <div className="flex items-center my-5">
            <hr className="grow border-t-2 border-gray-300 mx-3" />
            <span className="text-gray-500 text-xs font-semibold">OR</span>
            <hr className="grow border-t-2 border-gray-300 mx-3" />
          </div>

          <p className="px-7 text-xs text-center text-gray-500 font-semibold mt-4">
            Forgot password?
          </p>
        </div>

        <div className="max-w-sm sm:ml-20 mx-auto lg:mx-0 p-5 border">
          <p className="text-center font-bold">
            Welcome to Incredible Premier League
          </p>
        </div>

         <div className="max-w-sm sm:ml-20 mx-auto lg:mx-0">
             <p className="my-4 text-sm text-center">Get the app.</p>
             <div className="grid grid-cols-2 mx-7 gap-2">
              <div className="flex justify-end">
                  <img
                  style={{ height: "40px" }}
                  src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
                  alt=""
                />
              </div>
              <div className="flex justify-start">
                <img
                  style={{ height: "40px" }}
                  src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          </div>
        {/* right end */}

        </div>


      </div>

    </div>
  )
}

export default Login