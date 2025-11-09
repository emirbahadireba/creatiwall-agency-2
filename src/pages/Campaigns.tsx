import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import {
  Plus,
  Search,
  Filter,
  Target,
  TrendingUp,
  Users,
  Eye,
  Heart,
  Share2,
  DollarSign,
  Calendar,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  MoreHorizontal,
  Edit,
  Copy,
  Archive,
  Trash2,
  BarChart3,
  Zap
} from 'lucide-react'

const campaigns = [
  {
    id: 1,
    name: 'Nike Air Max Yaz Koleksiyonu',
    client: 'Nike Turkey',
    status: 'active',
    budget: 50000,
    spent: 32500,
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    platforms: ['Instagram', 'Facebook', 'TikTok'],
    metrics: {
      reach: 125000,
      impressions: 450000,
      engagement: 8.5,
      clicks: 12500,
      conversions: 350,
      cpm: 12.5,
      cpc: 2.8,
      roas: 4.2
    },
    description: 'Yaz koleksiyonu için influencer işbirliği ve sosyal medya reklamları',
    type: 'Influencer Marketing',
    lastActivity: '2 saat önce'
  },
  {
    id: 2,
    name: 'Starbucks Yılbaşı Özel',
    client: 'Starbucks Turkey',
    status: 'completed',
    budget: 30000,
    spent: 28500,
    startDate: '2024-12-15',
    endDate: '2024-12-31',
    platforms: ['Instagram', 'Facebook'],
    metrics: {
      reach: 85000,
      impressions: 320000,
      engagement: 12.3,
      clicks: 8500,
      conversions: 280,
      cpm: 8.9,
      cpc: 3.4,
      roas: 3.8
    },
    description: 'Yılbaşı özel içecekleri ve hediye kartları tanıtımı',
    type: 'Seasonal Campaign',
    lastActivity: '1 hafta önce'
  },
  {
    id: 3,
    name: 'Samsung Galaxy S25 Lansmanı',
    client: 'Samsung Turkey',
    status: 'active',
    budget: 100000,
    spent: 45000,
    startDate: '2025-01-05',
    endDate: '2025-02-15',
    platforms: ['Instagram', 'Facebook', 'YouTube', 'LinkedIn'],
    metrics: {
      reach: 200000,
      impressions: 750000,
      engagement: 6.8,
      clicks: 18500,
      conversions: 420,
      cpm: 6.0,
      cpc: 2.4,
      roas: 5.1
    },
    description: 'Galaxy S25 lansmanı için 360° dijital kampanya',
    type: 'Product Launch',
    lastActivity: '1 saat önce'
  },
  {
    id: 4,
    name: 'Coca-Cola Gençlik Kampanyası',
    client: 'Coca-Cola Turkey',
    status: 'paused',
    budget: 40000,
    spent: 15000,
    startDate: '2024-12-20',
    endDate: '2025-02-28',
    platforms: ['TikTok', 'Instagram', 'YouTube'],
    metrics: {
      reach: 60000,
      impressions: 180000,
      engagement: 15.2,
      clicks: 5200,
      conversions: 95,
      cpm: 15.8,
      cpc: 2.9,
      roas: 2.3
    },
    description: 'Gençlere yönelik viral içerik ve challengekampanyası',
    type: 'Viral Marketing',
    lastActivity: '3 gün önce'
  }
]

const statusConfig = {
  active: { label: 'Aktif', color: 'bg-success/20 text-success', icon: Play },
  completed: { label: 'Tamamlandı', color: 'bg-primary/20 text-primary', icon: CheckCircle },
  paused: { label: 'Durduruldu', color: 'bg-warning/20 text-warning', icon: Pause },
  draft: { label: 'Taslak', color: 'bg-textSecondary/20 text-textSecondary', icon: AlertTriangle }
}

export default function Campaigns() {
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [platformFilter, setPlatformFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(searchParams.get('action') === 'create')
  const [selectedCampaigns, setSelectedCampaigns] = useState(new Set())

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    const matchesPlatform = platformFilter === 'all' || campaign.platforms.includes(platformFilter)
    return matchesSearch && matchesStatus && matchesPlatform
  })

  const handleCampaignAction = (action, campaign) => {
    switch (action) {
      case 'view':
        console.log('Kampanya analizi görüntüleniyor:', campaign.name)
        break
      case 'edit':
        console.log('Kampanya düzenleniyor:', campaign.name)
        break
      case 'duplicate':
        console.log('Kampanya kopyalanıyor:', campaign.name)
        break
      case 'pause':
        console.log('Kampanya duraklatılıyor:', campaign.name)
        break
      case 'play':
        console.log('Kampanya başlatılıyor:', campaign.name)
        break
      case 'archive':
        console.log('Kampanya arşivleniyor:', campaign.name)
        break
      case 'delete':
        if (confirm(`"${campaign.name}" kampanyasını silmek istediğinizden emin misiniz?`)) {
          console.log('Kampanya siliniyor:', campaign.name)
        }
        break
      case 'analytics':
        console.log('Kampanya analitiği açılıyor:', campaign.name)
        break
      case 'boost':
        console.log('Kampanya boost ediliyor:', campaign.name)
        break
    }
  }

  const handleBulkAction = (action) => {
    console.log('Toplu işlem:', action, 'Seçili kampanyalar:', Array.from(selectedCampaigns))
  }

  const calculateROI = (campaign) => {
    return ((campaign.metrics.conversions * 100 - campaign.spent) / campaign.spent * 100).toFixed(1)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Kampanyalar
          </h1>
          <p className="text-textSecondary mt-1">Sosyal medya kampanyalarını yönetin ve analiz edin</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleBulkAction('analytics')}
            className="btn-secondary"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Toplu Analiz
          </button>
          <button onClick={() => setShowCreateModal(true)} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Kampanya
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card hover:scale-105 cursor-pointer"
          onClick={() => console.log('Aktif kampanyalar gösteriliyor')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Aktif Kampanyalar</p>
              <p className="text-2xl font-bold text-text mt-1">
                {campaigns.filter(c => c.status === 'active').length}
              </p>
              <p className="text-success text-xs mt-1">+2 bu hafta</p>
            </div>
            <div className="p-3 bg-success/20 rounded-xl">
              <Target className="w-6 h-6 text-success" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card hover:scale-105 cursor-pointer"
          onClick={() => console.log('Erişim detayları gösteriliyor')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Toplam Erişim</p>
              <p className="text-2xl font-bold text-text mt-1">
                {campaigns.reduce((sum, c) => sum + c.metrics.reach, 0).toLocaleString()}
              </p>
              <p className="text-primary text-xs mt-1">+15.3% bu ay</p>
            </div>
            <div className="p-3 bg-primary/20 rounded-xl">
              <Eye className="w-6 h-6 text-primary" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card hover:scale-105 cursor-pointer"
          onClick={() => console.log('Bütçe detayları gösteriliyor')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Toplam Bütçe</p>
              <p className="text-2xl font-bold text-text mt-1">
                ₺{campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
              </p>
              <p className="text-secondary text-xs mt-1">
                ₺{campaigns.reduce((sum, c) => sum + c.spent, 0).toLocaleString()} harcanmış
              </p>
            </div>
            <div className="p-3 bg-secondary/20 rounded-xl">
              <DollarSign className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card hover:scale-105 cursor-pointer"
          onClick={() => console.log('Etkileşim detayları gösteriliyor')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Ort. Etkileşim</p>
              <p className="text-2xl font-bold text-text mt-1">
                {(campaigns.reduce((sum, c) => sum + c.metrics.engagement, 0) / campaigns.length).toFixed(1)}%
              </p>
              <p className="text-accent text-xs mt-1">Sektör ort. %7.2</p>
            </div>
            <div className="p-3 bg-accent/20 rounded-xl">
              <Heart className="w-6 h-6 text-accent" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 p-4 glass rounded-xl">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-textSecondary" />
          <input
            type="text"
            placeholder="Kampanya veya müşteri ara..."
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
          <option value="completed">Tamamlandı</option>
          <option value="paused">Durduruldu</option>
          <option value="draft">Taslak</option>
        </select>

        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
          className="input-field"
        >
          <option value="all">Tüm Platformlar</option>
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
          <option value="TikTok">TikTok</option>
          <option value="YouTube">YouTube</option>
          <option value="LinkedIn">LinkedIn</option>
        </select>

        {selectedCampaigns.size > 0 && (
          <div className="flex gap-2 ml-4">
            <button 
              onClick={() => handleBulkAction('pause')}
              className="btn-secondary text-sm"
            >
              <Pause className="w-4 h-4 mr-1" />
              Duraklat ({selectedCampaigns.size})
            </button>
            <button 
              onClick={() => handleBulkAction('archive')}
              className="btn-secondary text-sm"
            >
              <Archive className="w-4 h-4 mr-1" />
              Arşivle
            </button>
          </div>
        )}
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCampaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:scale-105 group relative"
          >
            {/* Selection Checkbox */}
            <div className="absolute top-4 left-4 z-10">
              <input
                type="checkbox"
                checked={selectedCampaigns.has(campaign.id)}
                onChange={(e) => {
                  const newSelected = new Set(selectedCampaigns)
                  if (e.target.checked) {
                    newSelected.add(campaign.id)
                  } else {
                    newSelected.delete(campaign.id)
                  }
                  setSelectedCampaigns(newSelected)
                }}
                className="rounded"
              />
            </div>

            {/* Campaign Header */}
            <div className="flex items-start justify-between mb-4 pl-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-text hover:text-primary cursor-pointer transition-colors">
                    {campaign.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[campaign.status].color}`}>
                    {statusConfig[campaign.status].label}
                  </span>
                </div>
                <p className="text-textSecondary text-sm">{campaign.client}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-lg">{campaign.type}</span>
                  <span className="text-textSecondary text-xs">{campaign.lastActivity}</span>
                </div>
                <p className="text-textSecondary text-xs mt-1">{campaign.description}</p>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleCampaignAction('analytics', campaign)}
                  className="p-1.5 rounded-lg hover:bg-primary/20 text-primary transition-colors"
                  title="Analitik"
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCampaignAction('boost', campaign)}
                  className="p-1.5 rounded-lg hover:bg-warning/20 text-warning transition-colors"
                  title="Boost"
                >
                  <Zap className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Budget Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-textSecondary">Bütçe Kullanımı</span>
                <span className="text-text font-medium">
                  ₺{campaign.spent.toLocaleString()} / ₺{campaign.budget.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-textSecondary mt-1">
                <span>Kalan: ₺{(campaign.budget - campaign.spent).toLocaleString()}</span>
                <span>ROI: {calculateROI(campaign)}%</span>
              </div></div>

            {/* Timeline */}
            <div className="flex items-center gap-4 text-sm mb-4 p-3 bg-surface/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-textSecondary" />
                <span className="text-textSecondary">Başlangıç:</span>
                <span className="text-text">{campaign.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-textSecondary">Bitiş:</span>
                <span className="text-text">{campaign.endDate}</span>
              </div>
            </div>

            {/* Platforms */}
            <div className="mb-4">
              <p className="text-textSecondary text-sm mb-2">Platformlar</p>
              <div className="flex flex-wrap gap-2">
                {campaign.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-lg"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Eye className="w-4 h-4 text-primary" />
                  <span className="text-xs text-textSecondary">Erişim</span>
                </div>
                <p className="font-semibold text-text">{campaign.metrics.reach.toLocaleString()}</p>
                <p className="text-xs text-textSecondary">CPM: ₺{campaign.metrics.cpm}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Heart className="w-4 h-4 text-accent" />
                  <span className="text-xs text-textSecondary">Etkileşim</span>
                </div>
                <p className="font-semibold text-text">{campaign.metrics.engagement}%</p>
                <p className="text-xs text-textSecondary">{campaign.metrics.clicks.toLocaleString()} tık</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-xs text-textSecondary">Dönüşüm</span>
                </div>
                <p className="font-semibold text-text">{campaign.metrics.conversions}</p>
                <p className="text-xs text-textSecondary">ROAS: {campaign.metrics.roas}x</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-border/30">
              <div className="flex gap-1">
                <button
                  onClick={() => handleCampaignAction('view', campaign)}
                  className="p-1.5 rounded-lg hover:bg-primary/20 text-primary transition-colors"
                  title="Görüntüle"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCampaignAction('edit', campaign)}
                  className="p-1.5 rounded-lg hover:bg-secondary/20 text-secondary transition-colors"
                  title="Düzenle"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCampaignAction('duplicate', campaign)}
                  className="p-1.5 rounded-lg hover:bg-accent/20 text-accent transition-colors"
                  title="Kopyala"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {campaign.status === 'active' ? (
                  <button
                    onClick={() => handleCampaignAction('pause', campaign)}
                    className="p-1.5 rounded-lg hover:bg-warning/20 text-warning transition-colors"
                    title="Duraklat"
                  >
                    <Pause className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleCampaignAction('play', campaign)}
                    className="p-1.5 rounded-lg hover:bg-success/20 text-success transition-colors"
                    title="Başlat"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleCampaignAction('archive', campaign)}
                  className="p-1.5 rounded-lg hover:bg-warning/20 text-warning transition-colors"
                  title="Arşivle"
                >
                  <Archive className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCampaignAction('delete', campaign)}
                  className="p-1.5 rounded-lg hover:bg-error/20 text-error transition-colors"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-textSecondary">Performans:</span>
                <div className={`w-2 h-2 rounded-full ${
                  campaign.metrics.roas > 4 ? 'bg-success' : 
                  campaign.metrics.roas > 3 ? 'bg-warning' : 'bg-error'
                }`}></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-surface/95 backdrop-blur-xl border border-border/50 rounded-xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text">Yeni Kampanya Oluştur</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg hover:bg-surface/80 transition-colors"
              >
                <Plus className="w-5 h-5 text-textSecondary rotate-45" />
              </button>
            </div>

            <form className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Kampanya Adı</label>
                  <input
                    type="text"
                    placeholder="Kampanya adını girin..."
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Kampanya Türü</label>
                  <select className="input-field w-full">
                    <option value="">Tür seçin...</option>
                    <option value="awareness">Farkındalık</option>
                    <option value="engagement">Etkileşim</option>
                    <option value="conversion">Dönüşüm</option>
                    <option value="traffic">Trafik</option>
                    <option value="app_install">Uygulama İndirme</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Hedef Kitle</label>
                  <input
                    type="text"
                    placeholder="18-35 yaş, İstanbul, Teknoloji..."
                    className="input-field w-full"
                  />
                </div>
              </div>

              {/* Budget & Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Toplam Bütçe (₺)</label>
                  <input
                    type="number"
                    placeholder="50000"
                    className="input-field w-full"
                  />
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

              {/* Platforms */}
              <div>
                <label className="block text-sm font-medium text-text mb-3">Platformlar</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { name: 'Instagram', color: 'bg-pink-500/20 text-pink-400' },
                    { name: 'Facebook', color: 'bg-blue-500/20 text-blue-400' },
                    { name: 'TikTok', color: 'bg-gray-500/20 text-gray-400' },
                    { name: 'YouTube', color: 'bg-red-500/20 text-red-400' },
                    { name: 'LinkedIn', color: 'bg-blue-600/20 text-blue-500' },
                    { name: 'Twitter', color: 'bg-sky-500/20 text-sky-400' }
                  ].map(platform => (
                    <label key={platform.name} className={`flex items-center gap-2 p-3 rounded-lg border border-border/30 hover:border-primary/30 cursor-pointer transition-colors ${platform.color}`}>
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm font-medium">{platform.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Campaign Objectives */}
              <div>
                <label className="block text-sm font-medium text-text mb-3">Kampanya Hedefleri</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-textSecondary mb-1">Hedef Erişim</label>
                    <input type="number" placeholder="100000" className="input-field w-full" />
                  </div>
                  <div>
                    <label className="block text-xs text-textSecondary mb-1">Hedef Etkileşim Oranı (%)</label>
                    <input type="number" placeholder="8.5" className="input-field w-full" />
                  </div>
                  <div>
                    <label className="block text-xs text-textSecondary mb-1">Hedef Tık Sayısı</label>
                    <input type="number" placeholder="5000" className="input-field w-full" />
                  </div>
                  <div>
                    <label className="block text-xs text-textSecondary mb-1">Hedef Dönüşüm</label>
                    <input type="number" placeholder="200" className="input-field w-full" />
                  </div>
                </div>
              </div>

              {/* Creative Assets */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">Kreatif Varlıklar</label>
                <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center">
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                      <Plus className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-textSecondary">Görseller, videolar ve metinler yükleyin</p>
                    <button
                      type="button"
                      className="text-primary hover:text-secondary text-sm font-medium"
                    >
                      Dosya Seç veya Sürükleyip Bırak
                    </button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">Kampanya Açıklaması</label>
                <textarea
                  rows={4}
                  placeholder="Kampanya detayları, strategi, özel notlar..."
                  className="input-field w-full resize-none"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border/30">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary"
                >
                  İptal
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => console.log('Taslak olarak kaydediliyor...')}
                >
                  Taslak Kaydet
                </button>
                <button
                  type="submit"
                className="btn-primary"
                  onClick={(e) => {
                    e.preventDefault()
                    console.log('Kampanya oluşturuluyor ve başlatılıyor...')
                    setShowCreateModal(false)
                  }}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Kampanya Başlat
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
