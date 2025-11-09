import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Type, 
  Hash, 
  Clock, 
  Target, 
  Brain,
  RefreshCw,
  Copy,
  Download,
  Share2,
  Zap,
  MessageSquare,
  Image,
  Video,
  Calendar,
  TrendingUp,
  Users,
  Settings
} from 'lucide-react'
import { useStore } from '../store/useStore'

interface ContentSuggestion {
  id: string
  type: 'post' | 'story' | 'reel' | 'article'
  platform: string
  content: string
  hashtags: string[]
  bestTime: string
  expectedEngagement: number
  tone: 'professional' | 'casual' | 'humorous' | 'inspiring'
  aiConfidence: number
}

export const AIContentGenerator: React.FC = () => {
  const { clients, campaigns } = useStore()
  const [selectedClient, setSelectedClient] = useState('')
  const [selectedCampaign, setSelectedCampaign] = useState('')
  const [contentType, setContentType] = useState<'post' | 'story' | 'reel' | 'article'>('post')
  const [platform, setPlatform] = useState('instagram')
  const [tone, setTone] = useState<'professional' | 'casual' | 'humorous' | 'inspiring'>('professional')
  const [keywords, setKeywords] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([])

  const generateContent = async () => {
    setIsGenerating(true)
    
    // Simulated AI content generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const client = clients.find(c => c.id === selectedClient)
    const campaign = campaigns.find(c => c.id === selectedCampaign)
    
    const mockSuggestions: ContentSuggestion[] = [
      {
        id: '1',
        type: contentType,
        platform: platform,
        content: `🚀 ${client?.name || 'Markamız'} ile teknolojinin geleceğine adım atıyoruz! Yeni ${campaign?.title || 'projemiz'} ile sektörde fark yaratmaya devam ediyoruz. Sizce bu yenilik hangi alanlarda en çok etkili olacak? 💡 #innovation #tech #future`,
        hashtags: ['#innovation', '#technology', '#future', '#digital', '#success'],
        bestTime: '14:30',
        expectedEngagement: Math.floor(Math.random() * 500 + 200),
        tone: tone,
        aiConfidence: Math.floor(Math.random() * 20 + 80)
      },
      {
        id: '2',
        type: contentType,
        platform: platform,
        content: `✨ Başarının sırrı detaylardadır! ${client?.name || 'Ekibimiz'} olarak her projede mükemmeliyeti hedefliyoruz. Bu hafta ${campaign?.title || 'yeni projemizde'} elde ettiğimiz sonuçlar bizi heyecanlandırıyor! 📈`,
        hashtags: ['#success', '#teamwork', '#excellence', '#growth', '#motivation'],
        bestTime: '16:45',
        expectedEngagement: Math.floor(Math.random() * 400 + 150),
        tone: tone,
        aiConfidence: Math.floor(Math.random() * 15 + 85)
      },
      {
        id: '3',
        type: contentType,
        platform: platform,
        content: `🎯 Hedeflerimizi belirledik, stratejimizi oluşturduk, şimdi sıra uygulamada! ${client?.name || 'Markamızın'} ${campaign?.title || 'yeni döneminde'} neler yapacağımızı merak ediyor musunuz? Yorumlarda tahminlerinizi paylaşın! 🤔`,
        hashtags: ['#strategy', '#goals', '#planning', '#excitement', '#community'],
        bestTime: '19:15',
        expectedEngagement: Math.floor(Math.random() * 600 + 300),
        tone: tone,
        aiConfidence: Math.floor(Math.random() * 25 + 75)
      }
    ]
    
    setSuggestions(mockSuggestions)
    setIsGenerating(false)
  }

  const copyContent = (content: string) => {
    navigator.clipboard.writeText(content)
    // Show toast notification
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <span>AI İçerik Üretici</span>
          </h1>
          <p className="text-textSecondary">Yapay zeka ile profesyonel sosyal medya içerikleri oluşturun</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-4 py-2 bg-success/20 text-success rounded-xl">
            <Brain className="w-4 h-4" />
            <span className="text-sm font-medium">AI Aktif</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 bg-surface border border-border rounded-2xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>İçerik Ayarları</span>
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-textSecondary mb-2">Müşteri</label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
                >
                  <option value="">Müşteri seçin</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-textSecondary mb-2">Kampanya</label>
                <select
                  value={selectedCampaign}
                  onChange={(e) => setSelectedCampaign(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
                >
                  <option value="">Kampanya seçin</option>
                  {campaigns
                    .filter(c => !selectedClient || c.clientId === selectedClient)
                    .map(campaign => (
                      <option key={campaign.id} value={campaign.id}>{campaign.title}</option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-textSecondary mb-2">İçerik Türü</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'post', icon: MessageSquare, label: 'Post' },
                    { value: 'story', icon: Image, label: 'Story' },
                    { value: 'reel', icon: Video, label: 'Reel' },
                    { value: 'article', icon: Type, label: 'Makale' }
                  ].map(({ value, icon: Icon, label }) => (
                    <button
                      key={value}
                      onClick={() => setContentType(value as any)}
                      className={`flex items-center justify-center space-x-2 p-3 rounded-xl transition-all ${
                        contentType === value 
                          ? 'bg-primary text-white' 
                          : 'bg-background text-textSecondary hover:text-white hover:bg-background/80'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-textSecondary mb-2">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
                >
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-textSecondary mb-2">Ton</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as any)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:border-primary focus:outline-none"
                >
                  <option value="professional">Profesyonel</option>
                  <option value="casual">Samimi</option>
                  <option value="humorous">Eğlenceli</option>
                  <option value="inspiring">İlham Verici</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-textSecondary mb-2">Anahtar Kelimeler</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="teknoloji, inovasyon, gelecek..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateContent}
                disabled={isGenerating}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>İçerik Oluşturuluyor...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>İçerik Oluştur</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* AI Tips */}
          <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Brain className="w-5 h-5 text-primary" />
              <span>AI İpuçları</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-sm text-textSecondary">Daha iyi sonuçlar için spesifik anahtar kelimeler kullanın</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                <p className="text-sm text-textSecondary">Kampanya hedeflerinizi belirtin</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <p className="text-sm text-textSecondary">Hedef kitlenizi göz önünde bulundurun</p>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Content */}
        <div className="lg:col-span-2">
          {isGenerating ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-96 bg-surface border border-border rounded-2xl"
            >
              <div className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                  <Brain className="w-8 h-8 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">AI İçerik Oluşturuyor</h3>
                <p className="text-textSecondary">Yapay zeka en uygun içeriği hazırlıyor...</p>
              </div>
            </motion.div>
          ) : suggestions.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 classNameclassName="text-2xl font-semibold text-white">AI Önerileri</h2>
                <div className="flex items-center space-x-2 text-sm text-textSecondary">
                  <Sparkles className="w-4 h-4" />
                  <span>{suggestions.length} içerik oluşturuldu</span>
                </div>
              </div>

              <AnimatePresence>
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="p-6 bg-surface border border-border rounded-2xl hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/20 rounded-lg">
                          <Type className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white capitalize">
                            {suggestion.platform} {suggestion.type}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="px-2 py-1 bg-success/20 text-success text-xs rounded-lg">
                              AI Güven: %{suggestion.aiConfidence}
                            </span>
                            <div className="flex items-center space-x-1 text-xs text-textSecondary">
                              <Clock className="w-3 h-3" />
                              <span>En iyi saat: {suggestion.bestTime}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-textSecondary">
                              <TrendingUp className="w-3 h-3" />
                              <span>~{suggestion.expectedEngagement} engagement</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => copyContent(suggestion.content)}
                          className="p-2 bg-background hover:bg-background/80 rounded-lg transition-all"
                          title="Kopyala"
                        >
                          <Copy className="w-4 h-4 text-textSecondary hover:text-white" />
                        </button>
                        <button className="p-2 bg-background hover:bg-background/80 rounded-lg transition-all">
                          <Share2 className="w-4 h-4 text-textSecondary hover:text-white" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-background/50 rounded-xl p-4 mb-4">
                      <p className="text-white leading-relaxed">{suggestion.content}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {suggestion.hashtags.map((hashtag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-secondary/20 text-secondary text-sm rounded-lg"
                          >
                            {hashtag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 border border-border rounded-lg text-textSecondary hover:text-white hover:border-primary/30 transition-all">
                          Düzenle
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-all">
                          Kullan
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96 bg-surface border border-border rounded-2xl">
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-textSecondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">AI İçerik Üretici Hazır</h3>
                <p className="text-textSecondary mb-6">Sol panelden ayarları yapın ve "İçerik Oluştur" butonuna tıklayın</p>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="p-3 bg-background/30 rounded-xl">
                    <Brain className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-xs text-textSecondary">AI Destekli</p>
                  </div>
                  <div className="p-3 bg-background/30 rounded-xl">
                    <Target className="w-6 h-6 text-secondary mx-auto mb-2" />
                    <p className="text-xs text-textSecondary">Hedef Odaklı</p>
                  </div>
                  <div className="p-3 bg-background/30 rounded-xl">
                    <Zap className="w-6 h-6 text-accent mx-auto mb-2" />
                    <p className="text-xs text-textSecondary">Hızlı</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
