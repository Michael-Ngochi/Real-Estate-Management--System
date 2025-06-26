import PendingAgents from './PendingAgents'
import StatsPanel from './StatsPanel'
import BroadcastForm from './BroadcastForm'

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <StatsPanel />
      <hr className="my-4" />
      <PendingAgents />
      <hr className="my-4" />
      <BroadcastForm />
    </div>
  )
}