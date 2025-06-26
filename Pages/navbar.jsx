import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <h1>NyumbaSmart</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/agent">Agent Dashboard</Link></li>
        <li><Link to="/admin">Admin Dashboard</Link></li>
      </ul>
    </nav>
  );
}
