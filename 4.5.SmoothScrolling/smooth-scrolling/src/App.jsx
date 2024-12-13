import { useState, useEffect, useRef } from 'react'
import './App.css'

function LazyLoadSection({ children }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(ref.current)
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -100px 0px', // Trigger earlier
      }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`image-section ${isVisible ? 'visible' : ''}`}
    >
      {isVisible && children}
    </div>
  )
}

function App() {
  return (
    <>
      <h2>Your Name - Hello!</h2>
      <LazyLoadSection>
        <img src="/assets/Wpro.png" alt="Wpro" />
        <ul>
          <li>Detail point 1 for Wpro</li>
          <li>Detail point 2 for Wpro</li>
          <li>Detail point 3 for Wpro</li>
        </ul>
      </LazyLoadSection>
      <LazyLoadSection>
        <ul>
          <li>Detail point 1 for Iarc</li>
          <li>Detail point 2 for Iarc</li>
          <li>Detail point 3 for Iarc</li>
        </ul>
        <img src="/assets/Iarc.jpg" alt="Iarc" />
      </LazyLoadSection>
      <LazyLoadSection>
        <img src="/assets/CdVta.jpg" alt="CdVta" />
        <ul>
          <li>Detail point 1 for CdVta</li>
          <li>Detail point 2 for CdVta</li>
          <li>Detail point 3 for CdVta</li>
        </ul>
      </LazyLoadSection>
    </>
  )
}

export default App