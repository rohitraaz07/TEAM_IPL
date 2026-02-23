import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/firebase"

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  // While checking login state
  if (user === undefined) return null

  // If not logged in → go to login page
  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute