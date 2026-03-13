import { useEffect, useMemo, useState } from 'react'
import io from 'socket.io-client'
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

function App() {
  const [incidents, setIncidents] = useState([])
  const [form, setForm] = useState({
    title: '',
    location: '',
    description: '',
    severity: 'Medium',
    lat: '',
    lng: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch(`${API_BASE}/api/incidents`)
      .then((res) => res.json())
      .then((data) => setIncidents(data))
      .catch(() => setIncidents([]))

    const socket = io(API_BASE)
    socket.on('incident:new', (incident) => {
      setIncidents((prev) => [incident, ...prev])
    })

    return () => socket.disconnect()
  }, [])

  const mapUrl = useMemo(() => {
    if (!form.location) return ''
    const q = encodeURIComponent(form.location)
    return `https://www.google.com/maps?q=${q}&output=embed`
  }, [form.location])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const resp = await fetch(`${API_BASE}/api/incidents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!resp.ok) {
        throw new Error('Failed')
      }
      const data = await resp.json()
      setIncidents((prev) => [data, ...prev])
      setForm({ title: '', location: '', description: '', severity: 'Medium', lat: '', lng: '' })
    } catch (err) {
      console.error(err)
      alert('Unable to report incident right now.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Accident & Traffic Intelligence</p>
          <h1>Real-time incident reporting and route safety intelligence</h1>
          <p className="hero-copy">
            Report road accidents, track live traffic incidents, and get route alerts with an
            admin analytics dashboard.
          </p>
          <div className="badges">
            <span>React</span>
            <span>Node</span>
            <span>Socket.io</span>
            <span>Google Maps</span>
          </div>
        </div>
      </header>

      <main className="layout">
        <section className="panel">
          <h2>1) Report Incident</h2>
          <form className="report-form" onSubmit={handleSubmit}>
            <label>Title <input name="title" value={form.title} onChange={handleChange} required /></label>
            <label>Location <input name="location" value={form.location} onChange={handleChange} required /></label>
            <label>Description <textarea name="description" value={form.description} onChange={handleChange} required /></label>
            <label>Severity
              <select name="severity" value={form.severity} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>
            <label>Latitude <input name="lat" type="number" value={form.lat} onChange={handleChange} placeholder="Optional" /></label>
            <label>Longitude <input name="lng" type="number" value={form.lng} onChange={handleChange} placeholder="Optional" /></label>
            <button type="submit" disabled={submitting}>{submitting ? 'Reporting...' : 'Report Incident'}</button>
          </form>
        </section>

        <section className="panel">
          <h2>2) Live Map</h2>
          {mapUrl ? (
            <iframe
              title="map"
              src={mapUrl}
              className="map"
              loading="lazy"
            />
          ) : (
            <div className="map-empty">Enter a location to preview in Google Maps</div>
          )}
        </section>
      </main>

      <section className="dashboard">
        <div className="dashboard-header">
          <div>
            <h2>Live incidents</h2>
            <p>Real-time updates via Socket.io and REST API</p>
          </div>
          <div className="route-box">
            <h3>Route advisor</h3>
            <p>Use Google Maps to avoid reported accidents.</p>
            <a href="https://www.google.com/maps/dir//" target="_blank" rel="noreferrer">Open Directions</a>
          </div>
        </div>

        <div className="incident-grid">
          {incidents.length === 0 ? <div className="empty">No incidents yet.</div> : incidents.map((item) => (
            <article className="incident-card" key={item.id}>
              <div className="top-row">
                <span className="severity">{item.severity}</span>
                <span>{new Date(item.time).toLocaleString()}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="meta">
                <span>{item.location}</span>
                <span>#{item.id}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
