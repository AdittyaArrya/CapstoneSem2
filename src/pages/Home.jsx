import { useState, useEffect } from 'react'

const Home = () => {
  const [tip, setTip] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.quotable.io/random?tags=wellness|health|medical')
      .then(res => res.json())
      .then(data => {
        setTip(data.content)
        setLoading(false)
      })
      .catch(() => {
        setTip('Stay hydrated and get enough sleep for better health!')
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ padding: '2rem 0', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        borderRadius: '12px',
        marginBottom: '3rem'
      }}>
        <h1 style={{ fontSize: '3rem', margin: 0, fontWeight: 'bold' }}>
          Welcome to AHC Hospital
        </h1>
        <p style={{ fontSize: '1.25rem', margin: '1rem 0 2rem' }}>
          Your trusted healthcare partner
        </p>
        <button style={{
          backgroundColor: 'white',
          color: '#667eea',
          padding: '1rem 2rem',
          border: 'none',
          borderRadius: '50px',
          fontSize: '1.1rem',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          Book Appointment
        </button>
      </section>

      {/* Daily Health Tip */}
      <section style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Daily Health Tip</h2>
        {loading ? (
          <p>Loading tip...</p>
        ) : (
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            maxWidth: '800px',
            margin: '0 auto',
            fontStyle: 'italic'
          }}>
            "{tip}"
          </div>
        )}
      </section>
    </div>
  )
}

export default Home

