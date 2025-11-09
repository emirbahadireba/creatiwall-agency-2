import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Users,
  Eye,
  Heart,
  Share2,
  DollarSign,
  Target,
  Calendar,
  Download,
  Filter
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const monthlyData = [
  { month: 'Oca', reach: 125000, engagement: 8500, conversions: 450, revenue: 45000 },
  { month: 'Şub', reach: 142000, engagement: 9200, conversions: 520, revenue: 52000 },
  { month: 'Mar', reach: 158000, engagement: 11200, conversions: 680, revenue: 61000 },
  { month: 'Nis', reach: 135000, engagement: 8900, conversions: 590, revenue: 58000 },
  { month: 'May', reach: 176000, engagement: 12500, conversions: 750, revenue: 67000 },
  { month: 'Haz', reach: 198000, engagement: 14200, conversions: 820, revenue: 74000 },
]

const platformData = [
  { name: 'Instagram', value: 35, color: '#E1306C' },
  { name: 'Facebook', value: 28, color: '#1877F2' },
  { name: 'TikTok', value: 22, color: '#000000' },
  { name: 'YouTube', value: 10, color: '#FF0000' },
  { name: 'LinkedIn', value: 5, color: '#0077B5' }
]

const campaignPerformance = [
  { name: 'Nike Yaz Koleksiyonu', reach: 125000, engagement: 8.5, conversions: 350, roi: 285 },
  { name: 'Starbucks Yılbaşı', reach: 85000, engagement: 12.3, conversions: 280, roi: 320 },
  { name: 'Samsung Galaxy S25', reach: 200000, engagement: 6.8, conversions: 420, roi: 245 },
  { name: 'Coca-Cola Gençlik', reach: 60000, engagement: 15.2, conversions: 95, roi: 180 }
]

export default function Analytics() {
  const [dateRange, setDateRange] = useState('6m')
  const [selectedMetric, setSelectedMetric] = useState('reach')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Analitik
          </h1>
          <p className="text-textSecondary mt-1">Kampanya performansı ve detaylı analiz raporları</p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-field"
          >
            <option value="1m">Son 1 Ay</option>
            <option value="3m">Son 3 Ay</option>
            <option value="6m">Son 6 Ay</option>
            <option value="1y">Son 1 Yıl</option>
          </select>
          <button className="btn-secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filtrele
          </button>
          <button className="btn-primary">
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card group hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Toplam Erişim</p>
              <p className="text-3xl font-bold text-text mt-2">1.2M</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-success text-sm font-medium">+15.3%</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl group-hover:scale-110 transition-transform">
              <Eye className="w-6 h-6 text-primary" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card group hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Etkileşim Oranı</p>
              <p className="text-3xl font-bold text-text mt-2">9.8%</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-success text-sm font-medium">+2.1%</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 text-accent" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card group hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Dönüşüm Oranı</p>
              <p className="text-3xl font-bold text-text mt-2">3.2%</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-success text-sm font-medium">+0.8%</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-r from-success/20 to-secondary/20 rounded-xl group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-success" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card group hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">ROI</p>
              <p className="text-3xl font-bold text-text mt-2">285%</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-success text-sm font-medium">+23%</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-xl group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text">Performans Trendi</h3>
            <div className="flex gap-2">
              {[
                { key: 'reach', label: 'Erişim' },
                { key: 'engagement', label: 'Etkileşim' },
                { key: 'conversions', label: 'Dönüşüm' },
                { key: 'revenue', label: 'Gelir' }
              ].map(metric => (
                <button
                  key={metric.key}
                  onClick={() => setSelectedMetric(metric.key)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    selectedMetric === metric.key
                      ? 'bg-primary text-white'
                      : 'text-textSecondary hover:text-text hover:bg-surface'
                  }`}
                >
                  {metric.label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey={selectedMetric}
                  stroke="#9E7FFF"
                  fillOpacity={1}
                  fill="url(#metricGradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Platform Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="text-xl font-semibold text-text mb-6">Platform Dağılımı</h3>
          <div className="flex items-center justify-center h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
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
          <div className="space-y-3">
            {platformData.map((platform) => (
              <div key={platform.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: platform.color }}
                  ></div>
                  <span className="text-sm text-textSecondary">{platform.name}</span>
                </div>
                <span className="text-sm font-medium text-text">{platform.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Campaign Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text">Kampanya Performansı</h3>
          <button className="text-primary hover:text-secondary font-medium">
            Detaylı Rapor →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left py-3 px-4 text-textSecondary font-medium">Kampanya</th>
                <th className="text-left py-3 px-4 text-textSecondary font-medium">Erişim</th>
                <th className="text-left py-3 px-4 text-textSecondary font-medium">Etkileşim</th>
                <th className="text-left py-3 px-4 text-textSecondary font-medium">Dönüşüm</th>
                <th className="text-left py-3 px-4 text-textSecondary font-medium">ROI</th>
              </tr>
            </thead>
            <tbody>
              {campaignPerformance.map((campaign, index) => (
                <tr key={index} className="border-b border-border/20 hover:bg-surface/50 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-medium text-text">{campaign.name}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-text">{campaign.reach.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-text">{campaign.engagement}%</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-text">{campaign.conversions}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${
                      campaign.roi >= 250 ? 'text-success' : 
                      campaign.roi >= 200 ? 'text-warning' : 'text-error'
                    }`}>
                      {campaign.roi}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
