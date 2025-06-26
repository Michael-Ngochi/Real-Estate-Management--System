import { useEffect, useState } from 'react'

export default function PropertySearch() {
  const [properties, setProperties] = useState([])
  const [filters, setFilters] = useState({ location: '', type: '', priceMax: '' })

  useEffect(() => {
    const query = new URLSearchParams(
      Object.entries(filters).filter(entry => entry[1] !== '')
    ).toString()

    fetch(`/properties?${query}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch properties')
        return res.json()
      })
      .then(setProperties)
      .catch((err) => console.error(err))
  }, [filters])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search Properties</h2>
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Location"
          className="input"
          value={filters.location}
          onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
        />
        <select
          className="input"
          value={filters.type}
          onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
        >
          <option value="">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
        </select>
        <input
          type="number"
          placeholder="Max Price"
          className="input"
          value={filters.priceMax}
          onChange={e => setFilters(f => ({ ...f, priceMax: e.target.value }))}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {properties.map((p) => (
          <div key={p.id} className="border p-2 rounded shadow">
            <h3 className="font-semibold">{p.title}</h3>
            <p>{p.location} • {p.type}</p>
            <p className="text-green-700 font-bold">${Number(p.price).toLocaleString()}</p>
            <p>Status: {p.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
