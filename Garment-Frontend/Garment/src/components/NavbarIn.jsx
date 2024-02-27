import { Link } from 'react-router-dom';

export default function NavbarIn() {
  return (
    <nav>
    <ul>
    <li><Link to='/dashboard'>Home</Link></li>
      <li><Link to='/userprofile'>Profile</Link></li>
      <li><Link to='/garment-measure'>Measure Garment</Link></li>
      <li><Link to='/garment-wash'>Wash Garment</Link></li>
      <li><Link to='/'>Log out</Link></li>
    </ul>
  </nav>
  )
}