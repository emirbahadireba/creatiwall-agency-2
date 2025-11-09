import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import {
  Plus,
  Search,
  Filter,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Star,
  TrendingUp,
  Calendar,
  DollarSign,
  Edit,
  Trash2,
  Eye,
  MessageCircle,
  FileText,
  UserPlus,
  Download,
  MoreHorizontal
} from 'lucide-react'

const clients = [
  {
    id: 1,
    name: 'Nike Turkey',
    industry: 'Spor & Moda',
    email: 'info@nike.com.tr',
    phone: '+90 212 555 0101',
    website: 'www.nike.com.tr',
    location: 'İstanbul, Turkey',
    rating: 5,
    totalProjects: 8,
    activeProjects: 2,
    totalRevenue: 450000,
    monthlyBudget: 75000,
    joinDate: '2023-06-15',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/2292837/pexels-photo-2292837.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    description: 'Global spor markası Nike\'ın Türkiye operasyonları için dijital pazarlama hizmetleri',
    contactPerson: 'Mehmet Yılmaz',
    contactRole: 'Marketing Director',
    lastContact: '2 gün önce',
    nextMeeting: '2025-01-15',
    tags: ['Premium', 'Long-term', 'Strategic']
  },
  {
    id: 2,
    name: 'Starbucks Turkey',
    industry: 'Gıda & İçecek',
    email: 'marketing@starbucks.com.tr',
    phone: '+90 212 555 0202',
    website: 'www.starbucks.com.tr',
    location: 'İstanbul, Turkey',
    rating: 5,
    totalProjects: 12,
    activeProjects: 1,
    totalRevenue: 320000,
    monthlyBudget: 45000,
    joinDate: '2023-03-20',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    description: 'Starbucks Türkiye için sosyal medya yönetimi ve içerik üretimi',
    contactPerson: 'Ayşe Demir',
    contactRole: 'Brand Manager',
    lastContact: '1 hafta önce',
    nextMeeting: '2025-01-20',
    tags: ['Loyal', 'Content-focused']
  },
  {
    id: 3,
    name: 'Samsung Turkey',
    industry: 'Teknoloji',
    email: 'digital@samsung.com.tr',
    phone: '+90 212 555 0303',
    website: 'www.samsung.com.tr',
    location: 'İstanbul, Turkey',
    rating: 4,
    totalProjects: 5,
    activeProjects: 1,
    totalRevenue: 650000,
    monthlyBudget: 120000,
    joinDate: '2024-01-10',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    description: 'Samsung Türkiye için ürün lansmanları ve dijital kampanyalar',
    contactPerson: 'Can Özkan',
    contactRole: 'Digital Marketing Lead',
    lastContact: '3 gün önce',
    nextMeeting: '2025-01-18',
    tags: ['High-value', 'Tech-savvy', 'Innovation']
  },
  {
    id: 4,
    name: 'Coca-Cola Turkey',
    industry: 'Gıda & İçecek',
    email: 'social@coca-cola.com.tr',
    phone: '+90 212 555 0404',
    website: 'www.coca-cola.com.tr',
    location: 'İstanbul, Turkey',
    rating: 4,
    totalProjects: 6,
    activeProjects: 0,
    totalRevenue: 280000,
    monthlyBudget: 0,
    joinDate: '2023-09-05',
    status: 'inactive',
    avatar: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    description: 'Coca-Cola Türkiye için sezonsal kampanyalar ve marka aktivasyonları',
    contactPerson: 'Zeynep Kaya',
    contactRole: 'Communication Manager',
    lastContact: '3 hafta önce',
    nextMeeting: null,
    tags: ['Seasonal', 'On-hold']
  }
]

export default function Clients() {
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [industryFilter, setIndustryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(searchParams.get('action') === 'create')
  const [selectedClient, setSelectedClient] = useState(null)

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = industryFilter === 'all' || client.industry === industryFilter
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter
    return matchesSearch && matchesIndustry && matchesStatus
  })

  const industries = [...new Set(clients.map(client => client.industry))]

  const handleClientAction = (action, client) => {
    switch (action) {
      case 'view':
        setSelectedClient(client)
        console.log('Müşteri detayları görüntüleniyor:', client.name)
        break
      case 'edit':
        console.log('Müşteri düzenleniyor:', client.name)
        break
      case 'delete':
        if (confirm(`"${client.name}" müşterisini silmek istediğinizden emin misiniz?`)) {
          console.log('Müşteri siliniyor:', client.name)
        }
        break
      case 'contact':
        console.log('Müşteri ile iletişim kuruluyor:', client.name)
        break
      case 'project':
        console.log('Yeni proje oluşturuluyor:', client.name)
        break
      case 'report':
        console.log('Müşteri raporu oluşturuluyor:', client.name)
        break
      case 'meeting':
        console.log('Toplantı planlanıyor:', client.name)
        break
    }
  }

  const handleBulkAction = (action) => {
    console.log('Toplu işlem:', action)
  }

  const exportClientData = (client) => {
    const data = {
      client: client,
      exportDate: new Date().toISOString(),
      projects: client.totalProjects,
      revenue: client.totalRevenue
    }
    
    const element = document.createElement('a')
    const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    element.href = URL.createObjectURL(file)
    element.download = `${client.name.replace(/\s+/g, '-')}-data.json`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Müşteriler
          </h1>
          <p className="text-textSecondary mt-1">Müşteri portföyünüzü yönetin ve takip edin</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleBulkAction('export')}
            className="btn-secondary"
          >
            <Download className="w-4 h-4 mr-2" />
            Dışa Aktar
          </button>
          <button 
            onClick={() => handleBulkAction('email')}
            className="btn-secondary"
          >
            <Mail className="w-4 h-4 mr-2" />
            Toplu E-posta
          </button>
          <button onClick={() => setShowCreateModal(true)} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Müşteri
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card hover:scale-105 cursor-pointer"
          onClick={() => console.log('Müşteri detayları gösteriliyor')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Toplam Müşteri</p>
              <p className="text-2xl font-bold text-text mt-1">{clients.length}</p>
              <p className="text-primary text-xs mt-1">+2 bu ay</p>
            </div>
            <div className="p-3 bg-primary/20 rounded-xl">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card hover:scale-105 cursor-pointer"
          onClick={() => setStatusFilter('active')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Aktif Müşteri</p>
              <p className="text-2xl font-bold text-text mt-1">
                {clients.filter(c => c.status === 'active').length}
              </p>
              <p className="text-success text-xs mt-1">%{((clients.filter(c => c.status === 'active').length / clients.length) * 100).toFixed(0)} aktiflik</p>
            </div>
            <div className="p-3 bg-success/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card hover:scale-105 cursor-pointer"
          onClick={() => console.log('Gelir analizi gösteriliyor')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Toplam Gelir</p>
              <p className="text-2xl font-bold text-text mt-1">
                ₺{clients.reduce((sum, client) => sum + client.totalRevenue, 0).toLocaleString()}
              </p>
              <p className="text-secondary text-xs mt-1">Aylık: ₺{clients.reduce((sum, client) => sum + client.monthlyBudget, 0).toLocaleString()}</p>
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
          onClick={() => console.log('Memnuniyet analizi gösteriliyor')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Ortalama Puan</p>
              <p className="text-2xl font-bold text-text mt-1">
                {(clients.reduce((sum, client) => sum + client.rating, 0) / clients.length).toFixed(1)}
              </p>
              <p className="text-warning text-xs mt-1">%95 memnuniyet</p>
            </div>
            <div className="p-3 bg-warning/20 rounded-xl">
              <Star className="w-6 h-6 text-warning" />
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
            placeholder="Müşteri, sektör veya kişi ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 w-full"
          />
        </div>
        
        <select
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
          className="input-field"
        >
          <option value="all">Tüm Sektörler</option>
          {industries.map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-field"
        >
          <option value="all">Tüm Durumlar</option>
          <option value="active">Aktif</option>
          <option value="inactive">Pasif</option>
        </select>

        <button 
          onClick={() => console.log('Gelişmiş filtreler açılıyor')}
          className="btn-secondary"
        >
          <Filter className="w-4 h-4 mr-2" />
          Gelişmiş
        </button>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:scale-105 group"
          >
            {/* Client Header */}
            <div className="flex items-start gap-4 mb-6">
              <img
                src={client.avatar}
                alt={client.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-text hover:text-primary cursor-pointer transition-colors">
                    {client.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.status === 'active' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                  }`}>
                    {client.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
                <p className="text-textSecondary text-sm mb-1">{client.industry}</p>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < client.rating ? 'text-warning fill-current' : 'text-border'
                      }`}
                    />
                  ))}
                  <span className="text-textSecondary text-sm ml-1">({client.rating}.0)</span>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {client.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleClientAction('contact', client)}
                  className="p-1.5 rounded-lg hover:bg-primary/20 text-primary transition-colors"
                  title="İletişim"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleClientAction('meeting', client)}
                  className="p-1.5 rounded-lg hover:bg-secondary/20 text-secondary transition-colors"
                  title="Toplantı Planla"
                >
                  <Calendar className="w-4 h-4" />
                </button>
                <button
                  onClick={() => exportClientData(client)}
                  className="p-1.5 rounded-lg hover:bg-accent/20 text-accent transition-colors"
                  title="Veri İndir"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-textSecondary" />
                <a 
                  href={`mailto:${client.email}`}
                  className="text-textSecondary hover:text-primary transition-colors"
                >
                  {client.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-textSecondary" />
                <a 
                  href={`tel:${client.phone}`}
                  className="text-textSecondary hover:text-primary transition-colors"
                >
                  {client.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Globe className="w-4 h-4 text-textSecondary" />
                <a 
                  href={`https://${client.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-primary transition-colors"
                >
                  {client.website}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-textSecondary" />
                <span className="text-textSecondary">{client.location}</span>
              </div>
            </div>

            {/* Contact Person */}
            <div className="p-3 bg-surface/50 rounded-lg mb-4">
              <p className="text-text font-medium">{client.contactPerson}</p>
              <p className="text-textSecondary text-sm">{client.contactRole}</p>
              <p className="text-textSecondary text-xs mt-1">
                Son iletişim: {client.lastContact}
              </p>
              {client.nextMeeting && (
                <p className="text-primary text-xs mt-1">
                  Sonraki toplantı: {client.nextMeeting}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-textSecondary text-sm mb-6">{client.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 bg-surface/50 rounded-lg text-center">
                <p className="text-2xl font-bold text-text">{client.totalProjects}</p>
                <p className="text-textSecondary text-xs">Toplam Proje</p>
              </div>
              <div className="p-3 bg-surface/50 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{client.activeProjects}</p>
                <p className="text-textSecondary text-xs">Aktif Proje</p>
              </div>
            </div>

            {/* Financial Info */}
            <div className="flex items-center justify-between text-sm p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg mb-4">
              <div>
                <p className="text-textSecondary">Toplam Gelir</p>
                <p className="text-text font-semibold">₺{client.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-textSecondary">Aylık Bütçe</p>
                <p className="text-text font-semibold">₺{client.monthlyBudget.toLocaleString()}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-border/30">
              <button
                onClick={() => handleClientAction('view', client)}
                className="flex-1 btn-secondary text-sm"
              >
                <Eye className="w-4 h-4 mr-1" />
                Görüntüle
              </button>
              <button
                onClick={() => handleClientAction('project', client)}
                className="flex-1 btn-primary text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Yeni Proje
              </button>
              <button
                onClick={() => handleClientAction('edit', client)}
                className="p-2 btn-secondary"
                title="Düzenle"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleClientAction('report', client)}
                className="p-2 btn-secondary"
                title="Rapor"
              >
                <FileText className="w-4 h-4" />
              </button>
            </div>

            {/* Join Date */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/20">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-textSecondary" />
                <span className="text-textSecondary text-sm">Katılım:</span>
                <span className="text-text text-sm">{client.joinDate}</span>
              </div>
              <span className="text-textSecondary text-xs">
                {Math.floor((new Date() - new Date(client.joinDate)) / (1000 * 60 * 60 * 24))} gün
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Client Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-surface/95 backdrop-blur-xl border border-border/50 rounded-xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text">Yeni Müşteri Ekle</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg hover:bg-surface/80 transition-colors"
              >
                <Plus className="w-5 h-5 text-textSecondary rotate-45" />
              </button>
            </div>

            <form className="space-y-6">
              {/* Company Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Şirket Adı</label>
                  <input
                    type="text"
                    placeholder="Şirket adını girin..."
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Sektör</label>
                  <select className="input-field w-full">
                    <option value="">Sektör seçin...</option>
                    <option value="technology">Teknoloji</option>
                    <option value="fashion">Moda</option>
                    <option value="food">Gıda & İçecek</option>
                    <option value="automotive">Otomotiv</option>
                    <option value="finance">Finans</option>
                    <option value="healthcare">Sağlık</option>
                    <option value="education">Eğitim</option>
                    <option value="real-estate">Emlak</option>
                  </select>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">E-posta</label>
                  <input
                    type="email"
                    placeholder="info@sirket.com"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Telefon</label>
                  <input
                    type="tel"
                    placeholder="+90 212 555 0000"
                    className="input-field w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Website</label>
                  <input
                    type="url"
                    placeholder="www.sirket.com"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Konum</label>
                  <input
                    type="text"
                    placeholder="İstanbul, Turkey"
                    className="input-field w-full"
                  />
                </div>
              </div>

              {/* Contact Person */}
              <div className="border-t border-border/30 pt-6">
                <h3 className="text-lg font-semibold text-text mb-4">İletişim Kişisi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Ad Soyad</label>
                    <input
                      type="text"
                      placeholder="Mehmet Yılmaz"
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Pozisyon</label>
                    <input
                      type="text"
                      placeholder="Marketing Director"
                      className="input-field w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Budget & Expectations */}
              <div className="border-t border-border/30 pt-6">
                <h3 className="text-lg font-semibold text-text mb-4">Bütçe & Beklentiler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Aylık Bütçe (₺)</label>
                    <input
                      type="number"
                      placeholder="50000"
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Proje Türü</label>
                    <select className="input-field w-full">
                      <option value="">Seçin...</option>
                      <option value="social-media">Sosyal Medya Yönetimi</option>
                      <option value="campaigns">Dijital Kampanyalar</option>
                      <option value="content">İçerik Üretimi</option>
                      <option value="influencer">Influencer Marketing</option>
                      <option value="seo">SEO & SEM</option>
                      <option value="brand">Marka Stratejisi</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Company Description */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">Şirket Açıklaması</label>
                <textarea
                  rows={4}
                  placeholder="Şirket hakkında detaylı bilgi, faaliyet alanları, hedef kitle..."
                  className="input-field w-full resize-none"
                ></textarea>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">Etiketler</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {['Premium', 'Long-term', 'Strategic', 'High-value', 'Tech-savvy', 'Content-focused', 'Loyal'].map(tag => (
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
                    console.log('Yeni müşteri ekleniyor...')
                    setShowCreateModal(false)
                  }}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Müşteri Ekle
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedClient(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-surface/95 backdrop-blur-xl border border-border/50 rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={selectedClient.avatar}
                  alt={selectedClient.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-text">{selectedClient.name}</h2>
                  <p className="text-textSecondary">{selectedClient.industry}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < selectedClient.rating ? 'text-warning fill-current' : 'text-border'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 rounded-lg hover:bg-surface/80 transition-colors"
              >
                <Plus className="w-5 h-5 text-textSecondary rotate-45" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-text mb-4">İletişim Bilgileri</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-textSecondary" />
                      <span className="text-text">{selectedClient.email}</span>
                      <button className="p-1 rounded hover:bg-surface/80">
                        <MessageCircle className="w-4 h-4 text-primary" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-textSecondary" />
                      <span className="text-text">{selectedClient.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-textSecondary" />
                      <a href={`https://${selectedClient.website}`} target="_blank" className="text-primary hover:text-secondary">
                        {selectedClient.website}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-textSecondary" />
                      <span className="text-text">{selectedClient.location}</span>
                    </div>
                  </div>
                </div>

                {/* Project History */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-text mb-4">Proje Geçmişi</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Yaz Koleksiyonu Kampanyası', status: 'active', date: '2025-01-01' },
                      { name: 'Black Friday Özel', status: 'completed', date: '2024-11-25' },
                      { name: 'Instagram Rebranding', status: 'completed', date: '2024-09-15' }
                    ].map((project, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                        <div>
                          <p className="font-medium text-text">{project.name}</p>
                          <p className="text-textSecondary text-sm">{project.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          project.status === 'active' ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary'
                        }`}>
                          {project.status === 'active' ? 'Aktif' : 'Tamamlandı'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Stats & Actions */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-text mb-4">İstatistikler</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-textSecondary">Toplam Proje</span>
                      <span className="text-text font-semibold">{selectedClient.totalProjects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-textSecondary">Aktif Proje</span>
                      <span className="text-primary font-semibold">{selectedClient.activeProjects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-textSecondary">Toplam Gelir</span>
                      <span className="text-text font-semibold">₺{selectedClient.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-textSecondary">Aylık Bütçe</span>
                      <span className="text-text font-semibold">₺{selectedClient.monthlyBudget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-text mb-4">Hızlı İşlemler</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleClientAction('contact', selectedClient)}
                      className="w-full btn-secondary text-sm"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      İletişime Geç
                    </button>
                    <button 
                      onClick={() => handleClientAction('meeting', selectedClient)}
                      className="w-full btn-secondary text-sm"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Toplantı Planla
                    </button>
                    <button 
                      onClick={() => handleClientAction('project', selectedClient)}
                      className="w-full btn-primary text-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Yeni Proje
                    </button>
                    <button 
                      onClick={() => handleClientAction('report', selectedClient)}
                      className="w-full btn-secondary text-sm"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Rapor Oluştur
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-text mb-4">Etiketler</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedClient.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
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
