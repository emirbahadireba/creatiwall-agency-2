import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  MessageCircle,
  Phone,
  Video,
  Mail,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Award,
  TrendingUp,
  Settings,
  Edit,
  Trash2,
  UserPlus,
  Send,
  Paperclip,
  Smile,
  MoreHorizontal,
  Bell,
  BellOff,
  Pin,
  Archive,
  Flag,
  Download,
  Eye,
  EyeOff
} from 'lucide-react'

const teamMembers = [
  {
    id: 1,
    name: 'Ahmet Kaya',
    role: 'Creative Director',
    avatar: 'AK',
    email: 'ahmet@agency.com',
    phone: '+90 532 555 0101',
    status: 'online',
    department: 'Creative',
    experience: '8 yıl',
    joinDate: '2022-01-15',
    activeProjects: 5,
    completedTasks: 142,
    rating: 4.9,
    skills: ['Brand Strategy', 'Creative Direction', 'Team Management', 'Campaign Planning'],
    lastSeen: 'Şimdi aktif',
    isTyping: false,
    unreadMessages: 0
  },
  {
    id: 2,
    name: 'Mehmet Özkan',
    role: 'Social Media Specialist',
    avatar: 'MZ',
    email: 'mehmet@agency.com',
    phone: '+90 532 555 0202',
    status: 'away',
    department: 'Social Media',
    experience: '5 yıl',
    joinDate: '2022-03-20',
    activeProjects: 8,
    completedTasks: 198,
    rating: 4.7,
    skills: ['Instagram Management', 'Content Creation', 'Analytics', 'Community Management'],
    lastSeen: '15 dakika önce',
    isTyping: false,
    unreadMessages: 3
  },
  {
    id: 3,
    name: 'Elif Yılmaz',
    role: 'Graphic Designer',
    avatar: 'EY',
    email: 'elif@agency.com',
    phone: '+90 532 555 0303',
    status: 'busy',
    department: 'Design',
    experience: '4 yıl',
    joinDate: '2022-06-10',
    activeProjects: 6,
    completedTasks: 156,
    rating: 4.8,
    skills: ['Adobe Creative Suite', 'UI/UX Design', 'Brand Identity', 'Motion Graphics'],
    lastSeen: '1 saat önce',
    isTyping: true,
    unreadMessages: 1
  },
  {
    id: 4,
    name: 'Leyla Tekin',
    role: 'Content Manager',
    avatar: 'LT',
    email: 'leyla@agency.com',
    phone: '+90 532 555 0404',
    status: 'offline',
    department: 'Content',
    experience: '6 yıl',
    joinDate: '2021-11-05',
    activeProjects: 4,
    completedTasks: 187,
    rating: 4.9,
    skills: ['Copywriting', 'Content Strategy', 'SEO', 'Editorial Planning'],
    lastSeen: '2 gün önce',
    isTyping: false,
    unreadMessages: 0
  },
  {
    id: 5,
    name: 'Kerem Şahin',
    role: 'Video Editor',
    avatar: 'KS',
    email: 'kerem@agency.com',
    phone: '+90 532 555 0505',
    status: 'online',
    department: 'Video',
    experience: '3 yıl',
    joinDate: '2023-02-14',
    activeProjects: 3,
    completedTasks: 89,
    rating: 4.6,
    skills: ['Video Editing', 'Motion Graphics', 'After Effects', 'Color Grading'],
    lastSeen: 'Şimdi aktif',
    isTyping: false,
    unreadMessages: 2
  }
]

const statusConfig = {
  online: { color: 'bg-success', label: 'Çevrimiçi' },
  away: { color: 'bg-warning', label: 'Uzakta' },
  busy: { color: 'bg-error', label: 'Meşgul' },
  offline: { color: 'bg-textSecondary', label: 'Çevrimdışı' }
}

const conversations = [
  {
    id: 1,
    participantId: 2,
    lastMessage: 'Nike projesi için yeni görseller hazır, kontrol edebilir misin?',
    timestamp: '14:30',
    unread: 3,
    pinned: true
  },
  {
    id: 2,
    participantId: 3,
    lastMessage: 'Starbucks kampanyası için video düzenlemesi tamamlandı',
    timestamp: '13:45',
    unread: 1,
    pinned: false
  },
  {
    id: 3,
    participantId: 5,
    lastMessage: 'Toplantı notlarını paylaştım, inceleyebilirsin',
    timestamp: '12:20',
    unread: 2,
    pinned: false
  }
]

const tasks = [
  {
    id: 1,
    title: 'Nike Yaz Kampanyası - Görsel Tasarımı',
    description: 'Yaz koleksiyonu için Instagram post görselleri hazırlanacak',
    assignedTo: 3,
    assignedBy: 1,
    project: 'Nike Yaz Kampanyası',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2025-01-15',
    createdAt: '2025-01-10',
    tags: ['Design', 'Instagram', 'Urgent'],
    attachments: ['brief.pdf', 'references.zip'],
    comments: 2
  },
  {
    id: 2,
    title: 'Starbucks - İçerik Takvimi Hazırlama',
    description: 'Ocak ayı için sosyal medya içerik takvimi oluşturulacak',
    assignedTo: 4,
    assignedBy: 1,
    project: 'Starbucks Sosyal Medya',
    priority: 'medium',
    status: 'todo',
    dueDate: '2025-01-12',
    createdAt: '2025-01-08',
    tags: ['Content', 'Planning'],
    attachments: ['template.xlsx'],
    comments: 0
  },
  {
    id: 3,
    title: 'Samsung - Video Düzenlemesi',
    description: 'Galaxy S25 tanıtım videosu düzenlenecek',
    assignedTo: 5,
    assignedBy: 1,
    project: 'Samsung Galaxy Launch',
    priority: 'high',
    status: 'completed',
    dueDate: '2025-01-08',
    createdAt: '2025-01-05',
    tags: ['Video', 'Product Launch'],
    attachments: ['raw_footage.mov', 'audio.mp3'],
    comments: 5
  }
]

const priorityConfig = {
  low: { color: 'bg-success/20 text-success', label: 'Düşük' },
  medium: { color: 'bg-warning/20 text-warning', label: 'Orta' },
  high: { color: 'bg-error/20 text-error', label: 'Yüksek' }
}

const taskStatusConfig = {
  'todo': { color: 'bg-textSecondary/20 text-textSecondary', label: 'Yapılacak' },
  'in-progress': { color: 'bg-primary/20 text-primary', label: 'Devam Ediyor' },
  'review': { color: 'bg-warning/20 text-warning', label: 'İnceleme' },
  'completed': { color: 'bg-success/20 text-success', label: 'Tamamlandı' }
}

export default function Team() {
  const [activeView, setActiveView] = useState('team') // team, messages, tasks
  const [selectedMember, setSelectedMember] = useState(null)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messageText, setMessageText] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showMemberModal, setShowMemberModal] = useState(false)
  const [taskFilter, setTaskFilter] = useState('all')

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredTasks = tasks.filter(task => {
    if (taskFilter === 'all') return true
    if (taskFilter === 'my-tasks') return task.assignedTo === 1 // Current user
    if (taskFilter === 'assigned-by-me') return task.assignedBy === 1
    return task.status === taskFilter
  })

  const handleSendMessage = () => {
    if (messageText.trim() && selectedConversation) {
      console.log('Mesaj gönderiliyor:', {
        to: selectedConversation,
        message: messageText,
        timestamp: new Date().toISOString()
      })
      setMessageText('')
    }
  }

  const handleAssignTask = (taskData) => {
    console.log('Görev atanıyor:', taskData)
    setShowTaskModal(false)
  }

  const handleMemberAction = (action, member) => {
    switch (action) {
      case 'message':
        setActiveView('messages')
        setSelectedConversation(member.id)
        break
      case 'call':
        console.log('Arama başlatılıyor:', member.name)
        break
      case 'video':
        console.log('Video görüşmesi başlatılıyor:', member.name)
        break
      case 'email':
        window.open(`mailto:${member.email}`)
        break
      case 'assign-task':
        setSelectedMember(member)
        setShowTaskModal(true)
        break
      case 'view-profile':
        setSelectedMember(member)
        break
      case 'edit':
        console.log('Üye düzenleniyor:', member.name)
        break
      case 'deactivate':
        if (confirm(`${member.name} üyesini deaktive etmek istediğinizden emin misiniz?`)) {
          console.log('Üye deaktive ediliyor:', member.name)
        }
        break
    }
  }

  const getTotalUnreadMessages = () => {
    return teamMembers.reduce((total, member) => total + member.unreadMessages, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Takım Yönetimi
          </h1>
          <p className="text-textSecondary mt-1">Takım üyelerinizle mesajlaşın ve görev atayın</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowMemberModal(true)}
            className="btn-secondary"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Üye Ekle
          </button>
          <button 
            onClick={() => setShowTaskModal(true)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Görev Ata
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-1 p-1 bg-surface/50 rounded-lg w-fit">
        <button
          onClick={() => setActiveView('team')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeView === 'team'
              ? 'bg-primary text-white shadow-lg'
              : 'text-textSecondary hover:text-text hover:bg-surface/80'
          }`}
        >
          <Users className="w-4 h-4 mr-2 inline" />
          Takım ({teamMembers.length})
        </button>
        <button
          onClick={() => setActiveView('messages')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative ${
            activeView === 'messages'
              ? 'bg-primary text-white shadow-lg'
              : 'text-textSecondary hover:text-text hover:bg-surface/80'
          }`}
        >
          <MessageCircle className="w-4 h-4 mr-2 inline" />
          Mesajlar
          {getTotalUnreadMessages() > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
              {getTotalUnreadMessages()}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveView('tasks')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeView === 'tasks'
              ? 'bg-primary text-white shadow-lg'
              : 'text-textSecondary hover:text-text hover:bg-surface/80'
          }`}
        >
          <CheckCircle className="w-4 h-4 mr-2 inline" />
          Görevler ({tasks.length})
        </button>
      </div>

      {/* Team View */}
      {activeView === 'team' && (
        <div className="space-y-6">
          {/* Team Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card py-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-text">{teamMembers.length}</p>
                <p className="text-textSecondary text-sm">Toplam Üye</p>
              </div>
            </div>
            <div className="card py-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{teamMembers.filter(m => m.status === 'online').length}</p>
                <p className="text-textSecondary text-sm">Çevrimiçi</p>
              </div>
            </div>
            <div className="card py-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{teamMembers.reduce((sum, m) => sum + m.activeProjects, 0)}</p>
                <p className="text-textSecondary text-sm">Aktif Proje</p>
              </div>
            </div>
            <div className="card py-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {(teamMembers.reduce((sum, m) => sum + m.rating, 0) / teamMembers.length).toFixed(1)}
                </p>
                <p className="text-textSecondary text-sm">Ort. Puan</p>
              </div>
            </div>
          </div>

          {/* Team Filters */}
          <div className="flex items-center gap-4 p-4 glass rounded-xl">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-textSecondary" />
              <input
                type="text"
                placeholder="Üye ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="online">Çevrimiçi</option>
              <option value="away">Uzakta</option>
              <option value="busy">Meşgul</option>
              <option value="offline">Çevrimdışı</option>
            </select>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:scale-105 group relative"
              >
                {/* Member Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${statusConfig[member.status].color} rounded-full border-2 border-background`}></div>
                    {member.isTyping && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-text">{member.name}</h3>
                      {member.unreadMessages > 0 && (
                        <span className="w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
                          {member.unreadMessages}
                        </span>
                      )}
                    </div>
                    <p className="text-textSecondary text-sm">{member.role}</p>
                    <p className="text-textSecondary text-xs">{member.department}</p>
                    <p className="text-textSecondary text-xs mt-1">{member.lastSeen}</p>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleMemberAction('message', member)}
                      className="p-1.5 rounded-lg hover:bg-primary/20 text-primary transition-colors"
                      title="Mesaj Gönder"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMemberAction('call', member)}
                      className="p-1.5 rounded-lg hover:bg-success/20 text-success transition-colors"
                      title="Ara"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMemberAction('video', member)}
                      className="p-1.5 rounded-lg hover:bg-secondary/20 text-secondary transition-colors"
                      title="Video Görüşme"
                    >
                      <Video className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Status & Info */}
                <div className="flex items-center gap-4 text-sm mb-4 p-3 bg-surface/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 ${statusConfig[member.status].color} rounded-full`}></div>
                    <span className="text-textSecondary">{statusConfig[member.status].label}</span>
                  </div>
                  <div className="text-textSecondary">
                    <span>{member.experience} deneyim</span>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{member.activeProjects}</p>
                    <p className="text-textSecondary text-xs">Aktif Proje</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-success">{member.completedTasks}</p>
                    <p className="text-textSecondary text-xs">Tamamlanan</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <p className="text-lg font-bold text-warning">{member.rating}</p>
                      <Star className="w-4 h-4 text-warning fill-current" />
                    </div>
                    <p className="text-textSecondary text-xs">Puan</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-textSecondary text-sm mb-2">Yetenekler</p>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="px-2 py-1 bg-surface/80 text-textSecondary text-xs rounded-lg">
                        +{member.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Contact & Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMemberAction('message', member)}
                      className="btn-primary text-sm"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Mesaj
                    </button>
                    <button
                      onClick={() => handleMemberAction('assign-task', member)}
                      className="btn-secondary text-sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Görev Ver
                    </button>
                  </div>
                  
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleMemberAction('email', member)}
                      className="p-2 rounded-lg hover:bg-surface/80 text-textSecondary hover:text-text transition-colors"
                      title="E-posta Gönder"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMemberAction('view-profile', member)}
                      className="p-2 rounded-lg hover:bg-surface/80 text-textSecondary hover:text-text transition-colors"
                      title="Profil Görüntüle"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMemberAction('edit', member)}
                      className="p-2 rounded-lg hover:bg-surface/80 text-textSecondary hover:text-text transition-colors"
                      title="Düzenle"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Messages View */}
      {activeView === 'messages' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <div className="card p-0 overflow-hidden">
            <div className="p-4 border-b border-border/30">
              <h3 className="font-semibold text-text">Mesajlar</h3>
            </div>
            <div className="overflow-y-auto h-full">
              {conversations.map((conv) => {
                const member = teamMembers.find(m => m.id === conv.participantId)
                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.participantId)}
                    className={`w-full p-4 text-left hover:bg-surface/50 transition-colors border-b border-border/20 ${
                      selectedConversation === conv.participantId ? 'bg-primary/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                          {member?.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusConfig[member?.status || 'offline'].color} rounded-full border-2 border-background`}></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-text">{member?.name}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-textSecondary text-xs">{conv.timestamp}</span>
                            {conv.pinned && <Pin className="w-3 h-3 text-warning" />}
                          </div>
                        </div>
                        <p className="text-textSecondary text-sm truncate">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <span className="inline-block w-5 h-5 bg-primary text-white text-xs rounded-full text-center leading-5 mt-1">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 card p-0 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const member = teamMembers.find(m => m.id === selectedConversation)
                      return (
                        <>
                          <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                              {member?.avatar}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${statusConfig[member?.status || 'offline'].color} rounded-full border border-background`}></div>
                          </div>
                          <div>
                            <p className="font-medium text-text">{member?.name}</p>
                            <p className="text-textSecondary text-sm">{member?.role}</p>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMemberAction('call', teamMembers.find(m => m.id === selectedConversation))}
                      className="p-2 rounded-lg hover:bg-surface/80 text-success transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMemberAction('video', teamMembers.find(m => m.id === selectedConversation))}
                      className="p-2 rounded-lg hover:bg-surface/80 text-primary transition-colors"
                    >
                      <Video className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-surface/80 text-textSecondary transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {/* Sample messages */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      MZ
                    </div>
                    <div className="flex-1">
                      <div className="bg-surface/50 p-3 rounded-lg rounded-tl-none">
                        <p className="text-text">Nike projesi için yeni görseller hazır, kontrol edebilir misin?</p>
                        <p className="text-textSecondary text-xs mt-2">14:30</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 justify-end">
                    <div className="flex-1 text-right">
                      <div className="bg-primary p-3 rounded-lg rounded-tr-none inline-block">
                        <p className="text-white">Harika! Hemen bakıyorum. Teşekkürler.</p>
                        <p className="text-white/70 text-xs mt-2">14:32</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      AK
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-border/30">
                  <div className="flex items-center gap-3">
                    <button className="p-2 rounded-lg hover:bg-surface/80 text-textSecondary transition-colors">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Mesajınızı yazın..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="input-field w-full pr-10"
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-surface/80 text-textSecondary transition-colors">
                        <Smile className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="btn-primary p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-textSecondary">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Bir kişi seçin ve mesajlaşmaya başlayın</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tasks View */}
      {activeView === 'tasks' && (
        <div className="space-y-6">
          {/* Task Filters */}
          <div className="flex items-center gap-4 p-4 glass rounded-xl">
            <select
              value={taskFilter}
              onChange={(e) => setTaskFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">Tüm Görevler</option>
              <option value="my-tasks">Bana Atananlar</option>
              <option value="assigned-by-me">Benim Atadıklarım</option>
              <option value="todo">Yapılacaklar</option>
              <option value="in-progress">Devam Edenler</option>
              <option value="review">İncelemede</option>
              <option value="completed">Tamamlananlar</option>
            </select>
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {filteredTasks.map((task, index) => {
              const assignedMember = teamMembers.find(m => m.id === task.assignedTo)
              const assignedByMember = teamMembers.find(m => m.id === task.assignedBy)
              
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover:scale-[1.02] group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-text">{task.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig[task.priority].color}`}>
                          {priorityConfig[task.priority].label}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${taskStatusConfig[task.status].color}`}>
                          {taskStatusConfig[task.status].label}
                        </span>
                      </div>
                      
                      <p className="text-textSecondary text-sm mb-3">{task.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-textSecondary">Proje:</span>
                          <span className="text-primary font-medium">{task.project}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-textSecondary" />
                          <span className="text-textSecondary">Bitiş:</span>
                          <span className="text-text">{task.dueDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {assignedMember?.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-text">{assignedMember?.name}</p>
                              <p className="text-xs text-textSecondary">Atanan</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {assignedByMember?.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-text">{assignedByMember?.name}</p>
                              <p className="text-xs text-textSecondary">Atan</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {task.attachments.length > 0 && (
                            <div className="flex items-center gap-1 text-textSecondary">
                              <Paperclip className="w-4 h-4" />
                              <span className="text-xs">{task.attachments.length}</span>
                            </div>
                          )}
                          
                          {task.comments > 0 && (
                            <div className="flex items-center gap-1 text-textSecondary">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-xs">{task.comments}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {task.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => console.log('Görev görüntüleniyor:', task.title)}
                        className="p-1.5 rounded-lg hover:bg-primary/20 text-primary transition-colors"
                        title="Görüntüle"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => console.log('Görev düzenleniyor:', task.title)}
                        className="p-1.5 rounded-lg hover:bg-secondary/20 text-secondary transition-colors"
                        title="Düzenle"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMemberAction('message', assignedMember)}
                        className="p-1.5 rounded-lg hover:bg-accent/20 text-accent transition-colors"
                        title="Mesaj Gönder"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Task Assignment Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowTaskModal(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-surface/95 backdrop-blur-xl border border-border/50 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text">Yeni Görev Ata</h2>
              <button
                onClick={() => setShowTaskModal(false)}
                className="p-2 rounded-lg hover:bg-surface/80 transition-colors"
              >
                <Plus className="w-5 h-5 text-textSecondary rotate-45" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Görev Başlığı</label>
                <input
                  type="text"
                  placeholder="Görev başlığını girin..."
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Açıklama</label>
                <textarea
                  rows={3}
                  placeholder="Görev detayları..."
                  className="input-field w-full resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Atanacak Kişi</label>
                  <select 
                    className="input-field w-full"
                    defaultValue={selectedMember?.id || ''}
                  >
                    <option value="">Kişi seçin...</option>
                    {teamMembers.map(member => (
                      <option key={member.id} value={member.id}>
                        {member.name} - {member.role}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Proje</label>
                  <select className="input-field w-full">
                    <option value="">Proje seçin...</option>
                    <option value="nike">Nike Yaz Kampanyası</option>
                    <option value="starbucks">Starbucks Sosyal Medya</option>
                    <option value="samsung">Samsung Galaxy Launch</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Öncelik</label>
                  <select className="input-field w-full">
                    <option value="low">Düşük</option>
                    <option value="medium">Orta</option>
                    <option value="high">Yüksek</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Bitiş Tarihi</label>
                  <input
                    type="date"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Durum</label>
                  <select className="input-field w-full">
                    <option value="todo">Yapılacak</option>
                    <option value="in-progress">Devam Ediyor</option>
                    <option value="review">İnceleme</option>
                    <option value="completed">Tamamlandı</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Etiketler</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {['Design', 'Content', 'Video', 'Instagram', 'Urgent', 'Review'].map(tag => (
                    <label key={tag} className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface/50 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-text">{tag}</span>
                    </label>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Özel etiket ekle..."
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Dosya Ekleri</label>
                <div className="border-2 border-dashed border-border/50 rounded-lg p-4 text-center">
                  <Paperclip className="w-8 h-8 text-textSecondary mx-auto mb-2" />
                  <p className="text-textSecondary text-sm">Dosyaları sürükleyin veya tıklayın</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border/30">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="btn-secondary"
                >
                  İptal
                </button>
                <button
                  type="button"
                  onClick={() => handleMemberAction('message', selectedMember)}
                  className="btn-secondary"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Mesajla Bildir
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  onClick={(e) => {
                    e.preventDefault()
                    handleAssignTask({
                      title: e.target.form[0].value,
                      description: e.target.form[1].value,
                      assignedTo: e.target.form[2].value,
                      project: e.target.form[3].value,
                      priority: e.target.form[4].value,
                      dueDate: e.target.form[5].value,
                      status: e.target.form[6].value
                    })
                  }}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Görev Ata
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Add Member Modal */}
      {showMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMemberModal(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-surface/95 backdrop-blur-xl border border-border/50 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text">Yeni Takım Üyesi Ekle</h2>
              <button
                onClick={() => setShowMemberModal(false)}
                className="p-2 rounded-lg hover:bg-surface/80 transition-colors"
              >
                <Plus className="w-5 h-5 text-textSecondary rotate-45" />
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Ad Soyad</label>
                  <input
                    type="text"
                    placeholder="Ad Soyad"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">E-posta</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="input-field w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Telefon</label>
                  <input
                    type="tel"
                    placeholder="+90 532 555 0000"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Pozisyon</label>
                  <select className="input-field w-full">
                    <option value="">Pozisyon seçin...</option>
                    <option value="creative-director">Creative Director</option>
                    <option value="social-media">Social Media Specialist</option>
                    <option value="graphic-designer">Graphic Designer</option>
                    <option value="content-manager">Content Manager</option>
                    <option value="video-editor">Video Editor</option>
                    <option value="account-manager">Account Manager</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Departman</label>
                  <select className="input-field w-full">
                    <option value="">Departman seçin...</option>
                    <option value="creative">Creative</option>
                    <option value="social-media">Social Media</option>
                    <option value="design">Design</option>
                    <option value="content">Content</option>
                    <option value="video">Video</option>
                    <option value="account">Account</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Deneyim (Yıl)</label>
                  <input
                    type="number"
                    placeholder="5"
                    className="input-field w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Yetenekler</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    'Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Instagram Management',
                    'Facebook Ads', 'Content Writing', 'Video Editing', 'Animation',
                    'UI/UX Design', 'SEO', 'Analytics', 'Project Management'
                  ].map(skill => (
                    <label key={skill} className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface/50 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-text">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Başlangıç Tarihi</label>
                  <input
                    type="date"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Maaş (₺)</label>
                  <input
                    type="number"
                    placeholder="15000"
                    className="input-field w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Notlar</label>
                <textarea
                  rows={3}
                  placeholder="Özel notlar, referanslar, vb..."
                  className="input-field w-full resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border/30">
                <button
                  type="button"
                  onClick={() => setShowMemberModal(false)}
                  className="btn-secondary"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  onClick={(e) => {
                    e.preventDefault()
                    console.log('Yeni takım üyesi ekleniyor...')
                    setShowMemberModal(false)
                  }}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Üye Ekle
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Member Profile Modal */}
      {selectedMember && !showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedMember(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-surface/95 backdrop-blur-xl border border-border/50 rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selectedMember.avatar}
                  </div>
                  <div className={`absolute -bottom-2 -right-2 w-6 h-6 ${statusConfig[selectedMember.status].color} rounded-full border-2 border-background`}></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text">{selectedMember.name}</h2>
                  <p className="text-textSecondary">{selectedMember.role}</p>
                  <p className="text-textSecondary text-sm">{selectedMember.department} • {selectedMember.experience} deneyim</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <span className="text-text font-medium">{selectedMember.rating}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-2 rounded-lg hover:bg-surface/80 transition-colors"
              >
                <Plus className="w-5 h-5 text-textSecondary rotate-45" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Contact & Performance */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-text mb-4">İletişim & Performans</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-textSecondary" />
                        <span className="text-text">{selectedMember.email}</span>
                        <button 
                          onClick={() => handleMemberAction('email', selectedMember)}
                          className="p-1 rounded hover:bg-surface/80"
                        >
                          <Send className="w-3 h-3 text-primary" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-textSecondary" />
                        <span className="text-text">{selectedMember.phone}</span>
                        <button 
                          onClick={() => handleMemberAction('call', selectedMember)}
                          className="p-1 rounded hover:bg-surface/80"
                        >
                          <Phone className="w-3 h-3 text-success" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-textSecondary" />
                        <span className="text-textSecondary">Katılım:</span>
                        <span className="text-text">{selectedMember.joinDate}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-center p-3 bg-surface/50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">{selectedMember.activeProjects}</p>
                        <p className="text-textSecondary text-sm">Aktif Proje</p>
                      </div>
                      <div className="text-center p-3 bg-surface/50 rounded-lg">
                        <p className="text-2xl font-bold text-success">{selectedMember.completedTasks}</p>
                        <p className="text-textSecondary text-sm">Tamamlanan Görev</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-text mb-4">Yetenekler</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/20 text-primary rounded-lg font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Tasks */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-text mb-4">Son Görevler</h3>
                  <div className="space-y-3">
                    {tasks.filter(task => task.assignedTo === selectedMember.id).slice(0, 3).map((task, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                        <div>
                          <p className="font-medium text-text">{task.title}</p>
                          <p className="text-textSecondary text-sm">{task.project}</p>
                          <p className="text-textSecondary text-xs">{task.dueDate}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${taskStatusConfig[task.status].color}`}>
                          {taskStatusConfig[task.status].label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions Sidebar */}
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-text mb-4">Hızlı İşlemler</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleMemberAction('message', selectedMember)}
                      className="w-full btn-primary text-sm"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Mesaj Gönder
                    </button>
                    <button 
                      onClick={() => handleMemberAction('assign-task', selectedMember)}
                      className="w-full btn-secondary text-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Görev Ata
                    </button>
                    <button 
                      onClick={() => handleMemberAction('call', selectedMember)}
                      className="w-full btn-secondary text-sm"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Aramaya Başla
                    </button>
                    <button 
                      onClick={() => handleMemberAction('video', selectedMember)}
                      className="w-full btn-secondary text-sm"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Video Görüşme
                    </button>
                  </div>
                </div>

                {/* Status & Activity */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-text mb-4">Durum</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-textSecondary">Çevrimiçi Durum</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 ${statusConfig[selectedMember.status].color} rounded-full`}></div>
                        <span className="text-text text-sm">{statusConfig[selectedMember.status].label}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-textSecondary">Son Görülme</span>
                      <span className="text-text text-sm">{selectedMember.lastSeen}</span>
                    </div>
                    {selectedMember.isTyping && (
                      <div className="flex items-center gap-2 text-primary">
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm">Yazıyor...</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notifications */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-text mb-4">Bildirimler</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-textSecondary text-sm">Mesaj Bildirimleri</span>
                      <button className="text-primary">
                        <Bell className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-textSecondary text-sm">Görev Bildirimleri</span>
                      <button className="text-primary">
                        <Bell className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-textSecondary text-sm">E-posta Bildirimleri</span>
                      <button className="text-textSecondary">
                        <BellOff className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-text mb-4">Bu Ay Performans</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-textSecondary">Görev Tamamlama</span>
                        <span className="text-text">95%</span>
                      </div>
                      <div className="w-full bg-border rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-textSecondary">Zamanında Teslimat</span>
                        <span className="text-text">87%</span>
                      </div>
                      <div className="w-full bg-border rounded-full h-2">
                        <div className="bg-warning h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-textSecondary">Kalite Puanı</span>
                        <span className="text-text">{selectedMember.rating}/5</span>
                      </div>
                      <div className="w-full bg-border rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${(selectedMember.rating / 5) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
