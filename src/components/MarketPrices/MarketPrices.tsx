import React, { useState, useEffect } from 'react'
import { getMarketPrices } from '../../lib/supabase'
import { TrendingUp, TrendingDown, MapPin, Calendar, ArrowLeft } from 'lucide-react'

interface MarketPrice {
  id: string
  fruit_type: string
  variety: string | null
  price_per_kg: number
  market_location: string
  quality_grade: string
  updated_at: string
  created_at: string
}

interface MarketPricesProps {
  onViewChange?: (view: string) => void
}

const MarketPrices: React.FC<MarketPricesProps> = ({ onViewChange }) => {
  const [prices, setPrices] = useState<MarketPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFruit, setSelectedFruit] = useState('all')

  useEffect(() => {
    loadMarketPrices()
  }, [])

  const loadMarketPrices = async () => {
    try {
      const { data, error } = await getMarketPrices()
      if (error) throw error
      setPrices(data || [])
    } catch (error) {
      console.error('Failed to load market prices:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPrices = selectedFruit === 'all' 
    ? prices 
    : prices.filter(price => price.fruit_type.toLowerCase() === selectedFruit.toLowerCase())

  const fruitTypes = [...new Set(prices.map(price => price.fruit_type))]

  const getQualityColor = (grade: string) => {
    switch (grade.toLowerCase()) {
      case 'premium':
        return 'bg-green-100 text-green-800'
      case 'good':
        return 'bg-blue-100 text-blue-800'
      case 'average':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {onViewChange && (
              <button
                onClick={() => onViewChange('dashboard')}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
            )}
            <TrendingUp className="h-6 w-6 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Market Prices</h1>
          </div>
          
          <select
            value={selectedFruit}
            onChange={(e) => setSelectedFruit(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80 backdrop-blur-sm"
          >
            <option value="all">All Fruits</option>
            {fruitTypes.map((fruit) => (
              <option key={fruit} value={fruit}>{fruit}</option>
            ))}
          </select>
        </div>

        {filteredPrices.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-12 text-center">
            <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-2">No market data available</p>
            <p className="text-gray-500">Market prices will be updated regularly</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrices.map((price) => (
              <div key={price.id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{price.fruit_type}</h3>
                    {price.variety && (
                      <p className="text-sm text-gray-600">{price.variety}</p>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQualityColor(price.quality_grade)}`}>
                    {price.quality_grade}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price per kg</span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{price.price_per_kg}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{price.market_location}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Updated {new Date(price.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">
                      Good selling opportunity
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Market Insights */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h2 className="text-xl font-bold mb-4">Market Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Best Selling Time</h3>
              <p className="text-sm text-blue-100">
                Early morning hours typically offer the best prices for fresh produce.
              </p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Quality Premium</h3>
              <p className="text-sm text-blue-100">
                Premium quality fruits can fetch 20-30% higher prices than average quality.
              </p>
            </div>
          </div>
        </div>

        {/* Bolt.new Badge */}
        <div className="fixed bottom-4 right-4 z-50">
          <a
            href="https://bolt.new"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-12 h-12 md:w-16 md:h-16 hover:scale-110 transition-transform duration-200"
          >
            <img
              src="/black_circle_360x360.png"
              alt="Powered by Bolt.new"
              className="w-full h-full object-contain"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default MarketPrices