import React from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Briefcase,
  CheckSquare,
  Users,
  Calendar,
  BarChart3,
  Zap,
  MessageSquare,
  Settings,
  UserCheck,
  ListTodo,
  X,
  Sparkles,
  Target,
  Palette,
  Smartphone,
  DollarSign
} from 'lucide-react'
import { useStore } from '../store/useStore'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { currentView, setCurrentView, notifications } = useStore()
  
  const unreadCount = notifications.filter(n => !n.read).length

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      notifications: 0
    },
    {
      id: 'campaigns',
      label: 'Kampanyalar',
      icon: Briefcase,
      notifications: 0
    },
    {
      id: 'tasks',
      label: 'Görevler',
      icon: CheckSquare,
      notifications: 3
    },
    {
      id: 'clients',
      label: 'Müşteriler',
      icon: Users,
      notifications: 0
    },
    {
      id: 'calendar',
      label: 'İçerik Takvimi',
      icon: Calendar,
      notifications: 0
    },
    {
      id: 'analytics',
      label: 'Analitik',
      icon: BarChart3,
      notifications: 0
    }
  ]

  const advancedFeatures = [
    {
      id: 'ai-content',
      label: 'AI İçerik Üretici',
      icon: Sparkles,
      notifications: 0,
      badge: 'YENİ'
    },
    {
      id: 'competitor-analysis',
      label: 'Rakip Analizi',
      icon: Target,
      notifications: 0,
      badge: 'YENİ'
    },
    {
      id: 'design-editor',
      label: 'Tasarım Editörü',
      icon: Palette,
      notifications: 0,
      badge: 'YENİ'
    },
    {
      id: 'automation',
      label: 'Otomasyon',
      icon: Zap,
      notifications: 0
    },
    {
      id: 'mobile-features',
      label: 'Mobil Özellikler',
      icon: Smartphone,
      notifications: 0,
      badge: 'YENİ'
    },
    {
      id: 'revenue-tracking',
      label: 'Gelir Takibi',
      icon: DollarSign,
      notifications: 0,
      badge: 'YENİ'
    }
  ]

  const bottomMenuItems = [
    {
      id: 'messaging',
      label: 'Mesajlar',
      icon: MessageSquare,
      notifications: unreadCount
    },
    {
      id: 'teams',
      label: 'Ekip',
      icon: UserCheck,
      notifications: 0
    },
    {
      id: 'personal-tasks',
      label: 'Kişisel Görevler',
      icon: ListTodo,
      notifications: 2
    },
    {
      id: 'settings',
      label: 'Ayarlar',
      icon: Settings,
      notifications: 0
    }
  ]

  const handleMenuClick = (itemId: string) => {
    setCurrentView(itemId)
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      onToggle()
    }
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && window.innerWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -320,
          opacity: isOpen ? 1 : 0 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen w-80 bg-surface border-r border-border z-50 lg:relative lg:translate-x-0 lg:opacity-100 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">CH</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CreativeHub</h1>
                <p className="text-xs text-textSecondary">Pro Edition</p>
              </div>
            </div>
            
            <button
              onClick={onToggle}
              className="p-2 rounded-lg text-textSecondary hover:text-white hover:bg-background/50 transition-all lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          {/* Main Menu */}
          <div>
            <h2 className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-4 px-3">
              Ana Menü
            </h2>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = currentView === item.id
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    whileHover={{ x: 4 }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-textSecondary hover:text-white hover:bg-background/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    
                    {item.notifications > 0 && (
                      <span className="bg-error text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                        {item.notifications}
                      </span>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Advanced Features */}
          <div>
            <h2 className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-4 px-3">
              Gelişmiş Özellikler
            </h2>
            <div className="space-y-1">
              {advancedFeatures.map((item) => {
                const Icon = item.icon
                const isActive = currentView === item.id
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    whileHover={{ x: 4 }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-textSecondary hover:text-white hover:bg-background/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <span className="bg-gradient-to-r from-accent to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                      {item.notifications > 0 && (
                        <span className="bg-error text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                          {item.notifications}
                        </span>
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Bottom Menu */}
          <div>
            <h2 className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-4 px-3">
              Diğer
            </h2>
            <div className="space-y-1">
              {bottomMenuItems.map((item) => {
                const Icon = item.icon
                const isActive = currentView === item.id
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    whileHover={{ x: 4 }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-textSecondary hover:text-white hover:bg-background/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    
                    {item.notifications > 0 && (
                      <span className="bg-error text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                        {item.notifications}
                      </span>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-white font-semibold">Pro Sürüm</span>
            </div>
            <p className="text-textSecondary text-sm mb-3">Tüm gelişmiş özelliklere erişim
            </p>
            <div className="w-full bg-background/50 rounded-full h-2 mb-2">
              <div className="w-full bg-gradient-to-r from-primary to-secondary rounded-full h-2"></div>
            </div>
            <div className="text-xs text-textSecondary">Sınırsız kullanım</div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
