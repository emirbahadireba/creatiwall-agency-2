import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Smartphone, 
  Bell, 
  Wifi, 
  WifiOff,
  Camera,
  MapPin,
  Download,
  Upload,
  Zap,
  Shield,
  Settings,
  User,
  MessageSquare,
  Image,
  Video,
  Mic,
  Calendar,
  Clock,
  Target,
  BarChart3,
  Users,
  Heart,
  Share2,
  Trash2
} from 'lucide-react'

interface MobileFeature {
  id: string
  name: string
  description: string
  icon: React.ElementType
  status: 'active' | 'inactive' | 'development'
  category: 'notifications' | 'offline' | 'content' | 'location' | 'security'
}

const mobileFeatures: MobileFeature[] = [
  {
    id: '1',
    name: 'Push Bildirimleri',
    description: 'Anlık görev ve kampanya güncellemelerini alın',
    icon: Bell,
    status: 'active',
    category: 'notifications'
  },
  {
    id: '2',
    name: 'Çevrimdışı Mod',
    description: 'İnternetsiz ortamda çalışmaya devam edin',
    icon: WifiOff,
    status: 'active',
    category: 'offline'
  },
  {
    id: '3',
    name: 'Kamera Entegrasyonu',
    description: 'Direkt uygulama içinden fotoğraf ve video çekin',
    icon: Camera,
    status: 'active',
    category: 'content'
  },
  {
    id: '4',
    name: 'Konum Bazlı Özellikler',
    description: 'Lokasyon etiketleme ve geo-targeting',
    icon: MapPin,
    status: 'development',
    category: 'location'
  },
  {
    id: '5',
    name: 'Mobil İçerik Editörü',
    description: 'Telefonunuzdan profesyonel içerikler oluşturun',
    icon: Image,
    status: 'active',
    category: 'content'
  },
  {
    id: '6',
    name: 'Ses Notları',
    description: 'Hızlı ses kayıtları ile görev notları alın',
    icon: Mic,
    status: 'development',
    category: 'content'
  },
  {
    id: '7',
    name: 'Mobil Analytics',
    description: 'Detaylı performans metrikleri mobilde',
    icon: BarChart3,
    status: 'active',
    category: 'notifications'
  },
  {
    id: '8',
    name: 'Biyometrik Güvenlik',
    description: 'Parmak izi ve yüz tanıma ile güvenli giriş',
    icon: Shield,
    status: 'development',
    category: 'security'
  }
]

const mockNotifications = [
  {
    id: '1',
    title: 'Yeni Görev Atandı',
    message: 'Instagram story tasarımı görevi size atandı',
    time: '2 dakika önce',
    type: 'task',
    read: false
  },
  {
    id: '2',
    title: 'Kampanya Onaylandı',
    message: 'TechnoMax kampanyası müşteri tarafından onaylandı',
    time: '15 dakika önce',
    type: 'approval',
    read: false
  },
  {
    id: '3',
    title: 'Yüksek Engagement',
    message: 'Son Instagram postunuz 1000+ beğeni aldı',
    time: '1 saat önce',
    type: 'performance',
    read: true
  },
  {
    id: '4',
    title: 'Toplantı Hatırlatması',
    message: '30 dakika sonra müşteri toplantınız var',
    time: '2 saat önce',
    type: 'reminder',
    read: true
  }
]

const offlineCapabilities = [
  {
    feature: 'Görev Görüntüleme',
    description: 'Mevcut görevleri çevrimdışı görüntüleyin',
    available: true
  },
  {
    feature: 'İçerik Oluşturma',
    description: 'Çevrimdışı içerik oluşturun, bağlantı geldiğinde senkronize edin',
    available: true
  },
  {
    feature: 'Fotoğraf/Video Çekimi',
    description: 'Medya dosyalarını yerel olarak saklayın',
    available: true
  },
  {
    feature: 'Not Alma',
    description: 'Görevlere not ekleyin, sonra senkronize edin',
    available: true
  },
  {
    feature: 'Analytics Görüntüleme',
    description: 'Önceden yüklenmiş analitik verileri görüntüleyin',
    available: false
  },
  {
    feature: 'Mesajlaşma',
    description: 'Takım arkadaşlarınızla çevrimdışı mesajlaşma',
    available: false
  }
]

export const MobileFeatures: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'notifications' | 'offline' | 'content'>('overview')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/20 text-success border border-success/30'
      case 'development': return 'bg-warning/20 text-warning border border-warning/30'
      case 'inactive': return 'bg-textSecondary/20 text-textSecondary border border-textSecondary/30'
      default: return 'bg-textSecondary/20 text-textSecondary border border-textSecondary/30'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif'
      case 'development': return 'Geliştiriliyor'
      case 'inactive': return 'Pasif'
      default: return 'Bilinmiyor'
    }
  }

  const filteredFeatures = selectedTab === 'overview' 
    ? mobileFeatures 
    : mobileFeatures.filter(f => f.category === selectedTab)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-xl">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <span>Mobil Özellikler</span>
          </h1>
          <p className="text-textSecondary">Mobil cihazlarda gelişmiş özellikler ve yetenekler</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-4 py-2 bg-success/20 text-success rounded-xl">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Mobil Aktif</span>
          </div>
          <button className="px-4 py-2 bg-surface border border-border rounded-xl text-textSecondary hover:text-white hover:border-primary/30 transition-all">
            <Download className="w-4 h-4 inline mr-2" />
            Mobil App İndir
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-surface rounded-xl p-2 border border-border w-fit">
        {[
          { id: 'overview', label: 'Genel Bakış', icon: Smartphone },
          { id: 'notifications', label: 'Bildirimler', icon: Bell },
          { id: 'offline', label: 'Çevrimdışı', icon: WifiOff },
          { id: 'content', label: 'İçerik', icon: Image }
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
          {/* Mobile App Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <Download className="w-6 h-6 text-primary" />
                <span className="text-textSecondary">İndirmeler</span>
              </div>
              <span className="text-3xl font-bold text-white">2,547</span>
              <div className="text-success text-sm mt-1">+23% bu ay</div>
            </div>
            
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="w-6 h-6 text-secondary" />
                <span className="text-textSecondary">Aktif Kullanıcı</span>
              </div>
              <span className="text-3xl font-bold text-white">1,892</span>
              <div className="text-success text-sm mt-1">+18% bu ay</div>
            </div>
            
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-6 h-6 text-accent" />
                <span className="text-textSecondary">Ort. Kullanım</span>
              </div>
              <span className="text-3xl font-bold text-white">34dk</span>
              <div className="text-success text-sm mt-1">+12% bu ay</div>
            </div>
            
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <Heart className="w-6 h-6 text-pink-500" />
                <span className="text-textSecondary">Memnuniyet</span>
              </div>
              <span className="text-3xl font-bold text-white">4.8/5</span>
              <div className="text-success text-sm mt-1">+0.3 bu ay</div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mobileFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(feature.status)}`}>
                      {getStatusText(feature.status)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.name}</h3>
                  <p className="text-textSecondary text-sm mb-4">{feature.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-lg capitalize">
                      {feature.category}
                    </span>
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      Detay →
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {selectedTab === 'notifications' && (
        <div className="space-y-8">
          {/* Notification Settings */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="p-6 bg-surface border border-border rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Bildirim Ayarları</span>
              </h3>
              
              <div className="space-y-4">
                {[
                  { label: 'Yeni Görev Bildirimleri', enabled: true },
                  { label: 'Kampanya Güncellemeleri', enabled: true },
                  { label: 'Müşteri Mesajları', enabled: true },
                  { label: 'Toplantı Hatırlatmaları', enabled: true },
                  { label: 'Performans Raporları', enabled: false },
                  { label:'Sistem Bakım Bildirimleri', enabled: false }
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-background/30 rounded-xl">
                    <span className="text-white">{setting.label}</span>
                    <div className={`w-12 h-6 rounded-full transition-all cursor-pointer ${
                      setting.enabled ? 'bg-primary' : 'bg-textSecondary/30'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${
                        setting.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="p-6 bg-surface border border-border rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-6">Son Bildirimler</h3>
              
              <div className="space-y-3">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-xl transition-all ${
                      notification.read 
                        ? 'bg-background/30' 
                        : 'bg-primary/10 border border-primary/30'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        notification.type === 'task' ? 'bg-secondary/20' :
                        notification.type === 'approval' ? 'bg-success/20' :
                        notification.type === 'performance' ? 'bg-accent/20' :
                        'bg-warning/20'
                      }`}>
                        {notification.type === 'task' && <Target className="w-4 h-4 text-secondary" />}
                        {notification.type === 'approval' && <Shield className="w-4 h-4 text-success" />}
                        {notification.type === 'performance' && <BarChart3 className="w-4 h-4 text-accent" />}
                        {notification.type === 'reminder' && <Clock className="w-4 h-4 text-warning" />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm">{notification.title}</h4>
                        <p className="text-textSecondary text-sm mt-1">{notification.message}</p>
                        <span className="text-textSecondary text-xs mt-2">{notification.time}</span>
                      </div>
                      
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Push Notification Analytics */}
          <div className="p-6 bg-surface border border-border rounded-2xl">
            <h3 className="text-xl font-semibold text-white mb-6">Bildirim Analytics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">847</div>
                <div className="text-textSecondary text-sm mb-3">Bu ay gönderilen</div>
                <div className="text-success text-sm">+15% önceki aya göre</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">73%</div>
                <div className="text-textSecondary text-sm mb-3">Açılma oranı</div>
                <div className="text-success text-sm">+5% önceki aya göre</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">42%</div>
                <div className="text-textSecondary text-sm mb-3">Tıklama oranı</div>
                <div className="text-warning text-sm">-2% önceki aya göre</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">2.3dk</div>
                <div className="text-textSecondary text-sm mb-3">Ortalama yanıt süresi</div>
                <div className="text-success text-sm">-12sn önceki aya göre</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'offline' && (
        <div className="space-y-8">
          {/* Offline Capabilities */}
          <div className="p-6 bg-surface border border-border rounded-2xl">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <WifiOff className="w-5 h-5" />
              <span>Çevrimdışı Yetenekler</span>
            </h3>
            
            <div className="grid gap-4">
              {offlineCapabilities.map((capability, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    capability.available 
                      ? 'bg-success/10 border border-success/20' 
                      : 'bg-warning/10 border border-warning/20'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      capability.available ? 'bg-success/20' : 'bg-warning/20'
                    }`}>
                      {capability.available ? 
                        <Zap className="w-4 h-4 text-success" /> : 
                        <Clock className="w-4 h-4 text-warning" />
                      }
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{capability.feature}</h4>
                      <p className="text-textSecondary text-sm">{capability.description}</p>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    capability.available 
                      ? 'bg-success/20 text-success' 
                      : 'bg-warning/20 text-warning'
                  }`}>
                    {capability.available ? 'Mevcut' : 'Yakında'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sync Status */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="p-6 bg-surface border border-border rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Senkronizasyon Durumu</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-success/20 rounded-lg">
                      <Upload className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Görevler</div>
                      <div className="text-textSecondary text-sm">Son senkronizasyon: 2 dk önce</div>
                    </div>
                  </div>
                  <div className="text-success text-sm">Güncel</div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-background/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-warning/20 rounded-lg">
                      <Clock className="w-4 h-4 text-warning" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Medya Dosyaları</div>
                      <div className="text-textSecondary text-sm">3 dosya bekliyor</div>
                    </div>
                  </div>
                  <div className="text-warning text-sm">Bekleniyor</div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-background/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-success/20 rounded-lg">
                      <Upload className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Notlar</div>
                      <div className="text-textSecondary text-sm">Son senkronizasyon: 5 dk önce</div>
                    </div>
                  </div>
                  <div className="text-success text-sm">Güncel</div>
                </div>
              </div>
            </div>

            {/* Storage Usage */}
            <div className="p-6 bg-surface border border-border rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-6">Depolama Kullanımı</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Toplam Kullanım</span>
                    <span className="text-textSecondary">2.4GB / 5GB</span>
                  </div>
                  <div className="w-full bg-background/50 rounded-full h-3">
                    <div className="h-3 bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-textSecondary text-sm">Görevler & Veriler</span>
                    </div>
                    <span className="text-white text-sm">850MB</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-secondary rounded-full"></div>
                      <span className="text-textSecondary text-sm">Medya Dosyaları</span>
                    </div>
                    <span className="text-white text-sm">1.2GB</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <span className="text-textSecondary text-sm">Önbellek</span>
                    </div>
                    <span className="text-white text-sm">350MB</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 px-4 py-3 bg-background/50 text-textSecondary hover:text-white hover:bg-background/70 rounded-xl transition-all">
                  <Trash2 className="w-4 h-4 inline mr-2" />
                  Önbelleği Temizle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'content' && (
        <div className="space-y-8">
          {/* Mobile Content Creation */}
          <div className="p-6 bg-surface border border-border rounded-2xl">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <Camera className="w-5 h-5" />
              <span>Mobil İçerik Oluşturma</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-background/30 rounded-xl text-center">
                <Camera className="w-12 h-12 text-primary mx-auto mb-3" />
                <h4 className="text-white font-medium mb-2">Fotoğraf Çekimi</h4>
                <p className="text-textSecondary text-sm mb-4">Profesyonel fotoğraflar çekin ve düzenleyin</p>
                <div className="text-success text-sm">✓ Aktif</div>
              </div>
              
              <div className="p-4 bg-background/30 rounded-xl text-center">
                <Video className="w-12 h-12 text-secondary mx-auto mb-3" />
                <h4 className="text-white font-medium mb-2">Video Kayıt</h4>
                <p className="text-textSecondary text-sm mb-4">HD kalitede video kayıtları yapın</p>
                <div className="text-success text-sm">✓ Aktif</div>
              </div>
              
              <div className="p-4 bg-background/30 rounded-xl text-center">
                <Mic className="w-12 h-12 text-accent mx-auto mb-3" />
                <h4 className="text-white font-medium mb-2">Ses Kayıt</h4>
                <p className="text-textSecondary text-sm mb-4">Hızlı notlar için ses kayıtları</p>
                <div className="text-warning text-sm">⚡ Geliştiriliyor</div>
              </div>
              
              <div className="p-4 bg-background/30 rounded-xl text-center">
                <Image className="w-12 h-12 text-pink-500 mx-auto mb-3" />
                <h4 className="text-white font-medium mb-2">Hızlı Düzenleme</h4><p className="text-textSecondary text-sm mb-4">Anında filtreler ve efektler</p>
                <div className="text-success text-sm">✓ Aktif</div>
              </div>
            </div>
          </div>

          {/* Content Templates */}
          <div className="p-6 bg-surface border border-border rounded-2xl">
            <h3 className="text-xl font-semibold text-white mb-6">Mobil Şablonlar</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Story Şablonu', type: 'story', color: 'from-pink-500 to-purple-500' },
                { name: 'Post Şablonu', type: 'post', color: 'from-blue-500 to-cyan-500' },
                { name: 'Reel Kapağı', type: 'reel', color: 'from-orange-500 to-red-500' },
                { name: 'Quote Kart', type: 'quote', color: 'from-green-500 to-emerald-500' },
                { name: 'Ürün Showcase', type: 'product', color: 'from-purple-500 to-pink-500' },
                { name: 'Duyuru Banner', type: 'announcement', color: 'from-yellow-500 to-orange-500' }
              ].map((template, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-xl cursor-pointer overflow-hidden"
                >
                  <div className={`w-full h-full bg-gradient-to-br ${template.color} p-4 flex items-end`}>
                    <div className="text-white">
                      <div className="text-sm font-medium">{template.name}</div>
                      <div className="text-xs opacity-80 capitalize">{template.type}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Mobile Content */}
          <div className="p-6 bg-surface border border-border rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Son Mobil İçerikler</h3>
              <button className="text-primary hover:text-primary/80 text-sm">Tümünü Gör →</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: '1',
                  title: 'Instagram Story - Ürün Lansmanı',
                  type: 'Story',
                  platform: 'Instagram',
                  createdAt: '2 saat önce',
                  thumbnail: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                  status: 'published'
                },
                {
                  id: '2',
                  title: 'LinkedIn Post - Başarı Hikayesi',
                  type: 'Post',
                  platform: 'LinkedIn',
                  createdAt: '4 saat önce',
                  thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                  status: 'draft'
                },
                {
                  id: '3',
                  title: 'TikTok Video - Behind The Scenes',
                  type: 'Video',
                  platform: 'TikTok',
                  createdAt: '6 saat önce',
                  thumbnail: 'https://images.pexels.com/photos/3183164/pexels-photo-3183164.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                  status: 'scheduled'
                }
              ].map((content) => (
                <div key={content.id} className="p-4 bg-background/30 rounded-xl">
                  <div className="relative mb-3">
                    <img
                      src={content.thumbnail}
                      alt={content.title}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        content.status === 'published' ? 'bg-success/20 text-success' :
                        content.status === 'scheduled' ? 'bg-secondary/20 text-secondary' :
                        'bg-warning/20 text-warning'
                      }`}>
                        {content.status === 'published' ? 'Yayınlandı' :
                         content.status === 'scheduled' ? 'Zamanlandı' : 'Taslak'}
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="text-white font-medium mb-1 text-sm">{content.title}</h4>
                  <div className="flex items-center justify-between text-xs text-textSecondary">
                    <span>{content.platform} • {content.type}</span>
                    <span>{content.createdAt}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-3">
                    <button className="flex-1 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-all text-xs">
                      Düzenle
                    </button>
                    <button className="p-2 bg-background/50 text-textSecondary hover:text-white rounded-lg transition-all">
                      <Share2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Content Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-surface border border-border rounded-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Camera className="w-6 h-6 text-primary" />
                <h4 className="text-lg font-semibold text-white">Bu Ay Çekilen</h4>
              </div>
              <div className="text-3xl font-bold text-white mb-2">247</div>
              <div className="text-textSecondary text-sm">fotoğraf ve video</div>
              <div className="text-success text-sm mt-1">+34% önceki aya göre</div>
            </div>
            
            <div className="p-6 bg-surface border border-border rounded-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Upload className="w-6 h-6 text-secondary" />
                <h4 className="text-lg font-semibold text-white">Yükleme Oranı</h4>
              </div>
              <div className="text-3xl font-bold text-white mb-2">94%</div>
              <div className="text-textSecondary text-sm">başarılı yükleme</div>
              <div className="text-success text-sm mt-1">+2% önceki aya göre</div>
            </div>
            
            <div className="p-6 bg-surface border border-border rounded-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-accent" />
                <h4 className="text-lg font-semibold text-white">Ort. İşlem Süresi</h4>
              </div>
              <div className="text-3xl font-bold text-white mb-2">3.2dk</div>
              <div className="text-textSecondary text-sm">oluşturma-yayın</div>
              <div className="text-success text-sm mt-1">-45sn önceki aya göre</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
