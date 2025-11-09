import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Megaphone,
  BarChart3,
  UserCheck,
  Calendar,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  Zap,
  MessageCircle
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Projeler', href: '/projects', icon: FolderOpen },
  { name: 'Müşteriler', href: '/clients', icon: Users },
  { name: 'Kampanyalar', href: '/campaigns', icon: Megaphone },
  { name: 'Analitik', href: '/analytics', icon: BarChart3 },
  { name: 'Takım', href: '/team', icon: UserCheck, badge: 5 },
  { name: 'Takvim', href: '/calendar', icon: Calendar },
  { name: 'Ayarlar', href: '/settings', icon: Settings },
]

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out
        lg:relative lg:transform-none lg:transition-none
        glass border-r border-border/50
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-border/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Agency Manager
                </h1>
                <p className="text-xs text-textSecondary">Sosyal Medya & Reklam</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface/80 transition-colors"
            >
              <X className="w-5 h-5 text-textSecondary" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30'
                      : 'text-textSecondary hover:text-text hover:bg-surface/60'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 w-1 rounded-full bg-gradient-to-b from-primary to-secondary"
                      style={{ height: '60%' }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 bg-primary rounded-full"
                    />
                  )}
                </NavLink>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-border/30">
            <div className="flex items-center gap-3 p-3 rounded-xl glass">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">AK</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border border-background"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text truncate">Ahmet Kaya</p>
                <p className="text-sm text-textSecondary truncate">Creative Director</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="glass border-b border-border/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-surface/80 transition-colors"
              >
                <Menu className="w-5 h-5 text-textSecondary" />
              </button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-textSecondary" />
                <input
                  type="text"
                  placeholder="Projeler, müşteriler, kampanyalar ara..."
                  className="input-field pl-10 w-80 lg:w-96"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-surface/80 transition-colors">
                <MessageCircle className="w-5 h-5 text-textSecondary" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </span>
              </button>
              
              <button className="relative p-2 rounded-lg hover:bg-surface/80 transition-colors">
                <Bell className="w-5 h-5 text-textSecondary" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </span>
              </button>
              
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">AK</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
