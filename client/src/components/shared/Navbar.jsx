import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-6">
      <Link to="/">Home</Link>
      <Link to="/search">Browse</Link>
      <Link to="/agent">Agent</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/login">Login</Link>
    </nav>
  )
}