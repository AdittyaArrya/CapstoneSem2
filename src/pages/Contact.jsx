import { useState } from 'react'
import { addAppointment } from '../utils/localStorage'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', date: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.date) newErrors.date = 'Date is required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    addAppointment(formData)
    setSuccess(true)
    setFormData({ name: '', phone: '', date: '' })
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Book Appointment</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
          {errors.name && <p style={{ color: 'red', fontSize: '0.875rem' }}>{errors.name}</p>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
          {errors.phone && <p style={{ color: 'red', fontSize: '0.875rem' }}>{errors.phone}</p>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
          {errors.date && <p style={{ color: 'red', fontSize: '0.875rem' }}>{errors.date}</p>}
        </div>
        <button type="submit" style={{ 
          backgroundColor: '#28a745', 
          color: 'white', 
          padding: '0.75rem 1.5rem', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer' 
        }}>
          Book Appointment
        </button>
      </form>
      {success && <p style={{ color: 'green', marginTop: '1rem' }}>Appointment booked successfully!</p>}
    </div>
  )
}

export default Contact

