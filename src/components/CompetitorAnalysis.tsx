import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Heart, 
  MessageSquare,
  Share2,
  Eye,
  Plus,
  Filter,
  Download,
  Target,
  BarChart3,
  Calendar,
  Globe,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'

interface Competitor {
  id: string
  name: string
  handle: string
  avatar: string
  platform: string
  followers: number
  following: number
  posts: number
  engagement: {
    rate: number
    avgLikes: number
    avgComments: number
    avgShares: number
  }
  growth: {
    followers: number
    posts: number
    engagement: number
  }
  topContent: {
    type: string
    performance: number
    date: string
  }[]
  strengths: string[]
  weaknesses: string[]
  lastUpdated: string
}

const mockCompetitors: Competitor[] = [
  {
    id: '1',
    name: 'TechCorp',
    handle: '@techcorp_official',
    avatar: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    platform: 'Instagram',
    followers: 125000,
    following: 890,
    posts: 1247,
    engagement: {
      rate: 4.8,
      avgLikes: 3200,
      avgComments: 180,
      avgShares: 95
    },
    growth: {
      followers: 12.5,
      posts: 8.3,
      engagement: -2.1
    },
    topContent: [
      { type: 'Reel', performance: 95000, date: '2024-11-10' },
      { type: 'Carousel', performance: 87000, date: '2024-11-08' },
      { type: 'Story', performance: 76000, date: '2024-11-07' }
    ],
    strengths: ['Video içerik', 'Kullanıcı etkileşimi', 'Tutarlı paylaşım'],
    weaknesses: ['Story kullanımı', 'Hashtag stratejisi'],
    lastUpdated: '2024-11-12T10:30:00Z'
  },
  {
    id: '2',
    name: 'InnovateLab',
    handle: '@innovate_lab',
    avatar: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    platform: 'LinkedIn',
    followers: 85000,
    following: 1205,
    posts: 892,
    engagement: {
      rate: 6.2,
      avgLikes: 1800,
      avgComments: 95,
      avgShares: 120
    },
    growth: {
      followers: 18.7,
      posts: 15.2,
      engagement: 22.3
    },
    topContent: [
      { type: 'Article', performance: 45000, date: '2024-11-09' },
      { type: 'Post', performance: 38000, date: '2024-11-06' },
      { type: 'Poll', performance: 32000, date: '2024-11-05' }
    ],
    strengths: ['B2B içerik', 'Thought leadership', 'Professional network'],
    weaknesses: ['Visual content', 'Posting frequency'],
    lastUpdated: '2024-11-12T09:15:00Z'
  },
  {
    id: '3',
    name: 'DigitalFirst',
    handle: '@digital_first',
    avatar: 'https://images.pexels.com/photos/3183164/pexels-photo-3183164.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    platform: 'Twitter',
    followers: 62000,
    following: 2340,
    posts: 3456,
    engagement: {
      rate: 3.4,
      avgLikes: 890,
      avgComments: 45,
      avgShares: 67
    },
    growth: {
      followers: -5.2,
      posts: 25.8,
      engagement: -8.7
    },
    topContent: [
      { type: 'Thread', performance: 25000, date: '2024-11-11' },
      { type: 'Tweet', performance: 18000, date: '2024-11-10' },
      { type: 'Retweet', performance: 12000, date: '2024-11-09' }
    ],
    strengths: ['Real-time content', 'Community engagement'],
    weaknesses: ['Content quality', 'Visual branding', 'Follower retention'],
    lastUpdated: '2024-11-12T11:00:00Z'
  }
]

export const CompetitorAnalysis: React.FC = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredCompetitors = mockCompetitors.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comp.handle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = selectedPlatform === 'all' || comp.platform.toLowerCase() === selectedPlatform
    return matchesSearch && matchesPlatform
  })

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-success'
    if (growth < 0) return 'text-error'
    return 'text-textSecondary'
  }

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-4 h-4" />
    if (growth < 0) return <TrendingDown className="w-4 h-4" />
    return <div className="w-4 h-4" />
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-xl">
              <Target className="w-8 h-8 text-white" />
            </div>
            <span>Rakip Analizi</span>
          </h1>
          <p className="text-textSecondary">Rakiplerinizi takip edin ve performanslarını analiz edin</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-surface border border-border rounded-xl text-textSecondary hover:text-white hover:border-primary/30 transition-all">
            <Download className="w-4 h-4" />
            <span>Rapor İndir</span>
          </button>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Rakip Ekle</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-8 flex-wrap gap-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
          <input
            type="text"
            placeholder="Rakip ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
          /></div>
        
        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="px-4 py-3 bg-surface border border-border rounded-xl text-white focus:border-primary focus:outline-none"
        >
          <option value="all">Tüm Platformlar</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
          <option value="linkedin">LinkedIn</option>
          <option value="tiktok">TikTok</option>
        </select>
        
        <button className="p-3 bg-surface border border-border rounded-xl hover:border-primary/50 transition-all">
          <Filter className="w-5 h-5 text-textSecondary" />
        </button>
      </div>

      {/* Competitors Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {filteredCompetitors.map((competitor, index) => (
          <motion.div
            key={competitor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            onClick={() => setSelectedCompetitor(competitor.id)}
            className={`p-6 rounded-2xl border cursor-pointer transition-all ${
              selectedCompetitor === competitor.id
                ? 'bg-primary/10 border-primary'
                : 'bg-surface border-border hover:border-primary/30'
            }`}
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={competitor.avatar}
                alt={competitor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white truncate">{competitor.name}</h3>
                <div className="flex items-center space-x-2">
                  <p className="text-textSecondary text-sm truncate">{competitor.handle}</p>
                  <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-lg">
                    {competitor.platform}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{formatNumber(competitor.followers)}</div>
                <div className="text-xs text-textSecondary">Takipçi</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">{competitor.engagement.rate}%</div>
                <div className="text-xs text-textSecondary">Engagement</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">{competitor.posts}</div>
                <div className="text-xs text-textSecondary">Post</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-textSecondary">Takipçi Artışı</span>
                <div className={`flex items-center space-x-1 ${getGrowthColor(competitor.growth.followers)}`}>
                  {getGrowthIcon(competitor.growth.followers)}
                  <span>{Math.abs(competitor.growth.followers)}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-textSecondary">Engagement Değişimi</span>
                <div className={`flex items-center space-x-1 ${getGrowthColor(competitor.growth.engagement)}`}>
                  {getGrowthIcon(competitor.growth.engagement)}
                  <span>{Math.abs(competitor.growth.engagement)}%</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-xs text-textSecondary">
                <span>Son Güncelleme</span>
                <span>{new Date(competitor.lastUpdated).toLocaleDateString('tr-TR')}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Analysis */}
      {selectedCompetitor && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {(() => {
            const competitor = mockCompetitors.find(c => c.id === selectedCompetitor)!
            return (
              <>
                {/* Competitor Header */}
                <div className="p-6 bg-surface border border-border rounded-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={competitor.avatar}
                        alt={competitor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h2 className="text-2xl font-bold text-white">{competitor.name}</h2>
                        <p className="text-textSecondary">{competitor.handle} • {competitor.platform}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1 text-sm text-textSecondary">
                        <Clock className="w-4 h-4" />
                        <span>Son güncelleme: {new Date(competitor.lastUpdated).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <button className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">{formatNumber(competitor.followers)}</div>
                      <div className="text-textSecondary text-sm mb-2">Takipçi</div>
                      <div className={`flex items-center justify-center space-x-1 text-sm ${getGrowthColor(competitor.growth.followers)}`}>
                        {getGrowthIcon(competitor.growth.followers)}
                        <span>{competitor.growth.followers > 0 ? '+' : ''}{competitor.growth.followers}%</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">{competitor.engagement.rate}%</div>
                      <div className="text-textSecondary text-sm mb-2">Engagement</div>
                      <div className={`flex items-center justify-center space-x-1 text-sm ${getGrowthColor(competitor.growth.engagement)}`}>
                        {getGrowthIcon(competitor.growth.engagement)}
                        <span>{competitor.growth.engagement > 0 ? '+' : ''}{competitor.growth.engagement}%</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">{competitor.posts}</div>
                      <div className="text-textSecondary text-sm mb-2">Toplam Post</div>
                      <div className={`flex items-center justify-center space-x-1 text-sm ${getGrowthColor(competitor.growth.posts)}`}>
                        {getGrowthIcon(competitor.growth.posts)}
                        <span>{competitor.growth.posts > 0 ? '+' : ''}{competitor.growth.posts}%</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">{formatNumber(competitor.engagement.avgLikes)}</div>
                      <div className="text-textSecondary text-sm mb-2">Ort. Beğeni</div>
                      <div className="text-success text-sm">↗ Stable</div>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Top Content Performance */}
                  <div className="p-6 bg-surface border border-border rounded-2xl">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5" />
                      <span>En İyi Performans</span>
                    </h3>
                    
                    <div className="space-y-4">
                      {competitor.topContent.map((content, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-background/30 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-primary/20 rounded-lg">
                              {content.type === 'Reel' && <Eye className="w-4 h-4 text-primary" />}
                              {content.type === 'Carousel' && <Share2 className="w-4 h-4 text-primary" />}
                              {content.type === 'Story' && <Calendar className="w-4 h-4 text-primary" />}
                              {content.type === 'Article' && <Globe className="w-4 h-4 text-primary" />}
                              {content.type === 'Post' && <MessageSquare className="w-4 h-4 text-primary" />}
                              {content.type === 'Poll' && <BarChart3 className="w-4 h-4 text-primary" />}
                              {content.type === 'Thread' && <MessageSquare className="w-4 h-4 text-primary" />}
                              {content.type === 'Tweet' && <MessageSquare className="w-4 h-4 text-primary" />}
                              {content.type === 'Retweet' && <Share2 className="w-4 h-4 text-primary" />}
                            </div>
                            <div>
                              <div className="text-white font-medium">{content.type}</div>
                              <div className="text-textSecondary text-sm">
                                {new Date(content.date).toLocaleDateString('tr-TR')}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-semibold">{formatNumber(content.performance)}</div>
                            <div className="text-textSecondary text-sm">reach</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="p-6 bg-surface border border-border rounded-2xl">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>SWOT Analizi</span>
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-success" />
                          <h4 className="text-lg font-medium text-white">Güçlü Yönler</h4>
                        </div>
                        <div className="space-y-2">
                          {competitor.strengths.map((strength, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg">
                              <div className="w-2 h-2 bg-success rounded-full"></div>
                              <span className="text-white text-sm">{strength}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <AlertCircle className="w-5 h-5 text-warning" />
                          <h4 className="text-lg font-medium text-white">Zayıf Yönler</h4>
                        </div>
                        <div className="space-y-2">
                          {competitor.weaknesses.map((weakness, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                              <div className="w-2 h-2 bg-warning rounded-full"></div>
                              <span className="text-white text-sm">{weakness}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Engagement Analysis */}
                <div className="p-6 bg-surface border border-border rounded-2xl">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>Engagement Detay Analizi</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-background/30 rounded-xl">
                      <div className="flex items-center space-x-3 mb-3">
                        <Heart className="w-6 h-6 text-pink-400" />
                        <span className="text-white font-medium">Beğeniler</span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{formatNumber(competitor.engagement.avgLikes)}</div>
                      <div className="text-textSecondary text-sm">Ortalama per post</div>
                      <div className="w-full bg-background/50 rounded-full h-2 mt-3">
                        <div className="h-2 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-background/30 rounded-xl">
                      <div className="flex items-center space-x-3 mb-3">
                        <MessageSquare className="w-6 h-6 text-blue-400" />
                        <span className="text-white font-medium">Yorumlar</span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{formatNumber(competitor.engagement.avgComments)}</div>
                      <div className="text-textSecondary text-sm">Ortalama per post</div>
                      <div className="w-full bg-background/50 rounded-full h-2 mt-3">
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-background/30 rounded-xl">
                      <div className="flex items-center space-x-3 mb-3">
                        <Share2 className="w-6 h-6 text-green-400" />
                        <span className="text-white font-medium">Paylaşımlar</span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{formatNumber(competitor.engagement.avgShares)}</div>
                      <div className="text-textSecondary text-sm">Ortalama per post</div>
                      <div className="w-full bg-background/50 rounded-full h-2 mt-3">
                        <div className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })()}
        </motion.div>
      )}

      {/* Add Competitor Modal */}
      {showAddModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface border border-border rounded-2xl p-6 w-full max-w-lg"
          >
            <h3 className="text-xl font-bold text-white mb-6">Yeni Rakip Ekle</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-textSecondary mb-2">Platform</label>
                <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none">
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textSecondary mb-2">Kullanıcı Adı</label>
                <input
                  type="text"
                  placeholder="@username"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textSecondary mb-2">Marka Adı (Opsiyonel)</label>
                <input
                  type="text"
                  placeholder="Marka adı..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-3 border border-border rounded-xl text-textSecondary hover:text-white hover:bg-background/50 transition-all"
              >
                İptal
              </button>
              <button className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all">
                Rakip Ekle
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
