import { useState, useEffect } from 'react'

export default function BroadcastForm() {
  const [message, setMessage] = useState("")
  const [allMessages, setAllMessages] = useState([])

  useEffect(() => {
    fetch('/admin/broadcasts', {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then((r) => r.json())
      .then(setAllMessages)
  }, [])

  function submitBroadcast(e) {
    e.preventDefault()
    fetch('/admin/broadcasts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({ message })
    })
      .then((r) => r.json())
      .then((msg) => {
        setAllMessages(prev => [{ message: msg, created_at: new Date().toISOString() }, ...prev])
        setMessage("")
      })
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Send Broadcast Message</h2>
      <form onSubmit={submitBroadcast} className="my-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter message..."
          rows={3}
        />
        <button className="btn btn-primary mt-2">Send</button>
      </form>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Past Messages</h3>
        <ul>
          {allMessages.map((m, i) => (
            <li key={i} className="border-b py-2">
              <strong>{new Date(m.created_at).toLocaleString()}:</strong><br />
              {m.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
