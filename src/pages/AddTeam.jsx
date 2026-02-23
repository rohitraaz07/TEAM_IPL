import { useState } from "react"
import { db } from "../firebase/firebase"
import { collection, addDoc } from "firebase/firestore"
import { toast } from "react-toastify"

const AddTeam = () => {
  const [teamName, setTeamName] = useState("")
  const [members, setMembers] = useState("")
  const [description, setDescription] = useState("")
  const [venue, setVenue] = useState("")
  const [homeGround, setHomeGround] = useState("")

  const handleAdd = async (e) => {
    e.preventDefault()

    try {
      if (!teamName || !members || !description || !venue || !homeGround) {
        toast.error("Please fill all fields")
        return
      }

      await addDoc(collection(db, "teams"), {
        name: teamName,
        members,
        description,
        venue,
        homeGround,
        createdAt: new Date()
      })

      toast.success("Team Added Successfully")

      setTeamName("")
      setMembers("")
      setDescription("")
      setVenue("")
      setHomeGround("")
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-7 pb-20">

      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* Left Image Section */}
        <div className="hidden lg:flex items-center justify-center bg-gray-50 p-2">
          <img
            src="https://wallpapers.com/images/featured/ipl-2021-ix7zwgff29ylomuf.jpg"
            alt="Favorite Player"
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>

        {/* Right Form Section */}
        <div className="p-8">

          <h2 className="text-3xl font-bold mb-6 text-center">
            ADD TEAM
          </h2>

          <form onSubmit={handleAdd} className="space-y-4">

            <input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team Name"
              className="w-full h-11 px-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              placeholder="Team Members"
              className="w-full h-11 px-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Team Description"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              rows="3"
            />

            <input
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="Favourite Venue"
              className="w-full h-11 px-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              value={homeGround}
              onChange={(e) => setHomeGround(e.target.value)}
              placeholder="Home Ground"
              className="w-full h-11 px-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              type="submit"
              className="w-full h-11 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
            >
              Add Team
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default AddTeam