// localStorage utils for appointments
const APPOINTMENTS_KEY = 'ahc_appointments'

export const getAppointments = () => {
  const data = localStorage.getItem(APPOINTMENTS_KEY)
  return data ? JSON.parse(data) : []
}

export const addAppointment = (appointment) => {
  const appointments = getAppointments()
  const newId = Date.now().toString()
  const newAppointment = { ...appointment, id: newId, status: 'pending' }
  appointments.push(newAppointment)
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments))
  return newAppointment
}

export const updateAppointment = (id, updates) => {
  const appointments = getAppointments()
  const index = appointments.findIndex(apt => apt.id === id)
  if (index !== -1) {
    appointments[index] = { ...appointments[index], ...updates }
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments))
    return appointments[index]
  }
  return null
}

export const deleteAppointment = (id) => {
  const appointments = getAppointments()
  const filtered = appointments.filter(apt => apt.id !== id)
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(filtered))
  return filtered
}

