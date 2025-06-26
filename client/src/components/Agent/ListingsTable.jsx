import { useEffect, useState } from 'react'
import { apiFetch } from '../../utils/api'

export default function ListingsTable() {
  const [listings, setListings] = useState([])

  useEffect(() => {
    apiFetch('/api/listings')
      .then(data => setListings(data))
      .catch(() => console.error('Failed to load listings'))
  }, [])

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Type</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {listings.map(listing => (
            <tr key={listing.id} className="text-center">
              <td className="border px-4 py-2">{listing.title}</td>
              <td className="border px-4 py-2">{listing.location}</td>
              <td className="border px-4 py-2">{listing.type}</td>
              <td className="border px-4 py-2">${Number(listing.price).toLocaleString()}</td>
              <td className="border px-4 py-2">{listing.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
