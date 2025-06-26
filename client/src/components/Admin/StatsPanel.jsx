import { useEffect, useState } from 'react'

export default function StatsPanel() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch('/admin/stats', {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then((res) => res.json())
      .then(setStats)
  }, [])

  if (!stats) return <p>Loading stats...</p>

  return (
    <div>
      <h2 className="text-xl font-semibold">Platform Stats</h2>
      <ul className="mt-2">
        <li>Users: {stats.total_users}</li>
        <li>Agents: {stats.total_agents}</li>
        <li>Pending Agents: {stats.pending_agents}</li>
        <li>Properties: {stats.total_properties}</li>
        <li>Inquiries: {stats.total_inquiries}</li>
      </ul>
    </div>
  )
}
