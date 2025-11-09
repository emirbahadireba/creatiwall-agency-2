import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar as CalendarIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  MapPin,
  Filter,
  Search,
  Video,
  Coffee,
  Presentation,
  Phone
} from 'lucide-react'

const events = [
  {
    id: 1,
    title: 'Nike Kampanyası Sunum',
    type: 'meeting',
    date: '2025-01-15',
    time: '10:00',
    duration: '1 saat',
    location: 'Toplantı Odası A',
    attendees: ['Ahmet Kaya', 'Elif Yılmaz', 'Mehmet Özkan'],
    description: 'Nike yaz koleksiyonu kampanyası final sunumu'
  },
  {
    id: 2,
    title: 'Starbucks İçerik Çekimi',
    type: 'content',
    date: '2025-01-16',
    time: '14:00',
    duration: '3 saat',
    location: 'Starbucks Nişantaşı',
    attendees: ['Kerem Şahin', 'Leyla Tekin'],
    description: 'Yeni kahve çeşitleri için fotoğraf ve video çekimi'
  },
  {
    id: 3,
    title: 'Samsung Stratejik Planlama',
    type: 'planning',
    date: '2025-01-17',
    time: '09:30',
    duration: '2 saat',
    location: 'Online - Zoom',
    attendees: ['Ahmet Kaya', 'Mehmet Özkan', 'Elif Yılmaz', 'Leyla Tekin'],
    description: 'Galaxy S25 lansmanı için stratejik planlama toplantısı'
  },
  {
    id: 4,
    title: 'Takım Kahvaltısı',
    type: 'team',
    date: '2025-01-18',
    time: '08:30',
    duration: '1 saat',
    location: 'Ofis Mutfak',
    attendees: ['Tüm Takım'],
    description: 'Haftalık takım motivasyon kahvaltısı'
  },
  {
    id: 5,
    title: 'Müşteri Görüşmesi - Coca Cola',
    type: 'call',
    date: '2025-01-19',
    time: '15:00',
    duration: '45 dakika',
    location: 'Online - Teams',
    attendees: ['Ahmet Kaya', 'Leyla Tekin'],
    description: 'Ramazan kampanyası için ilk görüşme'
  }
]

const eventTypes = {
  meeting: { label: 'Toplantı', color: 'bg-primary/20 text-primary', icon: Presentation },
  content: { label: 'İçerik', color: 'bg-secondary/20 text-secondary', icon: Video },
  planning: { label: 'Planlama', color: 'bg-accent/20 text-accent', icon: CalendarIcon },
  team: { label: 'Takım', color: 'bg-success/20 text-success', icon: Coffee },
  call: { label: 'Görüşme', color: 'bg-warning/20 text-warning', icon: Phone }
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState('month')
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return events.filter(event => event.date === dateStr)
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || event.type === typeFilter
    return matchesSearch && matchesType
  })

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ]

  const dayNames = ['Pzr', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Takvim
          </h1>
          <p className="text-textSecondary mt-1">Proje takvimi ve etkinlik yönetimi</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Etkinlik
        </button>
      </div>

      {/* Calendar Controls */}
      <div className="flex items-center justify-between p-4 glass rounded-xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-lg hover:bg-surface/80 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-xl font-semibold text-text min-w-[200px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-lg hover:bg-surface/80 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-2">
            {['month', 'week', 'day'].map(viewType => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  view === viewType
                    ? 'bg-primary text-white'
                    : 'text-textSecondary hover:text-text hover:bg-surface'
                }`}
              >
                {viewType === 'month' ? 'Ay' : viewType === 'week' ? 'Hafta' : 'Gün'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-textSecondary" />
            <input
              type="text"
              placeholder="Etkinlik ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-64"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">Tüm Türler</option>
            {Object.entries(eventTypes).map(([key, type]) => (
              <option key={key} value={key}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 card"
        >
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map(day => (
              <div key={day} className="p-3 text-center text-textSecondary font-medium text-sm">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentDate).map((day, index) => {
              if (!day) {
                return <div key={index} className="p-2 h-24"></div>
              }
              
              const dayEvents = getEventsForDate(day)
              const isToday = day.toDateString() === new Date().toDateString()
              const isSelected = day.toDateString() === selectedDate.toDateString()
              
              return (
                <motion.div
                  key={day.getDate()}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    p-2 h-24 border rounded-lg cursor-pointer transition-all duration-200
                    ${isToday ? 'bg-primary/20 border-primary' : 'border-border/30 hover:border-primary/50'}
                    ${isSelected ? 'bg-secondary/20 border-secondary' : ''}
                  `}
                >
                  <div className={`
                    text-sm font-medium mb-1
                    ${isToday ? 'text-primary' : isSelected ? 'text-secondary' : 'text-text'}
                  `}>
                    {day.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        className={`text-xs px-1 py-0.5 rounded truncate ${eventTypes[event.type].color}`}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-textSecondary">
                        +{dayEvents.length - 2} daha
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Events List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-text mb-4">
            Yaklaşan Etkinlikler
          </h3>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredEvents.map(event => {
              const EventIcon = eventTypes[event.type].icon
              return (
                <motion.div
                  key={event.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-surface/50 rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${eventTypes[event.type].color}`}>
                      <EventIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-text truncate">{event.title}</h4>
                      <div className="flex items-center gap-2 mt-1 text-textSecondary text-sm">
                        <Clock className="w-3 h-3" />
                        <span>{event.time} ({event.duration})</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-textSecondary text-sm">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      {event.attendees && (
                        <div className="flex items-center gap-2 mt-2">
                          <Users className="w-3 h-3 text-textSecondary" />
                          <div className="flex -space-x-1">
                            {event.attendees.slice(0, 3).map((attendee, index) => (
                              <div
                                key={index}
                                className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-background"
                                title={attendee}
                              >
                                {attendee.split(' ').map(n => n[0]).join('')}
                              </div>
                            ))}
                            {event.attendees.length > 3 && (
                              <div className="w-6 h-6 bg-textSecondary rounded-full flex items-center justify-center text-white text-xs border-2 border-background">
                                +{event.attendees.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
