import { useState, useRef, useEffect } from 'react'
import { database } from '../firebase'
import { ref, onValue, runTransaction, set } from "firebase/database"
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [loggedIn, setLoggedIn] = useState(false)
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const incIntervalRef = useRef(null)
  const decIntervalRef = useRef(null)
  const incTimeoutRef = useRef(null)
  const decTimeoutRef = useRef(null)
  const password = "com"
  const email = "com"

  // Check for existing session on mount
  useEffect(() => {
    const session = localStorage.getItem('session')
    if (session) {
      const { expiration } = JSON.parse(session)
      if (Date.now() < expiration) {
        setLoggedIn(true)
      } else {
        localStorage.removeItem('session')
      }
    }
  }, [])

  // Subscribe to global count on mount
  useEffect(() => {
    const countRef = ref(database, 'globalCount')
    onValue(countRef, snapshot => {
      if (snapshot.exists()) {
        setCount(snapshot.val())
      } else {
        // Removed set(countRef, 0) to prevent resetting on each mount
        setCount(0)
      }
    })
  }, [])

  const startIncrement = () => {
    if (incIntervalRef.current) return
    incIntervalRef.current = setInterval(() => {
      runTransaction(ref(database, 'globalCount'), (currentValue) => (currentValue || 0) + 1)
    }, 100)
  }

  const stopIncrement = () => {
    clearInterval(incIntervalRef.current)
    incIntervalRef.current = null
  }

  const startDecrement = () => {
    if (decIntervalRef.current) return
    decIntervalRef.current = setInterval(() => {
      runTransaction(ref(database, 'globalCount'), (currentValue) => (currentValue || 0) - 1)
    }, 100)
  }

  const stopDecrement = () => {
    clearInterval(decIntervalRef.current)
    decIntervalRef.current = null
  }

  const handleMouseDownIncrement = () => {
    incTimeoutRef.current = setTimeout(() => {
      startIncrement()
      incTimeoutRef.current = null
    }, 300)
  }

  const handleMouseUpIncrement = () => {
    if (incTimeoutRef.current) {
      clearTimeout(incTimeoutRef.current)
      incTimeoutRef.current = null
    }
    stopIncrement()
  }

  const handleMouseDownDecrement = () => {
    decTimeoutRef.current = setTimeout(() => {
      startDecrement()
      decTimeoutRef.current = null
    }, 300)
  }

  const handleMouseUpDecrement = () => {
    if (decTimeoutRef.current) {
      clearTimeout(decTimeoutRef.current)
      decTimeoutRef.current = null
    }
    stopDecrement()
  }

  const handleLogin = () => {
    if (inputEmail === email && inputPassword === password) {
      const expiration = Date.now() + 15 * 24 * 60 * 60 * 1000 // 15 days
      localStorage.setItem('session', JSON.stringify({ token: 'loggedIn', expiration }))
      setLoggedIn(true)
    } else {
      alert('Invalid credentials')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('session')
    setLoggedIn(false)
  }

  return (
    <>
      {!loggedIn ? (
        <div className="loginForm">
          {/* Login Form */}
          <input 
            type="email" 
            placeholder="Email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <>
          <button className="logout" onClick={handleLogout}>Logout</button>
          <h1>VALUE: {count}</h1>
          <div className="card">
            <button 
              onClick={() => 
                runTransaction(ref(database, 'globalCount'), c => (c || 0) + 1)
                  .then(result => {
                    if (!result.committed) {
                      console.error("Increase transaction not committed", result);
                    }
                  })
                  .catch(error => console.error("Increase transaction error:", error))
              }
              onMouseDown={handleMouseDownIncrement}
              onMouseUp={handleMouseUpIncrement}
              onMouseLeave={handleMouseUpIncrement}
            >
              Increase
            </button>
            <button 
              onClick={() => 
                runTransaction(ref(database, 'globalCount'), c => (c || 0) - 1)
                  .then(result => {
                    if (!result.committed) {
                      console.error("Decrease transaction not committed", result);
                    }
                  })
                  .catch(error => console.error("Decrease transaction error:", error))
              }
              onMouseDown={handleMouseDownDecrement}
              onMouseUp={handleMouseUpDecrement}
              onMouseLeave={handleMouseUpDecrement}
            >
              Decrease
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default App
