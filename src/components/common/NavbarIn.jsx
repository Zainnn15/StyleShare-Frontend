import { Link } from 'react-router-dom';
import '../styles/navbarstlyes.css'
import { UserContext } from '../../../context/userContext';
import { useContext } from 'react';

export default function NavbarIn() {

  const { setUser } = useContext(UserContext);
  // logout function
  const handleLogout = async () => {
    try {
      // eslint-disable-next-line no-undef
      const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        method: 'GET',
        credentials: 'include', // Include credentials for cookies to be sent
      });
  
      if (response.ok) {
        // Clear any user state or context here
        setUser(null); // Assuming `setUser` can handle null to reset user context
  
        // Redirect to the home page by changing the window location
        window.location.href = '/';
      } else {
        throw new Error('Failed to log out');
      }
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
      <li><Link to='/usersearch'>Find a User</Link></li>
      <li><Link to='/garment-details'>Add a Garment</Link></li>
        
      <li><button onClick={handleLogout}>Log out</button></li>
    </ul>
  </nav>
  )
}