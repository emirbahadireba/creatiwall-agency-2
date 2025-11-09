import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Pause,
  Play,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Copy,
  Archive,
  Star,
  DollarSign
} from 'lucide-react'

const projects = [
  {
    id: 1,
    name: 'Nike Yaz Kampanyası 2025',
    client: 'Nike Turkey',
    status: 'active',
    priority: 'high',
    progress: 85,
    budget: 150000,
    spent: 127500,
    startDate: '2024-12-01',
    deadline: '2025-01-15',
    team: [
      { name: 'Ahmet Kaya', role: 'Creative Director', avatar: 'AK' },
      { name: 'Mehmet Özkan', role: 'Social Media Specialist', avatar: 'MZ' },
      { name: 'Elif Yılmaz', role: 'Graphic Designer', avatar: 'EY' }
    ],
    description: 'Nike için kapsamlı yaz koleksiyonu tanıtım kampanyası',
    platforms: ['Instagram', 'Facebook', 'TikTok', 'YouTube'],
    favorite: true,
    lastActivity: '2 saat önce'
  },
  {
    id: 2,
    name: 'Starbucks Instagram Stratejisi',
    client: 'Starbucks Turkey',
    status: 'review',
    priority: 'medium',
    progress: 92,
    budget: 85000,
    spent: 78200,
    startDate: '2024-11-15',
    deadline: '2025-01-12',
    team: [
      { name: 'Leyla Tekin', role: 'Content Manager', avatar: 'LT' },
      { name: 'Kerem Şahin', role: 'Video Editor', avatar: 'KS' }
    ],
    description: 'Instagram için içerik stratejisi ve influencer işbirlikleri',
    platforms: ['Instagram', 'Instagram Stories', 'Reels'],
    favorite: false,
    lastActivity: '5 saat önce'
  },
  {
    id: 3,
    name: 'Samsung Galaxy S25 Launch',
    client: 'Samsung Turkey',
    status: 'active',
    priority: 'high',
    progress: 45,
    budget: 300000,
    spent: 135000,
    startDate: '2025-01-01',
    deadline: '2025-02-25',
    team: [
      { name: 'Ahmet Kaya', role: 'Creative Director', avatar: 'AK' },
      { name: 'Mehmet Özkan', role: 'Campaign Manager', avatar: 'MZ' },
      { name: 'Elif Yılmaz', role: 'Graphic Designer', avatar: 'EY' },
      { name: 'Leyla Tekin', role: 'Content Manager', avatar: 'LT' }
    ],
    description: 'Samsung Galaxy S25 lansmanı için 360° dijital kampanya',
    platforms: ['Instagram', 'Facebook', 'YouTube', 'LinkedIn', 'TikTok'],
    favorite: true,
    lastActivity: '30 dakika önce'
  },
  {
    id: 4,
    name: 'Coca-Cola Ramadan Kampanyası',
    client: 'Coca-Cola Turkey',
    status: 'paused',
    priority: 'low',
    progress: 25,
    budget: 120000,
    spent: 30000,
    startDate: '2024-12-15',
    deadline: '2025-03-30',
    team: [
      { name: 'Kerem Şahin', role: 'Video Producer', avatar: 'KS' }
    ],
    description: 'Ramazan ayı özel içerik ve aktivasyon kampanyası',
    platforms: ['Instagram', 'Facebook', 'YouTube'],
    favorite: false,
    lastActivity: '3 gün önce'
  }
]

const statusConfig = {
  active: { label: 'Aktif', color: 'bg-success/20 text-success', icon: Play },
  review: { label: 'İnceleme', color: 'bg-warning/20 text-warning', icon: AlertTriangle },
  paused: { label: 'Durduruldu', color: 'bg-error/20 text-error', icon: Pause },
  completed: { label: 'Tamamlandı', color: 'bg-primary/20 text-primary', icon: CheckCircle }
}

const priorityConfig = {
  high: { label: 'Yüksek', color: 'bg-error/20 text-error' },
  medium: { label: 'Orta', color: 'bg-warning/20 text-warning' },
  low: { label: 'Düşük', color: 'bg-success/20 text-success' }
}

export default function Projects() {
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [showCreateModal, setShowCreateModal] = useState(searchParams.get('action') === 'create')
  const [favorites, setFavorites] = useState(new Set([1, 3]))

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleProjectAction = (action, project) => {
    switch (action) {
      case 'view':
        console.log('Proje görüntüleniyor:', project.name)
        break
      case 'edit':
        console.log('Proje düzenleniyor:', project.name)
        break
      case 'duplicate':
        console.log('Proje kopyalanıyor:', project.name)
        break
      case 'archive':
        console.log('Proje arşivleniyor:', project.name)
        break
      case 'delete':
        if (confirm(`"${project.name}" projesini silmek istediğinizden emin misiniz?`)) {
          console.log('Proje siliniyor:', project.name)
        }
        break
      case 'play':
        console.log('Proje başlatılıyor:', project.name)
        break
      case 'pause':
        console.log('Proje duraklatılıyor:', project.name)
        break
      case 'favorite':
        setFavorites(prev => {
          const newFavorites = new Set(prev)
          if (newFavorites.has(project.id)) {
            newFavorites.delete(project.id)
          } else {
            newFavorites.add(project.id)
          }
          return newFavorites
        })
        break
    }
  }

  const handleCreateProject = () => {
    setShowCreateModal(true)
  }

  const handleBulkAction = (action) => {
    console.log('Toplu işlem:', action)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Projeler
          </h1>
          <p className="text-textSecondary mt-1">Tüm projeleri yönetin ve takip edin</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleBulkAction('export')}
            className="btn-secondary"
          >
            <Archive className="w-4 h-4 mr-2" />
            Dışa Aktar
          </button>
          <button onClick={handleCreateProject} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Proje
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card py-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-text">{projects.length}</p>
            <p className="text-textSecondary text-sm">Toplam Proje</p>
          </div>
        </div>
        <div className="card py-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{projects.filter(p => p.status === 'active').length}</p>
            <p className="text-textSecondary text-sm">Aktif Projeler</p>
          </div>
        </div>
        <div className="card py-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">{projects.filter(p => p.status === 'review').length}</p>
            <p className="text-textSecondary text-sm">İncelemede</p>
          </div>
        </div>
        <div className="card py-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              ₺{projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
            </p>
            <p className="text-textSecondary text-sm">Toplam Bütçe</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 p-4 glass rounded-xl">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-textSecondary" />
          <input
            type="text"
            placeholder="Proje veya müşteri ara..."
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
          <option value="active">Aktif</option>
          <option value="review">İnceleme</option>
          <option value="paused">Durduruldu</option>
          <option value="completed">Tamamlandı</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="input-field"
        >
          <option value="all">Tüm Öncelikler</option>
          <option value="high">Yüksek</option>
          <option value="medium">Orta</option>
          <option value="low">Düşük</option>
        </select>

        <div className="flex gap-1 p-1 bg-surface/50 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-textSecondary hover:text-text'}`}
          >
            <Filter className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-primary text-white' : 'text-textSecondary hover:text-text'}`}
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:scale-105 group relative"
          >
            {/* Favorite Star */}
            <button
              onClick={() => handleProjectAction('favorite', project)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-surface/80 transition-colors z-10"
            >
              <Star 
                className={`w-4 h-4 ${
                  favorites.has(project.id) ? 'text-warning fill-current' : 'text-textSecondary'
                }`} 
              />
            </button>

            {/* Project Header */}
            <div className="flex items-start justify-between mb-4 pr-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-text hover:text-primary cursor-pointer transition-colors">
                    {project.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[project.status].color}`}>
                    {statusConfig[project.status].label}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig[project.priority].color}`}>
                    {priorityConfig[project.priority].label}
                  </span>
                </div>
                <p className="text-textSecondary text-sm">{project.client}</p>
                <p className="text-textSecondary text-xs mt-1">{project.description}</p>
                <p className="text-textSecondary text-xs mt-1">Son güncelleme: {project.lastActivity}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-textSecondary">İlerleme</span>
                <span className="text-text font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Budget */}
            <div className="flex items-center justify-between text-sm mb-4 p-3 bg-surface/50 rounded-lg">
              <div>
                <p className="text-textSecondary">Bütçe</p>
                <p className="text-text font-semibold">₺{project.budget.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-textSecondary">Harcanan</p>
                <p className="text-text font-semibold">₺{project.spent.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-textSecondary">Kalan</p>
                <p className="text-success font-semibold">₺{(project.budget - project.spent).toLocaleString()}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex items-center gap-4 text-sm mb-4"><div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-textSecondary" />
                <span className="text-textSecondary">Başlangıç:</span>
                <span className="text-text">{project.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-textSecondary" />
                <span className="text-textSecondary">Bitiş:</span>
                <span className="text-text">{project.deadline}</span>
              </div>
            </div>

            {/* Platforms */}
            <div className="mb-4">
              <p className="text-textSecondary text-sm mb-2">Platformlar</p>
              <div className="flex flex-wrap gap-2">
                {project.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-lg"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            {/* Team and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-textSecondary" />
                <span className="text-textSecondary text-sm">Takım ({project.team.length})</span>
                <div className="flex -space-x-2">
                  {project.team.slice(0, 3).map((member, memberIndex) => (
                    <div
                      key={memberIndex}
                      className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-background"
                      title={`${member.name} - ${member.role}`}
                    >
                      {member.avatar}
                    </div>
                  ))}
                  {project.team.length > 3 && (
                    <div className="w-8 h-8 bg-surface border-2 border-background rounded-full flex items-center justify-center text-textSecondary text-xs font-semibold">
                      +{project.team.length - 3}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleProjectAction('view', project)}
                  className="p-1.5 rounded-lg hover:bg-primary/20 text-primary transition-colors"
                  title="Görüntüle"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleProjectAction('edit', project)}
                  className="p-1.5 rounded-lg hover:bg-secondary/20 text-secondary transition-colors"
                  title="Düzenle"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleProjectAction('duplicate', project)}
                  className="p-1.5 rounded-lg hover:bg-accent/20 text-accent transition-colors"
                  title="Kopyala"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {project.status === 'active' ? (
                  <button
                    onClick={() => handleProjectAction('pause', project)}
                    className="p-1.5 rounded-lg hover:bg-warning/20 text-warning transition-colors"
                    title="Duraklat"
                  >
                    <Pause className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleProjectAction('play', project)}
                    className="p-1.5 rounded-lg hover:bg-success/20 text-success transition-colors"
                    title="Başlat"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleProjectAction('archive', project)}
                  className="p-1.5 rounded-lg hover:bg-warning/20 text-warning transition-colors"
                  title="Arşivle"
                >
                  <Archive className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleProjectAction('delete', project)}
                  className="p-1.5 rounded-lg hover:bg-error/20 text-error transition-colors"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-surface/95 backdrop-blur-xl border border-border/50 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text">Yeni Proje Oluştur</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg hover:bg-surface/80 transition-colors"
              >
                <Plus className="w-5 h-5 text-textSecondary rotate-45" />
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Proje Adı</label>
                  <input
                    type="text"
                    placeholder="Proje adını girin..."
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Müşteri</label>
                  <select className="input-field w-full">
                    <option value="">Müşteri seçin...</option>
                    <option value="nike">Nike Turkey</option>
                    <option value="starbucks">Starbucks Turkey</option>
                    <option value="samsung">Samsung Turkey</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Açıklama</label>
                <textarea
                  rows={3}
                  placeholder="Proje açıklaması..."
                  className="input-field w-full resize-none"
                ></textarea>
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
                  <label className="block text-sm font-medium text-text mb-2">Başlangıç Tarihi</label>
                  <input
                    type="date"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Bitiş Tarihi</label>
                  <input
                    type="date"
                    className="input-field w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Bütçe (₺)</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Takım Üyeleri</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Takım üyesi ekle..."
                      className="input-field flex-1"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Platformlar</label>
                <div className="flex flex-wrap gap-2">
                  {['Instagram', 'Facebook', 'TikTok', 'YouTube', 'LinkedIn', 'Twitter'].map(platform => (
                    <label key={platform} className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface/50 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-text">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border/30">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  onClick={(e) => {
                    e.preventDefault()
                    console.log('Yeni proje oluşturuluyor...')
                    setShowCreateModal(false)
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Proje Oluştur
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
