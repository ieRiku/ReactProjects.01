import { useState, useEffect } from 'react'
import './App.css'
import { db } from './firebase'
import { ref, get, set, onValue } from "firebase/database"

function App() {
  const [count, setCount] = useState(0)

  // Function to fetch the initial count from Firebase
  const fetchFirebaseCount = () => {
    const countRef = ref(db, 'globalCount')
    get(countRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          setCount(snapshot.val())
          console.log("Fetched Firebase count:", snapshot.val())
        } else {
          console.log("No Firebase count found. Initializing to 0.")
          set(countRef, 0)
          setCount(0)
        }
      })
      .catch(error => console.error("Error fetching Firebase count:", error))
  }

  // Subscribe to realtime updates from Firebase so that changes sync across devices
  useEffect(() => {
    const countRef = ref(db, 'globalCount')
    onValue(countRef, snapshot => {
      if (snapshot.exists()) {
        setCount(snapshot.val())
        console.log("Global count updated from Firebase:", snapshot.val())
      } else {
        setCount(0)
      }
    })
    // Fetch initial value once on mount
    fetchFirebaseCount()
  }, [])

  // Update Firebase with the new count
  const updateFirebaseCount = (newCount) => {
    const countRef = ref(db, 'globalCount')
    set(countRef, newCount)
      .then(() => console.log("Firebase count updated:", newCount))
      .catch(error => console.error("Error updating Firebase count:", error))
  }

  const handleUpClick = () => {
    const newCount = count + 1
    updateFirebaseCount(newCount)
  }

  return (
    <>
      <h1>COUNT: {count}</h1>
      <div className="card">
        <button onClick={handleUpClick}>
          up
        </button>
      </div>
    </>
  )
}

export default App
