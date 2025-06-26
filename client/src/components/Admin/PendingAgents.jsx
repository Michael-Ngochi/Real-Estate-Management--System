import { useEffect, useState } from 'react'

export default function PendingAgents() {
  const [agents, setAgents] = useState([])

  useEffect(() => {
    fetch('/admin/agents/pending', {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then((res) => res.json())
      .then(setAgents)
  }, [])

  const approve = (id) => {
    fetch(`/admin/agents/${id}/approve`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${localStorage.token}` },
    }).then(() => setAgents((prev) => prev.filter((a) => a.id !== id)))
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Pending Agents</h2>
      {agents.length === 0 ? (
        <p>No pending agents.</p>
      ) : (
        <ul>
          {agents.map((a) => (
            <li key={a.id} className="my-2">
              {a.username} ({a.email})
              <button className="btn btn-sm ml-4" onClick={() => approve(a.id)}>
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
