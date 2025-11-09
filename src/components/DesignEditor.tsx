import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Palette, 
  Type, 
  Image, 
  Square, 
  Circle, 
  Triangle,
  Download,
  Save,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Move,
  RotateCcw,
  Trash2,
  Copy,
  Layers,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Star,
  Crown,
  Sparkles,
  Zap,
  ChevronDown,
  Monitor,
  Smartphone,
  Square as SquareIcon
} from 'lucide-react'

interface DesignElement {
  id: string
  type: 'text' | 'shape' | 'image'
  x: number
  y: number
  width: number
  height: number
  rotation: number
  content?: string
  fontSize?: number
  fontFamily?: string
  fontWeight?: string
  color?: string
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  opacity: number
  visible: boolean
  locked: boolean
  src?: string
  borderRadius?: number
}

interface TemplateSize {
  name: string
  width: number
  height: number
  icon: React.ComponentType<any>
  category: string
}

interface Template {
  id: string
  name: string
  category: string
  thumbnail: string
  sizes: TemplateSize[]
  getElements: (size: TemplateSize) => Omit<DesignElement, 'id'>[]
  tags: string[]
  premium?: boolean
}

const templateSizes: TemplateSize[] = [
  { name: 'Instagram Post', width: 1080, height: 1080, icon: SquareIcon, category: 'Social Media' },
  { name: 'Instagram Story', width: 1080, height: 1920, icon: Smartphone, category: 'Social Media' },
  { name: 'LinkedIn Post', width: 1200, height: 1200, icon: SquareIcon, category: 'Professional' },
  { name: 'Facebook Cover', width: 1200, height: 630, icon: Monitor, category: 'Social Media' },
  { name: 'Twitter Header', width: 1500, height: 500, icon: Monitor, category: 'Social Media' },
  { name: 'YouTube Thumbnail', width: 1280, height: 720, icon: Monitor, category: 'Video' },
  { name: 'A4 Print', width: 2480, height: 3508, icon: Square, category: 'Print' },
  { name: 'Web Banner', width: 1920, height: 600, icon: Monitor, category: 'Web' }
]

const templates: Template[] = [
  {
    id: 'promo-template',
    name: 'Modern Promosyon',
    category: 'Promosyon',
    thumbnail: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    tags: ['promosyon', 'modern', 'satış', 'indirim'],
    sizes: templateSizes,
    getElements: (size) => {
      const isVertical = size.height > size.width
      const isWide = size.width / size.height > 1.5
      
      return [
        {
          type: 'shape',
          x: 0,
          y: 0,
          width: size.width,
          height: size.height,
          rotation: 0,
          backgroundColor: '#9E7FFF',
          opacity: 1,
          visible: true,
          locked: false,
          content: 'rectangle',
          borderRadius: 0
        },
        {
          type: 'shape',
          x: size.width * 0.05,
          y: isVertical ? size.height * 0.1 : size.height * 0.08,
          width: size.width * 0.9,
          height: isVertical ? size.height * 0.4 : size.height * 0.7,
          rotation: 0,
          backgroundColor: '#FFFFFF',
          opacity: 0.95,
          visible: true,
          locked: false,
          content: 'rectangle',
          borderRadius: 20
        },
        {
          type: 'text',
          x: size.width * 0.1,
          y: isVertical ? size.height * 0.18 : size.height * 0.15,
          width: size.width * 0.8,
          height: isVertical ? size.height * 0.08 : size.height * 0.15,
          rotation: 0,
          content: '%50 İNDİRİM',
          fontSize: Math.min(size.width, size.height) * 0.06,
          fontFamily: 'Inter',
          fontWeight: 'bold',
          color: '#9E7FFF',
          opacity: 1,
          visible: true,
          locked: false
        },
        {
          type: 'text',
          x: size.width * 0.1,
          y: isVertical ? size.height * 0.28 : size.height * 0.35,
          width: size.width * 0.8,
          height: isVertical ? size.height * 0.06 : size.height * 0.12,
          rotation: 0,
          content: 'Tüm Ürünlerde Büyük Fırsat!',
          fontSize: Math.min(size.width, size.height) * 0.032,
          fontFamily: 'Inter',
          fontWeight: 'normal',
          color: '#171717',
          opacity: 1,
          visible: true,
          locked: false
        },
        {
          type: 'text',
          x: size.width * 0.1,
          y: isVertical ? size.height * 0.38 : size.height * 0.52,
          width: size.width * 0.8,
          height: isVertical ? size.height * 0.04 : size.height * 0.08,
          rotation: 0,
          content: 'Sınırlı süre - Hemen sipariş verin!',
          fontSize: Math.min(size.width, size.height) * 0.024,
          fontFamily: 'Inter',
          fontWeight: 'normal',
          color: '#666666',
          opacity: 1,
          visible: true,
          locked: false
        },
        {
          type: 'shape',
          x: size.width * 0.25,
          y: isVertical ? size.height * 0.75 : size.height * 0.72,
          width: size.width * 0.5,
          height: isVertical ? size.height * 0.08 : size.height * 0.15,
          rotation: 0,
          backgroundColor: '#171717',
          opacity: 1,
          visible: true,
          locked: false,
          content: 'rectangle',
          borderRadius: isVertical ? size.height * 0.04 : size.height * 0.075
        },
        {
          type: 'text',
          x: size.width * 0.28,
          y: isVertical ? size.height * 0.77 : size.height * 0.745,
          width: size.width * 0.44,
          height: isVertical ? size.height * 0.04 : size.height * 0.08,
          rotation: 0,
          content: 'SATIN AL',
          fontSize: Math.min(size.width, size.height) * 0.028,
          fontFamily: 'Inter',
          fontWeight: 'bold',
          color: '#FFFFFF',
          opacity: 1,
          visible: true,
          locked: false
        }
      ]
    }
  },
  {
    id: 'quote-template',
    name: 'İlham Verici Söz',
    category: 'Quote',
    thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    tags: ['quote', 'motivasyon', 'minimal', 'söz'],
    sizes: templateSizes,
    getElements: (size) => {
      const isVertical = size.height > size.width
      
      return [
        {
          type: 'shape',
          x: 0,
          y: 0,
          width: size.width,
          height: size.height,
          rotation: 0,
          backgroundColor: '#f472b6',
          opacity: 1,
          visible: true,
          locked: false,
          content: 'rectangle'
        },
        {
          type: 'text',
          x: size.width * 0.1,
          y: isVertical ? size.height * 0.3 : size.height * 0.25,
          width: size.width * 0.8,
          height: isVertical ? size.height * 0.25 : size.height * 0.35,
          rotation: 0,
          content: '"Başarı, hazırlık ile fırsatın buluşmasıdır."',
          fontSize: Math.min(size.width, size.height) * 0.04,
          fontFamily: 'Inter',
          fontWeight: 'bold',
          color: '#FFFFFF',
          opacity: 1,
          visible: true,
          locked: false
        },
        {
          type: 'text',
          x: size.width * 0.1,
          y: isVertical ? size.height * 0.6 : size.height * 0.65,
          width: size.width * 0.8,
          height: isVertical ? size.height * 0.06 : size.height * 0.1,
          rotation: 0,
          content: '— Seneca',
          fontSize: Math.min(size.width, size.height) * 0.025,
          fontFamily: 'Inter',
          fontWeight: 'normal',
          color: '#FFFFFF',
          opacity: 0.8,
          visible: true,
          locked: false
        }
      ]
    }
  },
  {
    id: 'tips-template',
    name: 'İpuçları Serisi',
    category: 'Eğitim',
    thumbnail: 'https://images.pexels.com/photos/3183164/pexels-photo-3183164.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    tags: ['tips', 'eğitim', 'ipuçları', 'öğrenme'],
    premium: true,
    sizes: templateSizes,
    getElements: (size) => {
      const isVertical = size.height > size.width
      const circleSize = Math.min(size.width, size.height) * 0.08
      
      return [
        {
          type: 'shape',
          x: 0,
          y: 0,
          width: size.width,
          height: size.height,
          rotation: 0,
          backgroundColor: '#38bdf8',
          opacity: 1,
          visible: true,
          locked: false,
          content: 'rectangle'
        },
        {
          type: 'shape',
          x: size.width * 0.05,
          y: isVertical ? size.height * 0.12 : size.height * 0.15,
          width: circleSize,
          height: circleSize,
          rotation: 0,
          backgroundColor: '#FFFFFF',
          opacity: 1,
          visible: true,
          locked: false,
          content: 'circle'
        },
        {
          type: 'text',
          x: size.width * 0.05 + circleSize * 0.35,
          y: isVertical ? size.height * 0.12 + circleSize * 0.25 : size.height * 0.15 + circleSize * 0.25,
          width: circleSize * 0.3,
          height: circleSize * 0.5,
          rotation: 0,
          content: '1',
          fontSize: circleSize * 0.5,
          fontFamily: 'Inter',
          fontWeight: 'bold',
          color: '#38bdf8',
          opacity: 1,
          visible: true,
          locked: false
        },
        {
          type: 'text',
          x: size.width * 0.05 + circleSize * 1.3,
          y: isVertical ? size.height * 0.1 : size.height * 0.12,
          width: size.width * 0.85,
          height: isVertical ? size.height * 0.08 : size.height * 0.12,
          rotation: 0,
          content: 'İPUCU #1',
          fontSize: Math.min(size.width, size.height) * 0.055,
          fontFamily: 'Inter',
          fontWeight: 'bold',
          color: '#FFFFFF',
          opacity: 1,
          visible: true,
          locked: false
        },
        {
          type: 'text',
          x: size.width * 0.1,
          y: isVertical ? size.height * 0.28 : size.height * 0.35,
          width: size.width * 0.8,
          height: isVertical ? size.height * 0.3 : size.height * 0.4,
          rotation: 0,
          content: 'Sosyal medyada tutarlılık anahtardır. Her gün aynı saatte paylaşım yapın ve takipçilerinizle düzenli etkileşimde bulunun.',
          fontSize: Math.min(size.width, size.height) * 0.032,
          fontFamily: 'Inter',
          fontWeight: 'normal',
          color: '#FFFFFF',
          opacity: 1,
          visible: true,
          locked: false
        },
        {
          type: 'text',
          x: size.width * 0.1,
          y: isVertical ? size.height * 0.85 : size.height * 0.8,
          width: size.width * 0.8,
          height: isVertical ? size.height * 0.06 : size.height * 0.1,
          rotation: 0,
          content: 'Daha fazlası için takipte kalın! 👆',
          fontSize: Math.min(size.width, size.height) * 0.025,
          fontFamily: 'Inter',
          fontWeight: 'normal',
          color: '#FFFFFF',
          opacity: 0.9,
          visible: true,
          locked: false
        }
      ]
    }
  },
  {
    id:'product-template',
    name: 'Ürün Tanıtımı',
    category: 'Ürün',
    thumbnail: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    tags: ['ürün', 'tanıtım', 'satış', 'showcase'],
    sizes: templateSizes,
    getElements: (size) => {
      const isVertical = size.height > size.width
      
      return [
        {
          type: 'shape',
          x: 0,
          y: 0,
          width: size.width,
          height: size.height,
          rotation: 0,
          backgroundColor: '#171717',
          opacity: 1,
          visible: true,
          locked: false,
          content: 'rectangle'
        },
        {
          type: 'shape',
          x: size.width * 0.1,
          y: isVertical ? size.height * 0.2 : size.height * 0.15,
          width: size.width * 0.8,
          height: isVertical ? size.height * 0.4 : size.height * 0.6,
          rotation: 0,
          backgroundColor: '#9E7FFF',
          opacity: 0.2,
          visible: true,
          locked: false,
          content: 'rectangle',
          borderRadius: 30
        },
        {
          type: 'text',
          x: size.width * 0.1,
          y: isVertical ? size.height * 0.08 : size.height * 0.05,
          width: size.width * 0.8,
          height: isVertical ? size.height * 0.06 : size.height * 0.08,
          rotation: 0,
          content: 'YENİ ÜRÜN',
          fontSize: Math.min(size.width, size.height) * 0.045,
          fontFamily: 'Inter',
          fontWeight: 'bold',
          color: '#9E7FFF',
          opacity: 1,
          visible: true,
          locked: false
        },
        {
          type: 'text',
          x: size.width * 0.15,
          y: isVertical ? size.height * 0.25 : size.height * 0.22,
          width: size.width * 0.7,
          height: isVertical ? size.height * 0.08 : size.height * 0.12,
          rotation: 0,
          content: 'Premium Kulaklık',
          fontSize: Math.min(size.width, size.height) * 0.05,
          fontFamily: 'Inter',
          fontWeight: 'bold',
          color: '#FFFFFF',
          opacity: 1,
          visible: true,
          locked: false
        },
        {
          type: 'text',
          x: size.width * 0.15,
          y: isVertical ? size.height * 0.35 : size.height * 0.38,
          width: size.width * 0.7,
          height: isVertical ? size.height * 0.2 : size.height * 0.25,
          rotation: 0,
          content: '• Kablosuz bağlantı\n• 48 saat pil ömrü\n• Gürültü engelleme\n• Su geçirmez',
          fontSize: Math.min(size.width, size.height) * 0.025,
          fontFamily: 'Inter',
          fontWeight: 'normal',
          color: '#FFFFFF',
          opacity: 0.9,
          visible: true,
          locked: false
        },
        {
          type: 'text',
          x: size.width * 0.1,
          y: isVertical ? size.height * 0.68 : size.height * 0.7,
          width: size.width * 0.8,
          height: isVertical ? size.height * 0.08 : size.height * 0.12,
          rotation: 0,
          content: '₺899',
          fontSize: Math.min(size.width, size.height) * 0.06,
          fontFamily: 'Inter',
          fontWeight: 'bold',
          color: '#f472b6',
          opacity: 1,
          visible: true,
          locked: false
        },
        {
          type: 'text',
          x: size.width * 0.1,
          y: isVertical ? size.height * 0.88 : size.height * 0.85,
          width: size.width * 0.8,
          height: isVertical ? size.height * 0.06 : size.height * 0.08,
          rotation: 0,
          content: 'Şimdi sipariş ver! 👆',
          fontSize: Math.min(size.width, size.height) * 0.022,
          fontFamily: 'Inter',
          fontWeight: 'normal',
          color: '#FFFFFF',
          opacity: 0.8,
          visible: true,
          locked: false
        }
      ]
    }
  },
  {
    id: 'professional-template',
    name: 'Profesyonel İçerik',
    category: 'Business',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    tags: ['linkedin', 'professional', 'business', 'analiz'],
    sizes: templateSizes,
    getElements: (size) => {
      const isVertical = size.height > size.width
      const headerHeight = isVertical ? size.height * 0.15 : size.height * 0.25
      
      return [
        {
          type: 'shape',
          x: 0,
          y: 0,
          width: size.width,
          height: size.height,
          rotation: 0,
          backgroundColor: '#FFFFFF',
          opacity: 1,
          visible: true,
          locked: false,
          content: 'rectangle'
        },
        {
          type: 'shape',
          x: 0,
          y: 0,
          width: size.width,
          height: headerHeight,
          rotation: 0,
          backgroundColor: '#0077b5',
          opacity: 1,
          visible: true,
          locked: false,
          content: 'rectangle'
        },
        {
          type: 'text',
          x: size.width * 0.08,
          y: headerHeight * 0.3,
          width: size.width * 0.84,
          height: headerHeight * 0.4,
          rotation: 0,
          content: 'SEKTÖR ANALİZİ',
          fontSize: Math.min(size.width, size.height) * 0.038,
          fontFamily: 'Inter',
          fontWeight: 'bold',
          color: '#FFFFFF',
          opacity: 1,
          visible: true,
          locked: false
        },
        {
          type: 'text',
          x: size.width * 0.08,
          y: headerHeight + size.height * 0.05,
          width: size.width * 0.84,
          height: isVertical ? size.height * 0.1 : size.height * 0.15,
          rotation: 0,
          content: '2024 Teknoloji Trendleri',
          fontSize: Math.min(size.width, size.height) * 0.042,
          fontFamily: 'Inter',
          fontWeight: 'bold',
          color: '#171717',
          opacity: 1,
          visible: true,
          locked: false
        },
        {
          type: 'shape',
          x: size.width * 0.08,
          y: headerHeight + size.height * 0.2,
          width: size.width * 0.06,
          height: size.width * 0.06,
          rotation: 0,
          backgroundColor: '#0077b5',
          opacity: 1,
          visible: true,
          locked: false,
          content: 'circle'
        },
        {
          type: 'text',
          x: size.width * 0.08 + size.width * 0.018,
          y: headerHeight + size.height * 0.2 + size.width * 0.015,
          width: size.width * 0.024,
          height: size.width * 0.03,
          rotation: 0,
          content: '1',
          fontSize: size.width * 0.024,
          fontFamily: 'Inter',
          fontWeight: 'bold',
          color: '#FFFFFF',
          opacity: 1,
          visible: true,
          locked: false
        },
        {
          type: 'text',
          x: size.width * 0.18,
          y: headerHeight + size.height * 0.18,
          width: size.width * 0.74,
          height: isVertical ? size.height * 0.08 : size.height * 0.12,
          rotation: 0,
          content: 'Yapay Zeka ve Otomasyon',
          fontSize: Math.min(size.width, size.height) * 0.032,
          fontFamily: 'Inter',
          fontWeight: 'bold',
          color: '#171717',
          opacity: 1,
          visible: true,
          locked: false
        },
        {
          type: 'text',
          x: size.width * 0.18,
          y: headerHeight + size.height * 0.25,
          width: size.width * 0.74,
          height: isVertical ? size.height * 0.06 : size.height * 0.08,
          rotation: 0,
          content: 'İş süreçlerinde %40 verimlilik artışı',
          fontSize: Math.min(size.width, size.height) * 0.022,
          fontFamily: 'Inter',
          fontWeight: 'normal',
          color: '#666666',
          opacity: 1,
          visible: true,
          locked: false
        },
        {
          type: 'text',
          x: size.width * 0.08,
          y: isVertical ? size.height * 0.8 : size.height * 0.75,
          width: size.width * 0.84,
          height: isVertical ? size.height * 0.06 : size.height * 0.08,
          rotation: 0,
          content: 'Detaylar için yorumlarda devamı... 👇',
          fontSize: Math.min(size.width, size.height) * 0.022,
          fontFamily: 'Inter',
          fontWeight: 'normal',
          color: '#0077b5',
          opacity: 1,
          visible: true,
          locked: false
        }
      ]
    }
  },
  {
    id: 'business-cover-template',
    name: 'İş Kapağı',
    category: 'Cover',
    thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    tags: ['facebook', 'cover', 'business', 'ajans'],
    premium: true,
    sizes: templateSizes,
    getElements: (size) => {
      const isVertical = size.height > size.width
      
      return [
        {
          type: 'shape',
          x: 0,
          y: 0,
          width: size.width,
          height: size.height,
          rotation: 0,
          backgroundColor: '#171717',
          opacity: 1,
          visible: true,
          locked: false,
          content: 'rectangle'
        },
        {
          type: 'shape',
          x: 0,
          y: 0,
          width: isVertical ? size.width : size.width * 0.5,
          height: size.height,
          rotation: 0,
          backgroundColor: '#9E7FFF',
          opacity: 0.1,
          visible: true,
          locked: false,
          content: 'rectangle'
        },
        {
          type: 'text',
          x: size.width * 0.08,
          y: isVertical ? size.height * 0.25 : size.height * 0.2,
          width: size.width * 0.84,
          height: isVertical ? size.height * 0.12 : size.height * 0.25,
          rotation: 0,
          content: 'CreativeHub Ajansı',
          fontSize: Math.min(size.width, size.height) * 0.055,
          fontFamily: 'Inter',
          fontWeight: 'bold',
          color: '#FFFFFF',
          opacity: 1,
          visible: true,
          locked: false
        },
        {
          type: 'text',
          x: size.width * 0.08,
          y: isVertical ? size.height * 0.4 : size.height * 0.5,
          width: size.width * 0.84,
          height: isVertical ? size.height * 0.08 : size.height * 0.15,
          rotation: 0,
          content: 'Dijital pazarlama ve yaratıcı çözümler',
          fontSize: Math.min(size.width, size.height) * 0.028,
          fontFamily: 'Inter',
          fontWeight: 'normal',
          color: '#9E7FFF',
          opacity: 1,
          visible: true,
          locked: false
        },
        {
          type: 'text',
          x: size.width * 0.08,
          y: isVertical ? size.height * 0.65 : size.height * 0.72,
          width: size.width * 0.84,
          height: isVertical ? size.height * 0.06 : size.height * 0.12,
          rotation: 0,
          content: '🚀 Markanızı dijital dünyada zirveye taşıyoruz',
          fontSize: Math.min(size.width, size.height) * 0.022,
          fontFamily: 'Inter',
          fontWeight: 'normal',
          color: '#FFFFFF',
          opacity: 0.8,
          visible: true,
          locked: false
        }
      ]
    }
  }
]

const templateCategories = [
  'Tümü',
  'Promosyon',
  'Quote',
  'Eğitim', 
  'Ürün',
  'Business',
  'Cover'
]

export const DesignEditor: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [selectedSize, setSelectedSize] = useState<TemplateSize | null>(null)
  const [showSizeSelection, setShowSizeSelection] = useState(false)
  const [elements, setElements] = useState<DesignElement[]>([])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [zoom, setZoom] = useState(50)
  const [activeTool, setActiveTool] = useState<'select' | 'text' | 'shape' | 'image'>('select')
  const [showTemplates, setShowTemplates] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [searchTerm, setSearchTerm] = useState('')
  const canvasRef = useRef<HTMLDivElement>(null)

  // Filter templates based on category and search
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'Tümü' || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
    setShowSizeSelection(true)
  }

  const loadTemplate = (template: Template, size: TemplateSize) => {
    const templateElements = template.getElements(size).map((element, index) => ({
      ...element,
      id: `template-${Date.now()}-${index}`
    }))
    
    setElements(templateElements)
    setSelectedTemplate(template)
    setSelectedSize(size)
    setShowTemplates(false)
    setShowSizeSelection(false)
    setSelectedElement(null)
  }

  const addTextElement = () => {
    const canvasWidth = selectedSize?.width || 1080
    const canvasHeight = selectedSize?.height || 1080
    
    const newElement: DesignElement = {
      id: Date.now().toString(),
      type: 'text',
      x: canvasWidth * 0.1,
      y: canvasHeight * 0.1,
      width: canvasWidth * 0.4,
      height: canvasHeight * 0.08,
      rotation: 0,
      content: 'Yeni Metin',
      fontSize: Math.min(canvasWidth, canvasHeight) * 0.024,
      fontFamily: 'Inter',
      fontWeight: 'normal',
      color: '#FFFFFF',
      opacity: 1,
      visible: true,
      locked: false
    }
    setElements([...elements, newElement])
    setSelectedElement(newElement.id)
    setActiveTool('select')
  }

  const addShapeElement = (shapeType: 'rectangle' | 'circle' | 'triangle') => {
    const canvasWidth = selectedSize?.width || 1080
    const canvasHeight = selectedSize?.height || 1080
    
    const newElement: DesignElement = {
      id: Date.now().toString(),
      type: 'shape',
      x: canvasWidth * 0.15,
      y: canvasHeight * 0.15,
      width: Math.min(canvasWidth, canvasHeight) * 0.1,
      height: Math.min(canvasWidth, canvasHeight) * 0.1,
      rotation: 0,
      backgroundColor: '#9E7FFF',
      borderColor: '#9E7FFF',
      borderWidth: 0,
      opacity: 1,
      visible: true,
      locked: false,
      content: shapeType,
      borderRadius: shapeType === 'circle' ? 50 : 0
    }
    setElements([...elements, newElement])
    setSelectedElement(newElement.id)
    setActiveTool('select')
  }

  const addImageElement = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const canvasWidth = selectedSize?.width || 1080
          const canvasHeight = selectedSize?.height || 1080
          
          const newElement: DesignElement = {
            id: Date.now().toString(),
            type: 'image',
            x: canvasWidth * 0.05,
            y: canvasHeight * 0.05,
            width: canvasWidth * 0.3,
            height: canvasHeight * 0.3,
            rotation: 0,
            src: e.target?.result as string,
            opacity: 1,
            visible: true,
            locked: false
          }
          setElements([...elements, newElement])
          setSelectedElement(newElement.id)
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
    setActiveTool('select')
  }

  const updateElement = (id: string, updates: Partial<DesignElement>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el))
  }

  const deleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id))
    if (selectedElement === id) {
      setSelectedElement(null)
    }
  }

  const duplicateElement = (id: string) => {
    const element = elements.find(el => el.id === id)
    if (element) {
      const newElement = { ...element, id: Date.now().toString(), x: element.x + 20, y: element.y + 20 }
      setElements([...elements, newElement])
    }
  }

  const selectedEl = elements.find(el => el.id === selectedElement)

  // Size Selection Modal
  if (showSizeSelection && selectedTemplate) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Boyut Seçin</h2>
                <p className="text-textSecondary">"{selectedTemplate.name}" şablonu için uygun boyutu seçin</p>
              </div>
              <button
                onClick={() => {
                  setShowSizeSelection(false)
                  setSelectedTemplate(null)
                }}
                className="p-2 hover:bg-background rounded-lg transition-colors"
              >
                <span className="text-textSecondary text-2xl">×</span>
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedTemplate.sizes.map((size, index) => {
                const Icon = size.icon
                const aspectRatio = size.width / size.height
                const isLandscape = aspectRatio > 1
                const isSquare = Math.abs(aspectRatio - 1) < 0.1
                
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => loadTemplate(selectedTemplate, size)}
                    className="p-4 bg-background hover:bg-background/80 rounded-xl border border-border hover:border-primary/50 transition-all text-left group"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{size.name}</h3>
                        <p className="text-xs text-textSecondary">{size.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-textSecondary">
                        {size.width} × {size.height}
                      </span>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        isSquare ? 'bg-blue-500/20 text-blue-400' :
                        isLandscape ? 'bg-green-500/20 text-green-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {isSquare ? 'Kare' : isLandscape ? 'Yatay' : 'Dikey'}
                      </div>
                    </div>
                    
                    <div className="w-full h-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-border/50 flex items-center justify-center">
                      <div 
                        className="bg-white/90 rounded shadow-sm"
                        style={{
                          width: isLandscape ? '40px' : isSquare ? '32px' : '20px',
                          height: isLandscape ? '24px' : isSquare ? '32px' : '40px'
                        }}
                      />
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (showTemplates) {
    return (
      <div className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-xl">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <span>Tasarım Editörü</span>
          </h1>
          <p className="text-textSecondary">Profesyonel şablonlar ile hızlıca tasarım oluşturun</p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Şablon ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 bg-surface border border-border rounded-xl text-white placeholder-textSecondary focus:border-primary focus:outline-none"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              {templateCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-surface text-textSecondary hover:text-white hover:bg-background'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ y: -4 }}
                onClick={() => handleTemplateSelect(template)}
                className="group cursor-pointer relative"
              >
                <div className="relative overflow-hidden rounded-xl bg-surface border border-border hover:border-primary/50 transition-all">
                  {/* Premium Badge */}
                  {template.premium && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-xs font-bold text-white">
                        <Crown className="w-3 h-3" />
                        <span>PRO</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="w-4/5 h-4/5 bg-white rounded-lg shadow-lg relative overflow-hidden">
                      {/* Template Preview */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-3 mx-auto">
                            <Sparkles className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-xs font-bold text-gray-800 mb-1">{template.name}</div>
                          <div className="text-xs text-gray-500">{template.sizes.length} boyut seçeneği</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <button className="w-full py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/80 transition-all">
                        <Zap className="w-4 h-4 inline mr-2" />
                        Boyut Seç
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-white">{template.name}</h3>
                    {template.premium && <Star className="w-4 h-4 text-yellow-400" />}
                  </div>
                  <p className="text-textSecondary text-sm mb-2">{template.category}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {template.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-background/50 text-textSecondary text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-1">
                      {template.sizes.slice(0, 3).map((size, idx) => {
                        const Icon = size.icon
                        return (
                          <div key={idx} className="w-6 h-6 bg-primary/20 rounded-full border border-background flex items-center justify-center">
                            <Icon className="w-3 h-3 text-primary" />
                          </div>
                        )
                      })}
                    </div>
                    <span className="text-xs text-textSecondary">
                      +{template.sizes.length - 3 > 0 ? template.sizes.length - 3 : 0} daha
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-16">
              <Palette className="w-16 h-16 text-textSecondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Şablon bulunamadı</h3>
              <p className="text-textSecondary">Arama teriminizi değiştirmeyi veya farklı bir kategori seçmeyi deneyin</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Left Toolbar */}
      <div className="w-64 bg-surface border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-white mb-4">Araçlar</h2>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => setActiveTool('select')}
              className={`p-3 rounded-lg transition-all ${
                activeTool === 'select' ? 'bg-primary text-white' : 'bg-background text-textSecondary hover:text-white'
              }`}
            >
              <Move className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs">Seç</span>
            </button>
            
            <button
              onClick={addTextElement}
              className="p-3 rounded-lg bg-background text-textSecondary hover:text-white transition-all"
            >
              <Type className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs">Metin</span>
            </button>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-textSecondary mb-2">Şekiller</h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => addShapeElement('rectangle')}
                className="p-2 rounded-lg bg-background text-textSecondary hover:text-white transition-all"
              >
                <Square className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => addShapeElement('circle')}
                className="p-2 rounded-lg bg-background text-textSecondary hover:text-white transition-all"
              >
                <Circle className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => addShapeElement('triangle')}
                className="p-2 rounded-lg bg-background text-textSecondary hover:text-white transition-all"
              >
                <Triangle className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
          
          <button
            onClick={addImageElement}
            className="w-full p-3 rounded-lg bg-background text-textSecondary hover:text-white transition-all mb-4"
          >
            <Image className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Resim Ekle</span>
          </button>
        </div>

        {/* Element Properties */}
        {selectedEl && (
          <div className="flex-1 p-4 overflow-y-auto">
            <h3 className="text-sm font-medium text-white mb-4">Özellikler</h3>
            
            {selectedEl.type === 'text' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-textSecondary mb-2">Metin</label>
                  <textarea
                    value={selectedEl.content || ''}
                    onChange={(e) => updateElement(selectedEl.id, { content: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-white text-sm focus:border-primary focus:outline-none resize-none"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-textSecondary mb-2">Font Boyutu</label>
                  <input
                    type="range"
                    min="8"
                    max={Math.min(selectedSize?.width || 1080, selectedSize?.height || 1080) * 0.1}
                    value={selectedEl.fontSize || 24}
                    onChange={(e) => updateElement(selectedEl.id, { fontSize: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-xs text-textSecondary">{selectedEl.fontSize}px</span>
                </div>
                
                <div>
                  <label className="block text-xs text-textSecondary mb-2">Renk</label>
                  <input
                    type="color"
                    value={selectedEl.color || '#FFFFFF'}
                    onChange={(e) => updateElement(selectedEl.id, { color: e.target.value })}
                    className="w-full h-8 rounded-lg border border-border"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateElement(selectedEl.id, { 
                      fontWeight: selectedEl.fontWeight === 'bold' ? 'normal' : 'bold' 
                    })}
                    className={`p-2 rounded-lg transition-all ${
                      selectedEl.fontWeight === 'bold' ? 'bg-primary text-white' : 'bg-background text-textSecondary'
                    }`}
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-background text-textSecondary hover:text-white transition-all">
                    <Italic className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-background text-textSecondary hover:text-white transition-all">
                    <Underline className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg bg-background text-textSecondary hover:text-white transition-all">
                    <AlignLeft className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-background text-textSecondary hover:text-white transition-all">
                    <AlignCenter className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-background text-textSecondary hover:text-white transition-all">
                    <AlignRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            
            {selectedEl.type === 'shape' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-textSecondary mb-2">Arkaplan Rengi</label>
                  <input
                    type="color"
                    value={selectedEl.backgroundColor || '#9E7FFF'}
                    onChange={(e) => updateElement(selectedEl.id, { backgroundColor: e.target.value })}
                    className="w-full h-8 rounded-lg border border-border"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-textSecondary mb-2">Kenarlık Rengi</label>
                  <input
                    type="color"
                    value={selectedEl.borderColor || '#9E7FFF'}
                    onChange={(e) => updateElement(selectedEl.id, { borderColor: e.target.value })}
                    className="w-full h-8 rounded-lg border border-border"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-textSecondary mb-2">Kenarlık Kalınlığı</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={selectedEl.borderWidth || 0}
                    onChange={(e) => updateElement(selectedEl.id, { borderWidth: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-xs text-textSecondary">{selectedEl.borderWidth}px</span>
                </div>
                
                {selectedEl.content !== 'circle' && (
                  <div>
                    <label className="block text-xs text-textSecondary mb-2">Köşe Yuvarlaklığı</label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={selectedEl.borderRadius || 0}
                      onChange={(e) => updateElement(selectedEl.id, { borderRadius: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <span className="text-xs text-textSecondary">{selectedEl.borderRadius}px</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="space-y-4 mt-6 pt-4 border-t border-border">
              <div>
                <label className="block text-xs text-textSecondary mb-2">Opaklık</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={selectedEl.opacity}
                  onChange={(e) => updateElement(selectedEl.id, { opacity: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <span className="text-xs text-textSecondary">{Math.round(selectedEl.opacity * 100)}%</span>
              </div>
              
              <div>
                <label className="block text-xs text-textSecondary mb-2">Döndürme</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={selectedEl.rotation}
                  onChange={(e) => updateElement(selectedEl.id, { rotation: parseInt(e.target.value) })}
                  className="w-full"
                />
                <span className="text-xs text-textSecondary">{selectedEl.rotation}°</span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => updateElement(selectedEl.id, { visible: !selectedEl.visible })}
                  className="flex-1 p-2 rounded-lg bg-background text-textSecondary hover:text-white transition-all"
                >
                  {selectedEl.visible ? <Eye className="w-4 h-4 mx-auto" /> : <EyeOff className="w-4 h-4 mx-auto" />}
                </button>
                <button
                  onClick={() => updateElement(selectedEl.id, { locked: !selectedEl.locked })}
                  className="flex-1 p-2 rounded-lg bg-background text-textSecondary hover:text-white transition-all"
                >
                  {selectedEl.locked ? <Lock className="w-4 h-4 mx-auto" /> : <Unlock className="w-4 h-4 mx-auto" />}
                </button>
                <button
                  onClick={() => duplicateElement(selectedEl.id)}
                  className="flex-1 p-2 rounded-lg bg-background text-textSecondary hover:text-white transition-all"
                >
                  <Copy className="w-4 h-4 mx-auto" />
                </button>
                <button
                  onClick={() => deleteElement(selectedEl.id)}
                  className="flex-1 p-2 rounded-lg bg-error/20 text-error hover:bg-error/30 transition-all"
                >
                  <Trash2 className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 bg-surface border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowTemplates(true)}
              className="text-textSecondary hover:text-white transition-all"
            >
              ← Şablonlara Dön
            </button>
            <div className="text-white font-medium">
              {selectedTemplate?.name || 'Özel Tasarım'} 
              {selectedSize && (
                <span className="text-textSecondary text-sm ml-2">
                  ({selectedSize.width} × {selectedSize.height}) - {selectedSize.name}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg bg-background text-textSecondary hover:text-white transition-all">
              <Undo className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-background text-textSecondary hover:text-white transition-all">
              <Redo className="w-4 h-4" />
            </button>
            
            <div className="flex items-center space-x-2 mx-4">
              <button
                onClick={() => setZoom(Math.max(25, zoom - 25))}
                className="p-2 rounded-lg bg-background text-textSecondary hover:text-white transition-all"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm text-white min-w-12 text-center">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                className="p-2 rounded-lg bg-background text-textSecondary hover:text-white transition-all"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
            
            <button className="p-2 rounded-lg bg-background text-textSecondary hover:text-white transition-all">
              <Save className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all">
              <Download className="w-4 h-4 inline mr-2" />
              İndir
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-background/50 p-8 overflow-auto">
          <div className="flex items-center justify-center min-h-full">
            <div
              ref={canvasRef}
              className="relative bg-white rounded-lg shadow-2xl"
              style={{
                width: selectedSize ? (selectedSize.width * zoom) / 100 : (1080 * zoom) / 100,
                height: selectedSize ? (selectedSize.height * zoom) / 100 : (1080 * zoom) / 100,
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'center'
              }}
            >
              {elements.map((element) => (
                <div
                  key={element.id}
                  onClick={() => !element.locked && setSelectedElement(element.id)}
                  className={`absolute cursor-pointer transition-all ${
                    selectedElement === element.id ? 'ring-2 ring-primary' : ''
                  } ${!element.visible ? 'opacity-50' : ''}`}
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    transform: `rotate(${element.rotation}deg)`,
                    opacity: element.visible ? element.opacity : 0.5,
                    pointerEvents: element.locked ? 'none' : 'auto',
                    zIndex: elements.indexOf(element) + 1
                  }}
                >
                  {element.type === 'text' && (
                    <div
                      style={{
                        fontSize: element.fontSize,
                        fontFamily: element.fontFamily,
                        fontWeight: element.fontWeight,
                        color: element.color,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        lineHeight: '1.2',
                        padding: '4px'
                      }}
                    >
                      {element.content}
                    </div>
                  )}
                  
                  {element.type === 'shape' && (
                    <div
                      className={`w-full h-full ${
                        element.content === 'circle' ? 'rounded-full' : ''
                      }`}
                      style={{
                        backgroundColor: element.backgroundColor,
                        border: `${element.borderWidth || 0}px solid ${element.borderColor}`,
                        borderRadius: element.content === 'circle' ? '50%' : `${element.borderRadius || 0}px`,
                        clipPath: element.content === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined
                      }}
                    />
                  )}
                  
                  {element.type === 'image' && (
                    <img
                      src={element.src}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{
                        borderRadius: `${element.borderRadius || 0}px`
                      }}
                      draggable={false}
                    />
                  )}
                  
                  {/* Selection handles */}
                  {selectedElement === element.id && !element.locked && (
                    <>
                      <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary rounded-full border-2 border-white cursor-nw-resize" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full border-2 border-white cursor-ne-resize" />
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary rounded-full border-2 border-white cursor-sw-resize" />
                      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-primary rounded-full border-2 border-white cursor-se-resize" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Layers */}
      <div className="w-64 bg-surface border-l border-border">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <Layers className="w-5 h-5" />
            <span>Katmanlar</span>
          </h3>
          {selectedSize && (
            <p className="text-xs text-textSecondary mt-1">
              {selectedSize.name} - {selectedSize.width}×{selectedSize.height}
            </p>
          )}
        </div>
        
        <div className="p-4">
          <div className="space-y-2">
            {elements.map((element, index) => (
              <div
                key={element.id}
                onClick={() => setSelectedElement(element.id)}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                  selectedElement === element.id 
                    ? 'bg-primary/20 border border-primary/30' 
                    : 'bg-background/50 hover:bg-background/80'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {element.type === 'text' && <Type className="w-4 h-4 text-primary" />}
                  {element.type === 'shape' && <Square className="w-4 h-4 text-secondary" />}
                  {element.type === 'image' && <Image className="w-4 h-4 text-accent" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm truncate">
                    {element.type === 'text' ? 
                      (element.content?.substring(0, 20) + (element.content && element.content.length > 20 ? '...' : '') || 'Metin') : 
                     element.type === 'shape' ? `${element.content} Şekil` : 'Resim'}
                  </div>
                  <div className="text-textSecondary text-xs">
                    Katman {elements.length - index}
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      updateElement(element.id, { visible: !element.visible })
                    }}
                    className="p-1 hover:bg-background/50 rounded"
                  >
                    {element.visible ? 
                      <Eye className="w-3 h-3 text-textSecondary" /> : 
                      <EyeOff className="w-3 h-3 text-textSecondary" />
                    }
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      updateElement(element.id, { locked: !element.locked })
                    }}
                    className="p-1 hover:bg-background/50 rounded"
                  >
                    {element.locked ? 
                      <Lock className="w-3 h-3 text-textSecondary" /> : 
                      <Unlock className="w-3 h-3 text-textSecondary" />
                    }
                  </button>
                </div>
              </div>
            ))}
            
            {elements.length === 0 && (
              <div className="text-center py-8">
                <Layers className="w-12 h-12 text-textSecondary mx-auto mb-3" />
                <p className="text-textSecondary text-sm">Henüz katman yok</p>
                <p className="text-textSecondary text-xs">Bir şablon seçin veya sol panelden öğe ekleyin</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
