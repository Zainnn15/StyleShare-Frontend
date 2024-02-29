import { Link } from 'react-router-dom';
import '../styles/navbarstlyes.css'

export default function NavbarIn() {

  // logout function
  const handleLogout = async () => {
    try {
      // Make a request to your backend logout endpoint, e.g., using fetch or axios
      await fetch('http://localhost:8000/logout', {
        method: 'GET',
        credentials: 'include', // Include credentials for cookies to be sent
      });

      // Clear any local state or user information in your frontend
      // For example, if you're using context, reset the user context

      // Redirect to the home page by changing the window location
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav>
    <ul>
    <li><Link to='/dashboard'>Home</Link></li>
      <li><Link to='/userprofile'>Profile</Link></li>
      <li><Link to='/garment-measure'>Measure Garment</Link></li>
      <li><Link to='/garment-wash'>Wash Garment</Link></li>
      <li><button onClick={handleLogout}>Log out</button></li>
    </ul>
  </nav>
  )
}