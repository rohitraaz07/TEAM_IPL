import { useEffect, useState } from "react"
import { db } from "../firebase/firebase"
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { useLocation } from "react-router-dom"

const Home = () => {
  const [teams, setTeams] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null)

  // Get search query from URL
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const searchTerm = query.get("search") || ""

  // Fetch Teams
  useEffect(() => {
    const fetchTeams = async () => {
      const querySnapshot = await getDocs(collection(db, "teams"))
      const teamList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setTeams(teamList)
    }

    fetchTeams()
  }, [])

  //Filter teams based on search
  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this team!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    })

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "teams", id))

        setTeams(prev => prev.filter(team => team.id !== id))
        setSelectedTeam(null)

        Swal.fire(
          "Deleted!",
          "The team has been deleted.",
          "success"
        )
      } catch (error) {
        toast.error("Error deleting team")
        console.error(error)
        Swal.fire(
          "Error!",
          "Something went wrong.",
          "error"
        )
      }
    }
  }

  return (
    <div className="parallax-container">
      <div className="p-10 mt-10">
        <h2 className="text-4xl font-bold mb-6 text-center text-black">
          <span className="text-orange-500">I</span>
          <span className="text-blue-600">P</span>
          <span className="text-green-600">L</span> TEAMS
        </h2>

        {/* Team Cards */}
        <div className="grid md:grid-cols-4 gap-6 bg-amber-200 rounded-t-sm rounded-b-sm p-7 opacity-54">

          {/* Use filteredTeams instead of teams */}
          {filteredTeams.length > 0 ? (
            filteredTeams.map(team => (
              <div
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                className="cursor-pointer border rounded-lg p-6 hover:bg-white  hover:shadow-xl transition-transform shadow-2xl"
              >
                <h3 className="text-2xl text-center font-bold text-black mt-2">
                  {team.name}
                </h3>
              </div>
            ))
          ) : (
            <p className="col-span-4 text-lg text-center text-red-600  font-bold">
              Sorry No team found !!!!!!!
            </p>
          )}

        </div>

        {/* Selected Team Details */}
        {selectedTeam && (
          <div className="mt-3 p-6 border rounded-lg shadow-lg bg-gray-100 mb-36">
            <h3 className="text-2xl font-bold mb-4 text-center">
              {selectedTeam.name}
            </h3>

            <p><strong>Members:</strong> {selectedTeam.members}</p>
            <p><strong>Description:</strong> {selectedTeam.description}</p>
            <p><strong>Favourite Venue:</strong> {selectedTeam.venue}</p>
            <p><strong>Home Ground:</strong> {selectedTeam.homeGround}</p>

            <div className="flex gap-4 mt-6 justify-center">
              <button
                onClick={() => setSelectedTeam(null)}
                className="px-4 py-2 border border-black rounded hover:bg-gray-200 cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => handleDelete(selectedTeam.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Home