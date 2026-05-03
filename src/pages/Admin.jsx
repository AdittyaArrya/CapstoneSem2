import { useState, useEffect } from 'react'
import { getAppointments, updateAppointment, deleteAppointment } from '../utils/localStorage'

const Admin = () => {
  const [appointments, setAppointments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setAppointments(getAppointments())
  }, [])

  const refreshAppointments = () => {
    setAppointments(getAppointments())
  }

  const filteredAppointments = appointments.filter(apt =>
    apt.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleConfirm = (id) => {
    updateAppointment(id, { status: 'confirmed' })
    refreshAppointments()
  }

  const handleCancel = (id) => {
    updateAppointment(id, { status: 'cancelled' })
    refreshAppointments()
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      deleteAppointment(id)
      refreshAppointments()
    }
  }

  const statusStyle = (status) => {
    const colors = {
      pending: { bg: '#ff9800', color: 'white' },
      confirmed: { bg: '#4caf50', color: 'white' },
      cancelled: { bg: '#f44336', color: 'white' }
    }
    return colors[status] || colors.pending
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Admin Dashboard</h1>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#4caf50' }}>
          Total: {appointments.length}
        </div>
      </div>
      
      {/* Search Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '0.75rem 1rem',
            border: '2px solid #ddd',
            borderRadius: '8px',
            fontSize: '1rem'
          }}
        />
      </div>

      {filteredAppointments.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h3>No appointments found</h3>
          <p>{searchTerm ? 'Try different search term' : 'Book first appointment from Contact page'}</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {filteredAppointments.map((apt) => (
            <div key={apt.id} style={{ 
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              borderLeft: `5px solid ${statusStyle(apt.status).bg}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.3rem' }}>{apt.name}</h3>
                <span style={{
                  ...statusStyle(apt.status),
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  {apt.status.toUpperCase()}
                </span>
              </div>
              <p style={{ margin: '0.5rem 0', color: '#666' }}><strong>Phone:</strong> {apt.phone}</p>
              <p style={{ margin: '0.5rem 0', color: '#666' }}><strong>Date:</strong> {apt.date}</p>
              <div style={{ marginTop: '1rem' }}>
                <button onClick={() => handleConfirm(apt.id)} style={{ 
                  backgroundColor: '#4caf50', color: 'white', border: 'none', 
                  padding: '0.5rem 1rem', marginRight: '0.5rem', borderRadius: '6px',
                  cursor: 'pointer', fontWeight: '500'
                }}>
                  Confirm
                </button>
                <button onClick={() => handleCancel(apt.id)} style={{ 
                  backgroundColor: '#ff9800', color: 'white', border: 'none', 
                  padding: '0.5rem 1rem', marginRight: '0.5rem', borderRadius: '6px',
                  cursor: 'pointer', fontWeight: '500'
                }}>
                  Cancel
                </button>
                <button onClick={() => handleDelete(apt.id)} style={{ 
                  backgroundColor: '#f44336', color: 'white', border: 'none', 
                  padding: '0.5rem 1rem', borderRadius: '6px',
                  cursor: 'pointer', fontWeight: '500'
                }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Admin

