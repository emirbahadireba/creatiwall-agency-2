import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Users,
  Briefcase,
  CreditCard,
  FileText,
  Download,
  Filter,
  PlusCircle,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  BarChart3
} from 'lucide-react'
import { useStore } from '../store/useStore'

interface Invoice {
  id: string
  clientId: string
  clientName: string
  amount: number
  currency: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  dueDate: string
  createdAt: string
  description: string
  items: InvoiceItem[]
}

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

interface RevenueGoal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  currency: string
  deadline: string
  category: 'monthly' | 'quarterly' | 'yearly'
  status: 'active' | 'completed' | 'paused'
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'TechnoMax',
    amount: 15000,
    currency: 'TRY',
    status: 'paid',
    dueDate: '2024-11-15',
    createdAt: '2024-10-15',
    description: 'Sosyal Medya Yönetimi - Kasım 2024',
    items: [
      { id: '1', description: 'Instagram Yönetimi', quantity: 1, rate: 8000, amount: 8000 },
      { id: '2', description: 'LinkedIn Stratejisi', quantity: 1, rate: 4000, amount: 4000 },
      { id: '3', description: 'Content Creation', quantity: 10, rate: 300, amount: 3000 }
    ]
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Gourmet Kitchen',
    amount: 12500,
    currency: 'TRY',
    status: 'sent',
    dueDate: '2024-11-20',
    createdAt: '2024-11-01',
    description: 'Kampanya Yönetimi - Kasım 2024',
    items: [
      { id: '1', description: 'Kampanya Stratejisi', quantity: 1, rate: 6000, amount: 6000 },
      { id: '2', description: 'İçerik Üretimi', quantity: 15, rate: 250, amount: 3750 },
      { id: '3', description: 'Analytics Raporu', quantity: 1, rate: 2750, amount: 2750 }
    ]
  },
  {
    id: '3',
    clientId: '1',
    clientName: 'TechnoMax',
    amount: 8500,
    currency: 'TRY',
    status: 'overdue',
    dueDate: '2024-10-30',
    createdAt: '2024-09-30',
    description: 'Ek Tasarım Hizmetleri - Ekim 2024',
    items: [
      { id: '1', description: 'Logo Tasarımı', quantity: 3, rate: 1500, amount: 4500 },
      { id: '2', description: 'Banner Tasarımı', quantity: 8, rate: 500, amount: 4000 }
    ]
  }
]

const mockGoals: RevenueGoal[] = [
  {
    id: '1',
    title: 'Kasım 2024 Hedefi',
    targetAmount: 50000,
    currentAmount: 35000,
    currency: 'TRY',
    deadline: '2024-11-30',
    category: 'monthly',
    status: 'active'
  },
  {
    id: '2',
    title: 'Q4 2024 Hedefi',
    targetAmount: 150000,
    currentAmount: 95000,
    currency: 'TRY',
    deadline: '2024-12-31',
    category: 'quarterly',
    status: 'active'
  },
  {
    id: '3',
    title: '2024 Yıllık Hedef',
    targetAmount: 500000,
    currentAmount: 380000,
    currency: 'TRY',
    deadline: '2024-12-31',
    category: 'yearly',
    status: 'active'
  }
]

export const RevenueTracking: React.FC = () => {
  const { clients } = useStore()
  const [selectedTab, setSelectedTab] = useState<'overview' | 'invoices' | 'goals' | 'analytics'>('overview')
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')
  const [showCreateInvoice, setShowCreateInvoice] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-success/20 text-success border border-success/30'
      case 'sent': return 'bg-secondary/20 text-secondary border border-secondary/30'
      case 'overdue': return 'bg-error/20 text-error border border-error/30'
      case 'draft': return 'bg-textSecondary/20 text-textSecondary border border-textSecondary/30'
      case 'cancelled': return 'bg-textSecondary/20 text-textSecondary border border-textSecondary/30'
      default: return 'bg-textSecondary/20 text-textSecondary border border-textSecondary/30'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Ödendi'
      case 'sent': return 'Gönderildi'
      case 'overdue': return 'Gecikmiş'
      case 'draft': return 'Taslak'
      case 'cancelled': return 'İptal'
      default: return 'Bilinmiyor'
    }
  }

  const formatCurrency = (amount: number, currency: string = 'TRY') => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount)
  }

  const calculateTotals = () => {
    const totalRevenue = mockInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0)
    const pendingRevenue = mockInvoices.filter(inv => inv.status === 'sent').reduce((sum, inv) => sum + inv.amount, 0)
    const overdueRevenue = mockInvoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0)
    const totalInvoices = mockInvoices.length

    return { totalRevenue, pendingRevenue, overdueRevenue, totalInvoices }
  }

  const { totalRevenue, pendingRevenue, overdueRevenue, totalInvoices } = calculateTotals()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-xl">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <span>Gelir Takibi</span>
          </h1>
          <p className="text-textSecondary">Finansal performansınızı takip edin ve gelirlerinizi yönetin</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-surface border border-border rounded-xl text-white focus:border-primary focus:outline-none"
          >
            <option value="daily">Günlük</option>
            <option value="weekly">Haftalık</option>
            <option value="monthly">Aylık</option>
            <option value="quarterly">Çeyreklik</option>
            <option value="yearly">Yıllık</option>
          </select>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-surface border border-border rounded-xl text-textSecondary hover:text-white hover:border-primary/30 transition-all">
            <Download className="w-4 h-4" />
            <span>Rapor İndir</span>
          </button>
          
          <button 
            onClick={() => setShowCreateInvoice(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Fatura Oluştur</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-surface rounded-xl p-2 border border-border w-fit">
        {[
          { id: 'overview', label: 'Genel Bakış', icon: BarChart3 },
          { id: 'invoices', label: 'Faturalar', icon: FileText },
          { id: 'goals', label: 'Hedefler', icon: Target },
          { id: 'analytics', label: 'Analitik', icon: TrendingUp }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedTab(id as any)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
              selectedTab === id
                ? 'bg-primary text-white'
                : 'text-textSecondary hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {selectedTab === 'overview' && (
        <div className="space-y-8">
          {/* Revenue Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <DollarSign className="w-6 h-6 text-success" />
                <span className="text-textSecondary">Toplam Gelir</span>
              </div>
              <span className="text-3xl font-bold text-white">{formatCurrency(totalRevenue)}</span>
              <div className="text-success text-sm mt-1 flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span>+18% bu ay</span>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-6 h-6 text-secondary" />
                <span className="text-textSecondary">Bekleyen</span>
              </div>
              <span className="text-3xl font-bold text-white">{formatCurrency(pendingRevenue)}</span>
              <div className="text-secondary text-sm mt-1">{mockInvoices.filter(inv => inv.status === 'sent').length} fatura</div>
            </div>
            
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <AlertCircle className="w-6 h-6 text-error" />
                <span className="text-textSecondary">Gecikmiş</span>
              </div>
              <span className="text-3xl font-bold text-white">{formatCurrency(overdueRevenue)}</span>
              <div className="text-error text-sm mt-1">{mockInvoices.filter(inv => inv.status === 'overdue').length} fatura</div>
            </div>
            
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <FileText className="w-6 h-6 text-accent" />
                <span className="text-textSecondary">Toplam Fatura</span>
              </div>
              <span className="text-3xl font-bold text-white">{totalInvoices}</span>
              <div className="text-accent text-sm mt-1">Bu ay +{Math.floor(totalInvoices * 0.3)}</div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="p-6 bg-surface border border-border rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Gelir Trendi</h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 text-sm text-textSecondary">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Gelir</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-textSecondary">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span>Hedef</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-80 bg-background/30 rounded-xl p-4 flex items-end space-x-2">
              {Array.from({ length: 12 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.random() * 60 + 20}%` }}
                  transition={{ delay: i * 0.1 }}
                  className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t opacity-80"
                />
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-4 text-sm text-textSecondary">
              <span>Ocak</span>
              <span>Haziran</span>
              <span>Aralık</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Invoices */}
            <div className="p-6 bg-surface border border-border rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Son Faturalar</h2>
                <button 
                  onClick={() => setSelectedTab('invoices')}
                  className="text-primary hover:text-primary/80 text-sm"
                >
                  Tümünü Gör →
                </button>
              </div>
              
              <div className="space-y-4">
                {mockInvoices.slice(0, 5).map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 bg-background/30 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{invoice.clientName}</div>
                        <div className="text-textSecondary text-sm">{invoice.description}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-white font-semibold">{formatCurrency(invoice.amount)}</div>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Clients by Revenue */}
            <div className="p-6 bg-surface border border-border rounded-2xl">
              <h2 className="text-xl font-semibold text-white mb-6">Gelir Bazında En İyi Müşteriler</h2>
              
              <div className="space-y-4">
                {clients.map((client, index) => {
                  const clientRevenue = mockInvoices
                    .filter(inv => inv.clientId === client.id && inv.status === 'paid')
                    .reduce((sum, inv) => sum + inv.amount, 0)
                  
                  if (clientRevenue === 0) return null
                  
                  return (
                    <div key={client.id} className="flex items-center space-x-4 p-4 bg-background/30 rounded-xl">
                      <div className="text-textSecondary text-sm w-6">#{index + 1}</div>
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                <div className="flex-1 min-w-0">
                        <div className="text-white font-medium">{client.name}</div>
                        <div className="text-textSecondary text-sm">{client.campaigns} kampanya</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{formatCurrency(clientRevenue)}</div>
                        <div className="text-success text-sm">+{Math.floor(Math.random() * 30 + 10)}%</div>
                      </div>
                    </div>
                  )
                }).filter(Boolean)}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'invoices' && (
        <div className="space-y-6">
          {/* Invoice Filters */}
          <div className="flex items-center space-x-4 flex-wrap gap-4">
            <div className="relative flex-1 min-w-64">
              <input
                type="text"
                placeholder="Fatura ara..."
                className="w-full pl-4 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
              />
            </div>
            
            <select className="px-4 py-3 bg-surface border border-border rounded-xl text-white focus:border-primary focus:outline-none">
              <option value="all">Tüm Durumlar</option>
              <option value="paid">Ödenen</option>
              <option value="sent">Gönderilen</option>
              <option value="overdue">Gecikmiş</option>
              <option value="draft">Taslak</option>
            </select>
            
            <select className="px-4 py-3 bg-surface border border-border rounded-xl text-white focus:border-primary focus:outline-none">
              <option value="all">Tüm Müşteriler</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
            
            <button className="p-3 bg-surface border border-border rounded-xl hover:border-primary/50 transition-all">
              <Filter className="w-5 h-5 text-textSecondary" />
            </button>
          </div>

          {/* Invoices List */}
          <div className="space-y-4">
            {mockInvoices.map((invoice, index) => (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/20 rounded-xl">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">#{invoice.id.padStart(4, '0')}</h3>
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(invoice.status)}`}>
                          {getStatusText(invoice.status)}
                        </span>
                      </div>
                      
                      <p className="text-white font-medium mb-1">{invoice.clientName}</p>
                      <p className="text-textSecondary text-sm mb-3">{invoice.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-textSecondary">Oluşturulma:</span>
                          <div className="text-white">{new Date(invoice.createdAt).toLocaleDateString('tr-TR')}</div>
                        </div>
                        <div>
                          <span className="text-textSecondary">Vade:</span>
                          <div className="text-white">{new Date(invoice.dueDate).toLocaleDateString('tr-TR')}</div>
                        </div>
                        <div>
                          <span className="text-textSecondary">Kalemler:</span>
                          <div className="text-white">{invoice.items.length} adet</div>
                        </div>
                        <div>
                          <span className="text-textSecondary">Para Birimi:</span>
                          <div className="text-white">{invoice.currency}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white mb-2">{formatCurrency(invoice.amount)}</div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-background/50 text-textSecondary hover:text-white rounded-lg transition-all">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-background/50 text-textSecondary hover:text-white rounded-lg transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="px-4 py-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg transition-all text-sm">
                        Detay
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Invoice Items Summary */}
                <div className="border-t border-border pt-4">
                  <div className="space-y-2">
                    {invoice.items.slice(0, 2).map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <span className="text-textSecondary">{item.description} ({item.quantity}x)</span>
                        <span className="text-white">{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                    {invoice.items.length > 2 && (
                      <div className="text-textSecondary text-sm">
                        +{invoice.items.length - 2} kalem daha...
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'goals' && (
        <div className="space-y-8">
          {/* Revenue Goals */}
          <div className="grid gap-6">
            {mockGoals.map((goal, index) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100
              const remaining = goal.targetAmount - goal.currentAmount
              const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
              
              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-surface border border-border"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{goal.title}</h3>
                        <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-lg capitalize">
                          {goal.category === 'monthly' ? 'Aylık' : 
                           goal.category === 'quarterly' ? 'Çeyreklik' : 'Yıllık'}
                        </span>
                      </div>
                      <div className="text-textSecondary text-sm mb-4">
                        Hedef: {formatCurrency(goal.targetAmount)} • 
                        Son tarih: {new Date(goal.deadline).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white mb-1">
                        {formatCurrency(goal.currentAmount)}
                      </div>
                      <div className="text-textSecondary text-sm">
                        / {formatCurrency(goal.targetAmount)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-textSecondary text-sm">İlerleme</span>
                        <span className="text-white font-medium">{progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-background/50 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, progress)}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className={`h-3 rounded-full ${
                            progress >= 100 ? 'bg-gradient-to-r from-success to-success/80' :
                            progress >= 75 ? 'bg-gradient-to-r from-primary to-secondary' :
                            progress >= 50 ? 'bg-gradient-to-r from-secondary to-accent' :
                            'bg-gradient-to-r from-warning to-error'
                          }`}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="p-3 bg-background/30 rounded-lg">
                        <div className="text-textSecondary mb-1">Kalan Miktar</div>
                        <div className="text-white font-semibold">
                          {remaining > 0 ? formatCurrency(remaining) : 'Hedef Aşıldı!'}
                        </div>
                      </div>
                      
                      <div className="p-3 bg-background/30 rounded-lg">
                        <div className="text-textSecondary mb-1">Kalan Gün</div>
                        <div className="text-white font-semibold">
                          {daysLeft > 0 ? `${daysLeft} gün` : 'Süre Doldu'}
                        </div>
                      </div>
                      
                      <div className="p-3 bg-background/30 rounded-lg">
                        <div className="text-textSecondary mb-1">Günlük Hedef</div>
                        <div className="text-white font-semibold">
                          {daysLeft > 0 ? formatCurrency(remaining / daysLeft) : formatCurrency(0)}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Add New Goal */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary/30 transition-all cursor-pointer"
          >
            <div className="text-center">
              <PlusCircle className="w-12 h-12 text-textSecondary mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Yeni Hedef Ekle</h3>
              <p className="text-textSecondary text-sm mb-4">
                Aylık, çeyreklik veya yıllık gelir hedeflerinizi belirleyin
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all">
                Hedef Oluştur
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {selectedTab === 'analytics' && (
        <div className="space-y-8">
          {/* Revenue Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-surface border border-border rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-6">Müşteri Bazlı Gelir Dağılımı</h3>
              
              <div className="space-y-4">
                {clients.map((client) => {
                  const clientRevenue = mockInvoices
                    .filter(inv => inv.clientId === client.id && inv.status === 'paid')
                    .reduce((sum, inv) => sum + inv.amount, 0)
                  
                  const percentage = totalRevenue > 0 ? (clientRevenue / totalRevenue) * 100 : 0
                  
                  if (clientRevenue === 0) return null
                  
                  return (
                    <div key={client.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={client.logo}
                            alt={client.name}
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                          <span className="text-white">{client.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">{formatCurrency(clientRevenue)}</div>
                          <div className="text-textSecondary text-sm">{percentage.toFixed(1)}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-background/50 rounded-full h-2">
                        <div 
                          className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                }).filter(Boolean)}
              </div>
            </div>

            <div className="p-6 bg-surface border border-border rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-6">Fatura Durum Dağılımı</h3>
              
              <div className="space-y-4">
                {[
                  { status: 'paid', label: 'Ödenen', count: mockInvoices.filter(inv => inv.status === 'paid').length, color: 'from-success to-success/80' },
                  { status: 'sent', label: 'Gönderilen', count: mockInvoices.filter(inv => inv.status === 'sent').length, color: 'from-secondary to-secondary/80' },
                  { status: 'overdue', label: 'Gecikmiş', count: mockInvoices.filter(inv => inv.status === 'overdue').length, color: 'from-error to-error/80' },
                  { status: 'draft', label: 'Taslak', count: mockInvoices.filter(inv => inv.status === 'draft').length, color: 'from-textSecondary to-textSecondary/80' }
                ].map(({ status, label, count, color }) => {
                  const percentage = totalInvoices > 0 ? (count / totalInvoices) * 100 : 0
                  
                  return (
                    <div key={status} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white">{label}</span>
                        <div className="text-right">
                          <div className="text-white font-semibold">{count}</div>
                          <div className="text-textSecondary text-sm">{percentage.toFixed(1)}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-background/50 rounded-full h-2">
                        <div 
                          className={`h-2 bg-gradient-to-r ${color} rounded-full`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Monthly Revenue Trend */}
          <div className="p-6 bg-surface border border-border rounded-2xl">
            <h3 className="text-xl font-semibold text-white mb-6">Aylık Gelir Trendi</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {Array.from({ length: 12 }, (_, i) => {
                const monthNames = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
                const revenue = Math.floor(Math.random() * 40000 + 20000)
                const maxRevenue = 50000
                const height = (revenue / maxRevenue) * 100
                
                return (
                  <div key={i} className="text-center">
                    <div className="mb-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}px` }}
                        transition={{ delay: i * 0.1 }}
                        className="w-full bg-gradient-to-t from-primary to-secondary rounded-t mx-auto opacity-80"
                        style={{ minHeight: '20px', maxHeight: '120px' }}
                      />
                    </div>
                    <div className="text-xs text-textSecondary mb-1">{monthNames[i]}</div>
                    <div className="text-xs text-white font-medium">{formatCurrency(revenue, 'TRY').replace('₺', '').replace('.', 'K')}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Financial Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-success/10 to-success/5 border border-success/20 rounded-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6 text-success" />
                <h4 className="text-lg font-semibold text-white">En İyi Ay</h4>
              </div>
              <div className="text-2xl font-bold text-white mb-2">Ekim 2024</div>
              <div className="text-success text-sm mb-3">{formatCurrency(47500)} gelir</div>
              <div className="text-textSecondary text-sm">
                Önceki aya göre %23 artış
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-secondary" />
                <h4 className="text-lg font-semibold text-white">En Karlı Müşteri</h4>
              </div>
              <div className="text-2xl font-bold text-white mb-2">TechnoMax</div>
              <div className="text-secondary text-sm mb-3">{formatCurrency(23500)} gelir</div>
              <div className="text-textSecondary text-sm">
                Toplam gelirin %67'si
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-accent" />
                <h4 className="text-lg font-semibold text-white">Hedef Başarısı</h4>
              </div>
              <div className="text-2xl font-bold text-white mb-2">%76</div>
              <div className="text-accent text-sm mb-3">Aylık hedef tamamlandı</div>
              <div className="text-textSecondary text-sm">
                Kalan: {formatCurrency(12000)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {showCreateInvoice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowCreateInvoice(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface border border-border rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold text-white mb-6">Yeni Fatura Oluştur</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Müşteri</label>
                  <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none">
                    <option value="">Müşteri seçin</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textSecondary mb-2">Vade Tarihi</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textSecondary mb-2">Açıklama</label>
                <input
                  type="text"
                  placeholder="Fatura açıklaması..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">Fatura Kalemleri</h4>
                  <button className="flex items-center space-x-2 px-3 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-all">
                    <PlusCircle className="w-4 h-4" />
                    <span>Kalem Ekle</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-12 gap-4 text-sm text-textSecondary">
                    <div className="col-span-6">Açıklama</div>
                    <div className="col-span-2">Miktar</div>
                    <div className="col-span-2">Fiyat</div>
                    <div className="col-span-2">Toplam</div>
                  </div>
                  
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                      <input
                        type="text"
                        placeholder="Hizmet açıklaması..."
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        placeholder="1"
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <div className="px-3 py-2 bg-background/50 border border-border rounded-lg text-white">
                        ₺0
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-4 mt-6">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span className="text-white">Toplam:</span>
                    <span className="text-primary">₺0</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateInvoice(false)}
                className="flex-1 px-4 py-3 border border-border rounded-xl text-textSecondary hover:text-white hover:bg-background/50 transition-all"
              >
                İptal
              </button>
              <button className="flex-1 px-4 py-3 bg-textSecondary/20 text-textSecondary rounded-xl">
                Taslak Kaydet
              </button>
              <button className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all">
                Fatura Oluştur
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
