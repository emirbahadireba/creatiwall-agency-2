import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Clients from './pages/Clients'
import Campaigns from './pages/Campaigns'
import Analytics from './pages/Analytics'
import Team from './pages/Team'
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/team" element={<Team />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'glass text-text',
            duration: 4000,
          }}
        />
      </Router>
    </QueryClientProvider>
  )
}

export default App
