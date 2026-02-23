import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Home from "./pages/Home"
import AddTeam from "./pages/AddTeam"
import { ToastContainer } from "react-toastify"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/addteam"
          element={
            <ProtectedRoute>
              <Layout>
                <AddTeam />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  )
}

export default App