import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Heart, 
  MessageSquare, 
  Share2, 
  Eye,
  Target,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Building2,
  ChevronDown,
  X,
  RefreshCw
} from 'lucide-react'
import { useStore } from '../store/useStore'

interface MetricCard {
  title: string
  value: string | number
  change: string
  changeType: 'positive' | 'negative'
  icon: React.ElementType
  color: string
}

export const Analytics: React.FC = () => {
  const { clients, campaigns, tasks } = useStore()
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('engagement')
  const [selectedClients, setSelectedClients] = useState<string[]>([])
  const [showClientFilter, setShowClientFilter] = useState(false)

  // Filter campaigns and tasks based on selected clients
  const filteredData = useMemo(() => {
    if (selectedClients.length === 0) {
      return {
        clients: clients,
        campaigns: campaigns,
        tasks: tasks
      }
    }

    const filteredCampaigns = campaigns.filter(campaign => 
      selectedClients.includes(campaign.clientId)
    )
    
    const filteredTasks = tasks.filter(task => 
      filteredCampaigns.some(campaign => campaign.id === task.campaignId)
    )

    const filteredClients = clients.filter(client => 
      selectedClients.includes(client.id)
    )

    return {
      clients: filteredClients,
      campaigns: filteredCampaigns,
      tasks: filteredTasks
    }
  }, [clients, campaigns, tasks, selectedClients])

  // Calculate metrics based on filtered data
  const calculateMetrics = (): MetricCard[] => {
    const totalFollowers = filteredData.clients.reduce((sum, client) => sum + (client.totalBudget / 1000), 0)
    const totalCampaigns = filteredData.campaigns.length
    const completedTasks = filteredData.tasks.filter(task => task.status === 'done').length
    const totalTasks = filteredData.tasks.length
    
    return [
      {
        title: 'Toplam Takipçi',
        value: `${Math.floor(totalFollowers * 2.8)}K`,
        change: '+12.5%',
        changeType: 'positive',
        icon: Users,
        color: 'from-blue-500 to-blue-600'
      },
      {
        title: 'Engagement Rate',
        value: `${(4.2 + (totalCampaigns * 0.1)).toFixed(1)}%`,
        change: '+0.8%',
        changeType: 'positive',
        icon: Heart,
        color: 'from-pink-500 to-pink-600'
      },
      {
        title: 'Aktif Kampanyalar',
        value: filteredData.campaigns.filter(c => c.status === 'in-progress').length,
        change: `${totalCampaigns > 0 ? '+' + Math.floor(totalCampaigns * 2.1) + '%' : '0%'}`,
        changeType: 'positive',
        icon: Target,
        color: 'from-purple-500 to-purple-600'
      },
      {
        title: 'Tamamlanma Oranı',
        value: `${totalTasks > 0 ? Math.floor((completedTasks / totalTasks) * 100) : 0}%`,
        change: totalTasks > 0 ? '+5.2%' : '0%',
        changeType: 'positive',
        icon: Eye,
        color: 'from-orange-500 to-orange-600'
      }
    ]
  }

  const metrics = calculateMetrics()

  const handleClientToggle = (clientId: string) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    )
  }

  const clearClientFilters = () => {
    setSelectedClients([])
  }

  const selectAllClients = () => {
    setSelectedClients(clients.map(client => client.id))
  }

  // Generate platform data based on filtered clients
  const platformData = useMemo(() => {
    if (filteredData.clients.length === 0) {
      return [
        { platform: 'Instagram', followers: '0', engagement: '0%', posts: 0, color: 'bg-gradient-to-r from-pink-500 to-purple-500' },
        { platform: 'LinkedIn', followers: '0', engagement: '0%', posts: 0, color: 'bg-gradient-to-r from-blue-600 to-blue-700' },
        { platform: 'Facebook', followers: '0', engagement: '0%', posts: 0, color: 'bg-gradient-to-r from-blue-500 to-indigo-500' },
        { platform: 'Twitter', followers: '0', engagement: '0%', posts: 0, color: 'bg-gradient-to-r from-sky-400 to-blue-500' }
      ]
    }

    const totalBudget = filteredData.clients.reduce((sum, client) => sum + client.totalBudget, 0)
    const campaignCount = filteredData.campaigns.length

    return [
      { 
        platform: 'Instagram', 
        followers: `${Math.floor(totalBudget / 2000)}K`, 
        engagement: `${(4.8 + (campaignCount * 0.1)).toFixed(1)}%`, 
        posts: Math.floor(campaignCount * 4.5), 
        color: 'bg-gradient-to-r from-pink-500 to-purple-500' 
      },
      { 
        platform: 'LinkedIn', 
        followers: `${Math.floor(totalBudget / 3000)}K`, 
        engagement: `${(5.2 + (campaignCount * 0.15)).toFixed(1)}%`, 
        posts: Math.floor(campaignCount * 3.8), 
        color: 'bg-gradient-to-r from-blue-600 to-blue-700' 
      },
      { 
        platform: 'Facebook', 
        followers: `${Math.floor(totalBudget / 4000)}K`, 
        engagement: `${(3.1 + (campaignCount * 0.12)).toFixed(1)}%`, 
        posts: Math.floor(campaignCount * 5.2), 
        color: 'bg-gradient-to-r from-blue-500 to-indigo-500' 
      },
      { 
        platform: 'Twitter', 
        followers: `${Math.floor(totalBudget / 5000)}K`, 
        engagement: `${(2.8 + (campaignCount * 0.08)).toFixed(1)}%`, 
        posts: Math.floor(campaignCount * 2.9), 
        color: 'bg-gradient-to-r from-sky-400 to-blue-500' 
      }
    ]
  }, [filteredData])

  // Generate top posts based on filtered campaigns
  const topPosts = useMemo(() => {
    return filteredData.campaigns.slice(0, 3).map((campaign, index) => {
      const client = clients.find(c => c.id === campaign.clientId)
      return {
        id: campaign.id,
        platform: campaign.platforms[0] || 'Instagram',
        title: campaign.title,
        client: client?.name || 'Bilinmeyen Müşteri',
        date: campaign.createdAt,
        engagement: { 
          likes: Math.floor(Math.random() * 3000 + 1000), 
          comments: Math.floor(Math.random() * 200 + 50), 
          shares: Math.floor(Math.random() * 150 + 25) 
        },
        reach: Math.floor(Math.random() * 50000 + 20000)
      }
    })
  }, [filteredData.campaigns, clients])

  const demographicsData = [
    { age: '18-24', percentage: 23, color: 'bg-primary' },
    { age: '25-34', percentage: 34, color: 'bg-secondary' },
    { age: '35-44', percentage: 28, color: 'bg-accent' },
    { age: '45-54', percentage: 12, color: 'bg-success' },
    { age: '55+', percentage: 3, color: 'bg-warning' }
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header with Client Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analitik Dashboard</h1>
          <p className="text-textSecondary">
            {selectedClients.length === 0 
              ? 'Tüm müşteriler için sosyal medya performansı' 
              : `${selectedClients.length} müşteri için filtrelenmiş analitik`
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Client Filter */}
          <div className="relative">
            <button
              onClick={() => setShowClientFilter(!showClientFilter)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all ${
                selectedClients.length > 0 
                  ? 'bg-primary/20 border-primary text-primary' 
                  : 'bg-surface border-border text-textSecondary hover:text-white hover:border-primary/30'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>
                {selectedClients.length === 0 
                  ? 'Tüm Müşteriler' 
                  : `${selectedClients.length} Müşteri`
                }
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showClientFilter ? 'rotate-180' : ''}`} />
            </button>

            {/* Client Filter Dropdown */}
            {showClientFilter && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full right-0 mt-2 w-80 bg-surface border border-border rounded-xl shadow-lg z-50 max-h-80 overflow-hidden"
              >
                {/* Filter Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold">Müşteri Filtresi</h3>
                    <button
                      onClick={() => setShowClientFilter(false)}
                      className="p-1 hover:bg-background/50 rounded-lg transition-all"
                    >
                      <X className="w-4 h-4 text-textSecondary" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={selectAllClients}
                      className="text-xs text-primary hover:text-primary/80 transition-all"
                    >
                      Tümünü Seç
                    </button>
                    <span className="text-textSecondary text-xs">•</span>
                    <button
                      onClick={clearClientFilters}
                      className="text-xs text-textSecondary hover:text-white transition-all"
                    >
                      Temizle
                    </button>
                  </div>
                </div>

                {/* Client List */}
                <div className="max-h-60 overflow-y-auto">
                  {clients.map((client) => (
                    <label
                      key={client.id}
                      className="flex items-center space-x-3 p-3 hover:bg-background/30 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={selectedClients.includes(client.id)}
                        onChange={() => handleClientToggle(client.id)}
                        className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary focus:ring-2"
                      />
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{client.name}</p>
                        <p className="text-textSecondary text-xs">{client.industry}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-xs font-medium">{client.campaigns} kampanya</p>
                        <p className="text-textSecondary text-xs">₺{client.totalBudget.toLocaleString()}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Apply Filter Button */}
                <div className="p-4 border-t border-border">
                  <button
                    onClick={() => setShowClientFilter(false)}
                    className="w-full px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/80 transition-all"
                  >
                    Filtreyi Uygula
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Time Range */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-surface border border-border rounded-xl text-white focus:border-primary focus:outline-none"
          >
            <option value="7d">Son 7 Gün</option>
            <option value="30d">Son 30 Gün</option>
            <option value="90d">Son 3 Ay</option>
            <option value="365d">Son 1 Yıl</option>
          </select>
          
          {/* Actions */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 px-4 py-2 bg-surface border border-border rounded-xl text-textSecondary hover:text-white hover:border-primary/30 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 px-4 py-2 bg-primary/20 text-primary rounded-xl hover:bg-primary/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Rapor İndir</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Active Filter Display */}
      {selectedClients.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/30 rounded-xl">
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-primary" />
            <div>
              <p className="text-white font-medium">Aktif Filtreler</p>
              <p className="text-textSecondary text-sm">
                {selectedClients.length} müşteri seçildi: {' '}
                {clients
                  .filter(client => selectedClients.includes(client.id))
                  .map(client => client.name)
                  .join(', ')
                }
              </p>
            </div>
          </div>
          <button
            onClick={clearClientFilters}
            className="flex items-center space-x-2 px-3 py-1 text-textSecondary hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
            <span className="text-sm">Temizle</span>
          </button>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.changeType === 'positive' ? 'text-success' : 'text-error'
                }`}>
                  {metric.changeType === 'positive' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
              <p className="text-textSecondary">{metric.title}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Platform Performance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Engagement Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl bg-surface border border-border"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {selectedClients.length > 0 ? 'Seçili Müşteriler - ' : ''}Engagement Trendi
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedMetric('engagement')}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    selectedMetric === 'engagement' 
                      ? 'bg-primary text-white' 
                      : 'text-textSecondary hover:text-white'
                  }`}
                >
                  Engagement
                </button>
                <button
                  onClick={() => setSelectedMetric('reach')}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    selectedMetric === 'reach' 
                      ? 'bg-primary text-white' 
                      : 'text-textSecondary hover:text-white'
                  }`}
                >
                  Reach
                </button>
                <button
                  onClick={() => setSelectedMetric('impressions')}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    selectedMetric === 'impressions' 
                      ? 'bg-primary text-white' 
                      : 'text-textSecondary hover:text-white'
                  }`}
                >
                  Impressions
                </button>
              </div>
            </div>
            
            {filteredData.campaigns.length > 0 ? (
              <>
                {/* Chart */}
                <div className="relative h-64 bg-background/30 rounded-xl p-4 flex items-end space-x-2">
                  {Array.from({ length: 30 }, (_, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.random() * 60 + 20 + (filteredData.campaigns.length * 2)}%` }}
                      transition={{ delay: i * 0.02 }}
                      className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t opacity-70"
                    />
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-4 text-sm text-textSecondary">
                  <span>1 Kas</span>
                  <span>15 Kas</span>
                  <span>30 Kas</span>
                </div>
              </>
            ) : (
              <div className="h-64 flex items-center justify-center bg-background/30 rounded-xl">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-textSecondary mx-auto mb-4" />
                  <p className="text-textSecondary text-lg">Seçili kriterlerde veri bulunamadı</p>
                  <p className="text-textSecondary text-sm mt-2">Filtre seçimlerinizi değiştirmeyi deneyin</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Platform Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl bg-surface border border-border"
          >
            <h2 className="text-xl font-bold text-white mb-6">Platform Performansı</h2>
            
            <div className="space-y-4">
              {platformData.map((platform, index) => (
                <motion.div
                  key={platform.platform}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-background/30 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold">{platform.platform}</h3>
                    <span className="text-textSecondary text-sm">{platform.followers}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{platform.engagement}</div>
                      <div className="text-xs text-textSecondary">Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{platform.posts}</div>
                      <div className="text-xs text-textSecondary">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-success">+{Math.floor(Math.random() * 20 + 5)}%</div>
                      <div className="text-xs text-textSecondary">Büyüme</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-background/50 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(90, Math.random() * 40 + 60)}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-2 rounded-full ${platform.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Client Performance Summary */}
          {selectedClients.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30"
            >
              <h2 className="text-xl font-bold text-white mb-6">Seçili Müşteriler</h2>
              
              <div className="space-y-4">
                {clients
                  .filter(client => selectedClients.includes(client.id))
                  .map((client, index) => (
                    <motion.div
                      key={client.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-black/20 rounded-xl"
                    >
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate">{client.name}</p>
                        <p className="text-textSecondary text-xs">{client.campaigns} kampanya</p>
                      </div>
                      <div className="text-right">
                        <p className="text-success text-xs font-bold">4.{Math.floor(Math.random() * 9)}/5</p>
                        <p className="text-textSecondary text-xs">Rating</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* Top Posts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl bg-surface border border-border"
          >
            <h2 className="text-xl font-bold text-white mb-6">
              {selectedClients.length > 0 ? 'Seçili Müşteriler - ' : ''}En İyi Performans
            </h2>
            
            {topPosts.length > 0 ? (
              <div className="space-y-4">
                {topPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-background/30 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-primary font-medium">{post.platform}</span>
                      <span className="text-xs text-textSecondary">{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                    </div>
                    
                    <h3 className="text-white font-medium mb-1">{post.title}</h3>
                    <p className="text-textSecondary text-sm mb-3">{post.client}</p>
                    
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="flex items-center justify-center mb-1">
                          <Heart className="w-3 h-3 text-pink-400" />
                        </div>
                        <div className="text-xs text-white font-medium">{post.engagement.likes}</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center mb-1">
                          <MessageSquare className="w-3 h-3 text-blue-400" />
                        </div>
                        <div className="text-xs text-white font-medium">{post.engagement.comments}</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center mb-1">
                          <Share2 className="w-3 h-3 text-green-400" />
                        </div>
                        <div className="text-xs text-white font-medium">{post.engagement.shares}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-center">
                      <div className="text-sm text-textSecondary">Reach</div>
                      <div className="text-lg font-bold text-white">{post.reach.toLocaleString()}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-textSecondary mx-auto mb-3" />
                <p className="text-textSecondary">Seçili kriterlerde post bulunamadı</p>
              </div>
            )}
          </motion.div>

          {/* Demographics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl bg-surface border border-border"
          >
            <h2 className="text-xl font-bold text-white mb-6">Yaş Dağılımı</h2>
            
            <div className="space-y-4">
              {demographicsData.map((demo, index) => (
                <div key={demo.age} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">{demo.age}</span>
                    <span className="text-textSecondary text-sm">{demo.percentage}%</span>
                  </div>
                  <div className="w-full bg-background/30 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${demo.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-2 rounded-full ${demo.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Smart Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-white">Akıllı İçgörüler</h2>
            </div>
            
            <div className="space-y-3">
              {selectedClients.length > 0 ? (
                <>
                  <div className="p-3 bg-black/20 rounded-lg">
                    <div className="text-success text-sm font-medium mb-1">📈 Müşteri Performansı</div>
                    <div className="text-white text-xs">
                      Seçili müşteriler ortalama %{Math.floor(Math.random() * 25 + 15)} daha iyi performans gösteriyor
                    </div>
                  </div>
                  
                  <div className="p-3 bg-black/20 rounded-lg">
                    <div className="text-warning text-sm font-medium mb-1">💡 Sektör Analizi</div>
                    <div className="text-white text-xs">
                      {filteredData.clients[0]?.industry || 'Teknoloji'} sektöründe ortalama üstü engagement
                    </div>
                  </div>
                  
                  <div className="p-3 bg-black/20 rounded-lg">
                    <div className="text-secondary text-sm font-medium mb-1">🎯 Büyüme Fırsatı</div>
                    <div className="text-white text-xs">
                      Instagram Reels ile %40 daha fazla reach elde edilebilir
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 bg-black/20 rounded-lg">
                    <div className="text-success text-sm font-medium mb-1">📈 En İyi Saat</div>
                    <div className="text-white text-xs">Saat 14:00-16:00 arası %34 daha fazla engagement</div>
                  </div>
                  
                  <div className="p-3 bg-black/20 rounded-lg">
                    <div className="text-warning text-sm font-medium mb-1">💡 Öneri</div>
                    <div className="text-white text-xs">Video içerikleri %45 daha iyi performans gösteriyor</div>
                  </div>
                  
                  <div className="p-3 bg-black/20 rounded-lg">
                    <div className="text-secondary text-sm font-medium mb-1">🎯 Fırsat</div>
                    <div className="text-white text-xs">LinkedIn'de B2B içerikler için büyük potansiyel</div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
