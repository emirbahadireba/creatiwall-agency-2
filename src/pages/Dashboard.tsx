import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  Users,
  FolderOpen,
  DollarSign,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Calendar,
  Play,
  Pause,
  Edit,
  Trash2,
  Eye,
  Download
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const stats = [
  {
    name: 'Toplam Gelir',
    value: '₺124,500',
    change: '+12.5%',
    changeType: 'increase',
    icon: DollarSign,
    details: 'Bu ay: ₺18,500'
  },
  {
    name: 'Aktif Projeler',
    value: '23',
    change: '+3',
    changeType: 'increase',
    icon: FolderOpen,
    details: '5 proje bu hafta başladı'
  },
  {
    name: 'Müşteri Sayısı',
    value: '18',
    change: '+2',
    changeType: 'increase',
    icon: Users,
    details: '2 yeni müşteri'
  },
  {
    name: 'Kampanya ROI',
    value: '%285',
    change: '+23%',
    changeType: 'increase',
    icon: Target,
    details: 'Ortalama performans'
  }
]

const revenueData = [
  { month: 'Oca', revenue: 45000, campaigns: 12, projects: 8 },
  { month: 'Şub', revenue: 52000, campaigns: 15, projects: 10 },
  { month: 'Mar', revenue: 61000, campaigns: 18, projects: 12 },
  { month: 'Nis', revenue: 58000, campaigns: 16, projects: 11 },
  { month: 'May', revenue: 67000, campaigns: 21, projects: 15 },
  { month: 'Haz', revenue: 74000, campaigns: 24, projects: 18 },
]

const projectStatusData = [
  { name: 'Tamamlandı', value: 12, color: '#10b981' },
  { name: 'Devam Eden', value: 8, color: '#38bdf8' },
  { name: 'Planlanan', value: 3, color: '#f59e0b' },
  { name: 'Beklemede', value: 2, color: '#ef4444' }
]

const recentProjects = [
  {
    id: 1,
    name: 'Nike Yaz Kampanyası',
    client: 'Nike Turkey',
    progress: 85,
    deadline: '2025-01-15',
    status: 'active',
    team: ['AK', 'MZ', 'EY'],
    budget: 150000,
    spent: 127500
  },
  {
    id: 2,
    name: 'Starbucks Instagram Stratejisi',
    client: 'Starbucks',
    progress: 92,
    deadline: '2025-01-12',
    status: 'review',
    team: ['LT', 'KS'],
    budget: 85000,
    spent: 78200
  },
  {
    id: 3,
    name: 'Samsung Galaxy Launch',
    client: 'Samsung',
    progress: 45,
    deadline: '2025-01-25',
    status: 'active',
    team: ['AK', 'MZ', 'EY', 'LT'],
    budget: 300000,
    spent: 135000
  }
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [timeFrame, setTimeFrame] = useState('6m')
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const handleCreateProject = () => {
    navigate('/projects?action=create')
  }

  const handleCreateCampaign = () => {
    navigate('/campaigns?action=create')
  }

  const handleAddClient = () => {
    navigate('/clients?action=create')
  }

  const handleTimeTracking = () => {
    // Zaman takibi modalı veya sayfası
    console.log('Zaman takibi açılıyor...')
  }

  const handleGenerateReport = () => {
    // Rapor oluşturma işlemi
    const reportData = {
      period: timeFrame,
      stats: stats,
      revenue: revenueData,
      projects: recentProjects
    }
    console.log('Rapor oluşturuluyor:', reportData)
    
    // Simüle edilmiş rapor indirme
    const element = document.createElement('a')
    const file = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    element.href = URL.createObjectURL(file)
    element.download = `dashboard-raporu-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleProjectAction = (action, project) => {
    switch (action) {
      case 'view':
        navigate(`/projects/${project.id}`)
        break
      case 'edit':
        navigate(`/projects/${project.id}/edit`)
        break
      case 'play':
        console.log('Proje başlatılıyor:', project.name)
        break
      case 'pause':
        console.log('Proje duraklatılıyor:', project.name)
        break
      case 'delete':
        if (confirm(`"${project.name}" projesini silmek istediğinizden emin misiniz?`)) {
          console.log('Proje siliniyor:', project.name)
        }
        break
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-textSecondary mt-1">Ajansınızın genel durumu ve performans metrikleri</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleTimeTracking}
            className="btn-secondary hover:scale-105 transition-transform"
          >
            <Clock className="w-4 h-4 mr-2" />
            Zaman Takibi
          </button>
          <button 
            onClick={handleGenerateReport}
            className="btn-primary hover:scale-105 transition-transform"
          >
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </button>
        </div>
      </div>

      {/* Time Frame Selector */}
      <div className="flex items-center gap-2 p-1 bg-surface/50 rounded-lg w-fit">
        {[
          { key: '1m', label: '1 Ay' },
          { key: '3m', label: '3 Ay' },
          { key: '6m', label: '6 Ay' },
          { key: '1y', label: '1 Yıl' }
        ].map(period => (
          <button
            key={period.key}
            onClick={() => setTimeFrame(period.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              timeFrame === period.key
                ? 'bg-primary text-white shadow-lg'
                : 'text-textSecondary hover:text-text hover:bg-surface/80'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card group hover:scale-105 cursor-pointer"
            onClick={() => navigate('/analytics')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-textSecondary text-sm font-medium">{stat.name}</p>
                <p className="text-2xl font-bold text-text mt-2">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-success text-sm font-medium">{stat.change}</span>
                </div>
                <p className="text-textSecondary text-xs mt-1">{stat.details}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text">Aylık Gelir Trendi</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-textSecondary">Gelir</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-textSecondary">Kampanyalar</span>
              </div>
              <button 
                className="text-primary hover:text-secondary text-sm font-medium"
                onClick={() => navigate('/analytics')}
              >
                Detay →
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9E7FFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#9E7FFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" />
                <XAxis dataKey="month" stroke="#A3A3A3" />
                <YAxis stroke="#A3A3A3" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#262626',
                    border: '1px solid #2F2F2F',
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#9E7FFF"
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="campaigns"
                  stroke="#38bdf8"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Project Status Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text">Proje Durumları</h3>
            <button 
              className="text-primary hover:text-secondary text-sm font-medium"
              onClick={() => navigate('/projects')}
            >
              Tümünü Gör →
            </button>
          </div>
          <div className="flex items-center justify-center h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#262626',
                    border: '1px solid #2F2F2F',
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {projectStatusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-textSecondary">{item.name}</span>
                <span className="text-sm font-medium text-text ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>{/* Recent Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text">Son Projeler</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => navigate('/projects')}
              className="text-primary hover:text-secondary font-medium"
            >
              Tümünü Gör →
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 bg-surface/50 rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-text">{project.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'active' ? 'bg-secondary/20 text-secondary' : 
                    project.status === 'review' ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
                  }`}>
                    {project.status === 'active' ? 'Aktif' : 
                     project.status === 'review' ? 'İnceleme' : 'Tamamlandı'}
                  </span>
                </div>
                <p className="text-textSecondary text-sm mt-1">{project.client}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm mb-1">
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
                  <div className="text-right">
                    <p className="text-textSecondary text-xs">Deadline</p>
                    <p className="text-text text-sm font-medium">{project.deadline}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-textSecondary text-xs">Bütçe</p>
                    <p className="text-text text-sm font-medium">
                      ₺{project.spent.toLocaleString()} / ₺{project.budget.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-6">
                <div className="flex -space-x-2">
                  {project.team.map((member, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-background"
                      title={`Takım üyesi: ${member}`}
                    >
                      {member}
                    </div>
                  ))}
                </div>
                
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
                    onClick={() => handleProjectAction('delete', project)}
                    className="p-1.5 rounded-lg hover:bg-error/20 text-error transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="card text-center group cursor-pointer relative overflow-hidden"
          onClick={handleCreateProject}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <FolderOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">Yeni Proje</h3>
            <p className="text-textSecondary text-sm mb-4">Yeni bir proje oluştur ve takımını ata</p>
            <div className="flex items-center justify-between text-xs text-textSecondary mb-4">
              <span>Aktif: 23</span>
              <span>Bu ay: +5</span>
            </div>
            <button className="btn-primary w-full group-hover:shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Proje Oluştur
            </button>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="card text-center group cursor-pointer relative overflow-hidden"
          onClick={handleCreateCampaign}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Target className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">Kampanya Planlama</h3>
            <p className="text-textSecondary text-sm mb-4">Yeni sosyal medya kampanyası planla</p>
            <div className="flex items-center justify-between text-xs text-textSecondary mb-4">
              <span>Aktif: 8</span>
              <span>ROI: %285</span>
            </div>
            <button className="btn-primary w-full group-hover:shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Kampanya Oluştur
            </button>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="card text-center group cursor-pointer relative overflow-hidden"
          onClick={handleAddClient}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-success/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-r from-success/20 to-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">Müşteri Ekle</h3>
            <p className="text-textSecondary text-sm mb-4">Yeni müşteri kaydı oluştur</p>
            <div className="flex items-center justify-between text-xs text-textSecondary mb-4">
              <span>Toplam: 18</span>
              <span>Bu ay: +2</span>
            </div>
            <button className="btn-primary w-full group-hover:shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Müşteri Ekle
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text">Son Aktiviteler</h3>
          <button 
            className="text-primary hover:text-secondary text-sm font-medium"
            onClick={() => navigate('/analytics')}
          >
            Tümünü Gör →
          </button>
        </div>
        <div className="space-y-4">
          {[
            {
              action: 'Yeni proje oluşturuldu',
              detail: 'Nike Yaz Kampanyası projesi başlatıldı',
              time: '2 saat önce',
              type: 'project',
              icon: FolderOpen,
              color: 'text-primary'
            },
            {
              action: 'Kampanya tamamlandı',
              detail: 'Starbucks Yılbaşı kampanyası başarıyla sonuçlandı',
              time: '5 saat önce',
              type: 'campaign',
              icon: CheckCircle,
              color: 'text-success'
            },
            {
              action: 'Yeni müşteri eklendi',
              detail: 'Samsung Turkey müşteri olarak kaydedildi',
              time: '1 gün önce',
              type: 'client',
              icon: Users,
              color: 'text-secondary'
            },
            {
              action: 'Rapor oluşturuldu',
              detail: 'Aylık performans raporu hazırlandı',
              time: '2 gün önce',
              type: 'report',
              icon: TrendingUp,
              color: 'text-accent'
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-surface/30 transition-colors">
              <div className={`p-2 rounded-lg bg-surface/50 ${activity.color.replace('text-', 'bg-').replace('primary', 'primary/20').replace('success', 'success/20').replace('secondary', 'secondary/20').replace('accent', 'accent/20')}`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-text">{activity.action}</p>
                <p className="text-textSecondary text-sm">{activity.detail}</p>
                <p className="text-textSecondary text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
