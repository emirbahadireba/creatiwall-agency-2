import React, { useState } from 'react'
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, Database, Key, Mail, Phone, Building, Camera, Save, Eye, EyeOff, Check, X } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  title: string
  company: string
  avatar: string
  bio: string
}

interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  projectUpdates: boolean
  clientMessages: boolean
  deadlineReminders: boolean
  teamMentions: boolean
  weeklyReports: boolean
}

interface SecuritySettings {
  twoFactorAuth: boolean
  sessionTimeout: number
  passwordExpiry: number
  loginNotifications: boolean
}

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system'
  language: string
  timeFormat: '12h' | '24h'
  dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD'
  timezone: string
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet.yilmaz@ajans.com',
    phone: '+90 532 123 45 67',
    title: 'Proje Yöneticisi',
    company: 'Digital Ajans',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Deneyimli dijital pazarlama uzmanı ve proje yöneticisi. 5+ yıl sosyal medya ajansı tecrübesi.'
  })

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    projectUpdates: true,
    clientMessages: true,
    deadlineReminders: true,
    teamMentions: true,
    weeklyReports: false
  })

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: 24,
    passwordExpiry: 90,
    loginNotifications: true
  })

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: 'dark',
    language: 'tr',
    timeFormat: '24h',
    dateFormat: 'DD/MM/YYYY',
    timezone: 'Europe/Istanbul'
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'security', label: 'Güvenlik', icon: Shield },
    { id: 'appearance', label: 'Görünüm', icon: Palette },
    { id: 'integration', label: 'Entegrasyonlar', icon: Database }
  ]

  const handleSave = (section: string) => {
    toast.success(`${section} ayarları kaydedildi!`)
  }

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Yeni şifreler eşleşmiyor!')
      return
    }
    if (passwordForm.newPassword.length < 8) {
      toast.error('Şifre en az 8 karakter olmalıdır!')
      return
    }
    toast.success('Şifre başarıyla güncellendi!')
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleAvatarUpload = () => {
    toast.success('Profil fotoğrafı güncellendi!')
  }

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean, onChange: (value: boolean) => void }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${enabled ? 'bg-primary' : 'bg-border'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${enabled ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Ayarlar</h1>
          <p className="text-textSecondary text-lg">
            Hesap ayarlarınızı ve tercihlerinizi yönetin
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="card p-4 sticky top-24">
            <nav className="space-y-2">
              {tabs.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors
                      ${activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-textSecondary hover:text-text hover:bg-surface'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3"
        >
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-text">Profil Bilgileri</h2>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSave('Profil')}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Kaydet
                  </motion.button>
                </div>

                <div className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={profile.avatar}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-border"
                      />
                      <button
                        onClick={handleAvatarUpload}
                        className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text">Profil Fotoğrafı</h3>
                      <p className="text-textSecondary text-sm">JPG, PNG formatında, maksimum 5MB</p>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Ad</label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                        className="input-field w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Soyad</label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                        className="input-field w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        E-posta
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="input-field w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="input-field w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Ünvan</label>
                      <input
                        type="text"
                        value={profile.title}
                        onChange={(e) => setProfile({...profile, title: e.target.value})}
                        className="input-field w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">
                        <Building className="w-4 h-4 inline mr-1" />
                        Şirket
                      </label>
                      <input
                        type="text"
                        value={profile.company}
                        onChange={(e) => setProfile({...profile, company: e.target.value})}
                        className="input-field w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Biyografi</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="input-field w-full h-24 resize-none"
                      placeholder="Kendinizi kısaca tanıtın..."
                    />
                  </div>
                </div>
              </div>

              {/* Change Password */}
              <div className="card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-text">Şifre Değiştir</h2>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePasswordChange}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Key className="w-4 h-4" />
                    Şifreyi Güncelle
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Mevcut Şifre</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                        className="input-field w-full pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-textSecondary hover:text-text"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Yeni Şifre</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                        className="input-field w-full pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-textSecondary hover:text-text"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Yeni Şifre (Tekrar)</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                        className="input-field w-full pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-textSecondary hover:text-text"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-text">Bildirim Ayarları</h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSave('Bildirim')}
                  className="btn-primary flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Kaydet
                </motion.button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <div>
                    <h3 className="text-lg font-medium text-text">E-posta Bildirimleri</h3>
                    <p className="text-textSecondary">Önemli güncellemeler için e-posta alın</p>
                  </div>
                  <ToggleSwitch
                    enabled={notifications.emailNotifications}
                    onChange={(value) => setNotifications({...notifications, emailNotifications: value})}
                  />
                </div>

                <div className="flex items-center justify-between py-4 border-b border-border">
                  <div>
                    <h3 className="text-lg font-medium text-text">Push Bildirimleri</h3>
                    <p className="text-textSecondary">Tarayıcı bildirimleri alın</p>
                  </div>
                  <ToggleSwitch
                    enabled={notifications.pushNotifications}
                    onChange={(value) => setNotifications({...notifications, pushNotifications: value})}
                  />
                </div>

                <div className="flex items-center justify-between py-4 border-b border-border">
                  <div>
                    <h3 className="text-lg font-medium text-text">Proje Güncellemeleri</h3>
                    <p className="text-textSecondary">Proje durumu değişikliklerinde bildirim alın</p>
                  </div>
                  <ToggleSwitch
                    enabled={notifications.projectUpdates}
                    onChange={(value) => setNotifications({...notifications, projectUpdates: value})}
                  />
                </div>

                <div className="flex items-center justify-between py-4 border-b border-border">
                  <div>
                    <h3 className="text-lg font-medium text-text">Müşteri Mesajları</h3>
                    <p className="text-textSecondary">Yeni müşteri mesajları için bildirim alın</p>
                  </div>
                  <ToggleSwitch
                    enabled={notifications.clientMessages}
                    onChange={(value) => setNotifications({...notifications, clientMessages: value})}
                  />
                </div>

                <div className="flex items-center justify-between py-4 border-b border-border">
                  <div>
                    <h3 className="text-lg font-medium text-text">Deadline Hatırlatmaları</h3>
                    <p className="text-textSecondary">Proje teslim tarihlerinden önce hatırlatma alın</p>
                  </div>
                  <ToggleSwitch
                    enabled={notifications.deadlineReminders}
                    onChange={(value) => setNotifications({...notifications, deadlineReminders: value})}
                  />
                </div>

                <div className="flex items-center justify-between py-4 border-b border-border">
                  <div>
                    <h3 className="text-lg font-medium text-text">Takım Etiketlemeleri</h3>
                    <p className="text-textSecondary">Takım üyelerinin sizi etiketlediğinde bildirim alın</p>
                  </div>
                  <ToggleSwitch
                    enabled={notifications.teamMentions}
                    onChange={(value) => setNotifications({...notifications, teamMentions: value})}
                  />
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="text-lg font-medium text-text">Haftalık Raporlar</h3>
                    <p className="text-textSecondary">Haftalık proje özetleri alın</p>
                  </div>
                  <ToggleSwitch
                    enabled={notifications.weeklyReports}
                    onChange={(value) => setNotifications({...notifications, weeklyReports: value})}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-text">Güvenlik Ayarları</h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSave('Güvenlik')}
                  className="btn-primary flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Kaydet
                </motion.button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <div>
                    <h3 className="text-lg font-medium text-text">İki Faktörlü Kimlik Doğrulama</h3>
                    <p className="text-textSecondary">Hesabınızı ekstra koruma altına alın</p>
                  </div>
                  <ToggleSwitch
                    enabled={security.twoFactorAuth}
                    onChange={(value) => setSecurity({...security, twoFactorAuth: value})}
                  />
                </div>

                <div className="py-4 border-b border-border">
                  <h3 className="text-lg font-medium text-text mb-2">Oturum Zaman Aşımı</h3>
                  <p className="text-textSecondary mb-4">Oturum otomatik kapatılma süresi (saat)</p>
                  <select
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity({...security, sessionTimeout: Number(e.target.value)})}
                    className="input-field w-full"
                  >
                    <option value={1}>1 Saat</option>
                    <option value={8}>8 Saat</option>
                    <option value={24}>24 Saat</option>
                    <option value={72}>3 Gün</option>
                    <option value={168}>1 Hafta</option>
                  </select>
                </div>

                <div className="py-4 border-b border-border">
                  <h3 className="text-lg font-medium text-text mb-2">Şifre Geçerlilik Süresi</h3>
                  <p className="text-textSecondary mb-4">Şifre değiştirme hatırlatma periyodu (gün)</p>
                  <select
                    value={security.passwordExpiry}
                    onChange={(e) => setSecurity({...security, passwordExpiry: Number(e.target.value)})}
                    className="input-field w-full"
                  >
                    <option value={30}>30 Gün</option>
                    <option value={60}>60 Gün</option>
                    <option value={90}>90 Gün</option>
                    <option value={180}>6 Ay</option>
                    <option value={365}>1 Yıl</option>
                  </select>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="text-lg font-medium text-text">Giriş Bildirimleri</h3>
                    <p className="text-textSecondary">Hesabınıza giriş yapıldığında bildirim alın</p>
                  </div>
                  <ToggleSwitch
                    enabled={security.loginNotifications}
                    onChange={(value) => setSecurity({...security, loginNotifications: value})}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-text">Görünüm Ayarları</h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSave('Görünüm')}
                  className="btn-primary flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Kaydet
                </motion.button>
              </div>

              <div className="space-y-6">
                <div className="py-4 border-b border-border">
                  <h3 className="text-lg font-medium text-text mb-2">Tema</h3>
                  <p className="text-textSecondary mb-4">Arayüz temasını seçin</p>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'light', label: 'Açık' },
                      { value: 'dark', label: 'Koyu' },
                      { value: 'system', label: 'Sistem' }
                    ].map(theme => (
                      <button
                        key={theme.value}
                        onClick={() => setAppearance({...appearance, theme: theme.value as any})}
                        className={`
                          p-4 rounded-lg border-2 transition-colors
                          ${appearance.theme === theme.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                          }
                        `}
                      >
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="py-4 border-b border-border">
                  <h3 className="text-lg font-medium text-text mb-2">Dil</h3>
                  <p className="text-textSecondary mb-4">Arayüz dilini seçin</p>
                  <select
                    value={appearance.language}
                    onChange={(e) => setAppearance({...appearance, language: e.target.value})}
                    className="input-field w-full"
                  >
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="py-4 border-b border-border">
                  <h3 className="text-lg font-medium text-text mb-2">Saat Formatı</h3>
                  <p className="text-textSecondary mb-4">Saat gösterim formatını seçin</p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '12h', label: '12 Saat (AM/PM)' },
                      { value: '24h', label: '24 Saat' }
                    ].map(format => (
                      <button
                        key={format.value}
                        onClick={() => setAppearance({...appearance, timeFormat: format.value as any})}
                        className={`
                          p-4 rounded-lg border-2 transition-colors
                          ${appearance.timeFormat === format.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                          }
                        `}
                      >
                        {format.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="py-4 border-b border-border">
                  <h3 className="text-lg font-medium text-text mb-2">Tarih Formatı</h3>
                  <p className="text-textSecondary mb-4">Tarih gösterim formatını seçin</p>
                  <select
                    value={appearance.dateFormat}
                    onChange={(e) => setAppearance({...appearance, dateFormat: e.target.value as any})}
                    className="input-field w-full"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="py-4">
                  <h3 className="text-lg font-medium text-text mb-2">Saat Dilimi</h3>
                  <p className="text-textSecondary mb-4">Saat dilimini seçin</p>
                  <select
                    value={appearance.timezone}
                    onChange={(e) => setAppearance({...appearance, timezone: e.target.value})}
                    className="input-field w-full"
                  >
                    <option value="Europe/Istanbul">İstanbul</option>
                    <option value="Europe/London">Londra</option>
                    <option value="America/New_York">New York</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integration' && (
            <div className="space-y-6">
              <div className="card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-text">Sosyal Medya Entegrasyonları</h2>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSave('Entegrasyon')}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Kaydet
                  </motion.button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">f</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-text">Facebook</h3>
                        <p className="text-textSecondary">Facebook sayfalarını yönetin</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-success text-sm flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Bağlı
                      </span>
                      <button className="btn-secondary">Ayarlar</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">ig</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-text">Instagram</h3>
                        <p className="text-textSecondary">Instagram hesaplarını yönetin</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-success text-sm flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Bağlı
                      </span>
                      <button className="btn-secondary">Ayarlar</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">t</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-text">Twitter</h3>
                        <p className="text-textSecondary">Twitter hesaplarını yönetin</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-textSecondary text-sm flex items-center gap-1">
                        <X className="w-4 h-4" />
                        Bağlı değil
                      </span>
                      <button className="btn-primary">Bağla</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">in</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-text">LinkedIn</h3>
                        <p className="text-textSecondary">LinkedIn sayfalarını yönetin</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-textSecondary text-sm flex items-center gap-1">
                        <X className="w-4 h-4" />
                        Bağlı değil
                      </span>
                      <button className="btn-primary">Bağla</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">yt</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-text">YouTube</h3>
                        <p className="text-textSecondary">YouTube kanallarını yönetin</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-textSecondary text-sm flex items-center gap-1">
                        <X className="w-4 h-4" />
                        Bağlı değil
                      </span>
                      <button className="btn-primary">Bağla</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-8">
                <h2 className="text-2xl font-semibold text-text mb-6">Üçüncü Taraf Uygulamalar</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">S</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-text">Slack</h3>
                        <p className="text-textSecondary">Takım iletişimi için Slack entegrasyonu</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-success text-sm flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Bağlı
                      </span>
                      <button className="btn-secondary">Ayarlar</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">Z</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-text">Zapier</h3>
                        <p className="text-textSecondary">Otomatizasyon için Zapier bağlantısı</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-textSecondary text-sm flex items-center gap-1">
                        <X className="w-4 h-4" />
                        Bağlı değil
                      </span>
                      <button className="btn-primary">Bağla</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">G</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-text">Google Analytics</h3>
                        <p className="text-textSecondary">Web analitikleri için GA entegrasyonu</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-success text-sm flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Bağlı
                      </span>
                      <button className="btn-secondary">Ayarlar</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">D</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-text">Dropbox</h3>
                        <p className="text-textSecondary">Dosya depolama için Dropbox bağlantısı</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-textSecondary text-sm flex items-center gap-1">
                        <X className="w-4 h-4" />
                        Bağlı değil
                      </span>
                      <button className="btn-primary">Bağla</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Settings
