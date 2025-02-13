import { useState, useRef, useEffect } from 'react'
import { database } from '../firebase'
import { ref, onValue, runTransaction, set, get } from "firebase/database"
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
  const passwordInputRef = useRef(null) // new ref for password input
  const password = "com"
  const email = "com"

  // Helper to update database based on delta change
  const updateGlobal = (delta) => {
    console.log("updateGlobal called with delta:", delta)
    runTransaction(ref(database, 'globalCount'), (currentValue) => {
      return (currentValue || 0) + delta
    })
      .then(result => {
        console.log("Transaction result:", result);
        if (!result.committed) {
          console.log("Transaction not committed", result);
        }
      })
      .catch(error => console.log("Transaction error:", error))
  }

  // Check for existing session on mount  // 15 days set now.
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
    // One-time initialization: if globalCount doesn't exist, write 0.
    get(countRef)
      .then(snapshot => {
        if (!snapshot.exists()) {
          console.log("Initializing globalCount in Firebase to 0.");
          set(countRef, 0)
          setCount(0)
        } else {
          setCount(snapshot.val())
        }
      })
      .catch(error => console.log("Error initializing globalCount:", error));
    
    // Attach onValue listener
    onValue(countRef, snapshot => {
      console.log("Global count updated from Firebase:", snapshot.val());
      setCount(snapshot.val())
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
      // For a quick click, update using onClick already
    }
    stopIncrement();
    // Remove updateGlobal(0) if no additional update is needed
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
      // For a quick click, update using onClick already
    }
    stopDecrement();
    // Remove updateGlobal(0) if no additional update is needed
  }

  const handleTouchStartIncrement = () => { // basically same as mouse events
    handleMouseDownIncrement();
  }
  const handleTouchEndIncrement = () => {
    handleMouseUpIncrement();
  }
  const handleTouchStartDecrement = () => { // basically same as mouse events
    handleMouseDownDecrement();
  }
  const handleTouchEndDecrement = () => {
    handleMouseUpDecrement();
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
            onKeyDown={(e) => { if(e.key === 'Enter' && passwordInputRef.current) passwordInputRef.current.focus() }} // new event handler
          />
          <input 
            type="password" 
            placeholder="Password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            ref={passwordInputRef} // attach ref
            onKeyDown={(e) => { if(e.key === 'Enter') handleLogin() }} // new submit on enter
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <>
          <button className="logout" onClick={handleLogout}>Logout</button>
          <div className="App">
          <h1 className='value'>VALUE: {count}</h1>
          <div className="card">
            <button 
              onClick={() => {updateGlobal(1); console.log("Increase")}}
              onMouseDown={handleMouseDownIncrement}
              onMouseUp={handleMouseUpIncrement}
              onMouseLeave={handleMouseUpIncrement}
              onTouchStart={handleTouchStartIncrement}
              onTouchEnd={handleTouchEndIncrement}
              onTouchCancel={handleTouchEndIncrement}
              className='increment'
            >
              Increase
            </button>
            <button 
              onClick={() => {updateGlobal(-1); console.log("Decrease")}}
              onMouseDown={handleMouseDownDecrement}
              onMouseUp={handleMouseUpDecrement}
              onMouseLeave={handleMouseUpDecrement}
              onTouchStart={handleTouchStartDecrement}
              onTouchEnd={handleTouchEndDecrement}
              onTouchCancel={handleTouchEndDecrement}
              className='decrement'
            >
              Decrease
            </button>
          </div>
          </div>
        </>
      )}
    </>
  )
}

export default App
