import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  return (
    <nav>
      <div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2>AHC Hospital</h2>
        </Link>
        <ul>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={location.pathname === '/contact' ? 'active' : ''}
            >
              Book Appointment
            </Link>
          </li>
          <li>
            <Link 
              to="/admin" 
              className={location.pathname === '/admin' ? 'active' : ''}
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

