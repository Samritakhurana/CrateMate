import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getAnalytics, insertAnalytics } from '../../lib/supabase'
import { TrendingUp, TrendingDown, DollarSign, Package2, Calendar, BarChart3, ArrowLeft, Info } from 'lucide-react'
import { getDaysUntilExpiry } from '../../utils/storage'

interface AnalyticsData {
  id: string
  user_id: string
  date: string
  total_fruits: number
  spoiled_fruits: number
  revenue_saved: number
  efficiency_score: number
  created_at: string
}

interface AnalyticsDashboardProps {
  fruits?: any[]
  onViewChange?: (view: string) => void
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ fruits = [], onViewChange }) => {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadAnalytics()
      generateTodaysAnalytics()
    }
  }, [user, fruits])

  const loadAnalytics = async () => {
    if (!user) return

    try {
      const { data, error } = await getAnalytics(user.id)
      if (error) throw error
      setAnalytics(data || [])
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateTodaysAnalytics = async () => {
    if (!user || fruits.length === 0) return

    try {
      const today = new Date().toISOString().split('T')[0]
      const totalFruits = fruits.reduce((sum, fruit) => sum + fruit.quantity, 0)
      const spoiledFruits = fruits.filter(fruit => getDaysUntilExpiry(fruit.expiry_date) < 0)
        .reduce((sum, fruit) => sum + fruit.quantity, 0)
      
      // Calculate revenue saved (assuming average fruit price of ₹50/kg and 0.2kg per fruit)
      const avgPricePerFruit = 10 // ₹10 per fruit average
      const revenueSaved = (totalFruits - spoiledFruits) * avgPricePerFruit
      
      // Calculate efficiency score
      const efficiencyScore = totalFruits > 0 ? ((totalFruits - spoiledFruits) / totalFruits) * 100 : 100

      const analyticsData = {
        user_id: user.id,
        date: today,
        total_fruits: totalFruits,
        spoiled_fruits: spoiledFruits,
        revenue_saved: revenueSaved,
        efficiency_score: Math.round(efficiencyScore * 100) / 100
      }

      // Always upsert today's analytics to keep it current
      await insertAnalytics(analyticsData)
      loadAnalytics() // Reload to get updated data
    } catch (error) {
      console.error('Failed to generate analytics:', error)
    }
  }

  const calculateTotals = () => {
    const totals = analytics.reduce(
      (acc, item) => ({
        totalFruits: acc.totalFruits + item.total_fruits,
        spoiledFruits: acc.spoiledFruits + item.spoiled_fruits,
        revenueSaved: acc.revenueSaved + item.revenue_saved,
        avgEfficiency: acc.avgEfficiency + item.efficiency_score
      }),
      { totalFruits: 0, spoiledFruits: 0, revenueSaved: 0, avgEfficiency: 0 }
    )

    totals.avgEfficiency = analytics.length > 0 ? totals.avgEfficiency / analytics.length : 0

    return totals
  }

  // Calculate real-time data from current fruits
  const realTimeData = {
    totalFruits: fruits.reduce((sum, fruit) => sum + fruit.quantity, 0),
    spoiledFruits: fruits.filter(fruit => getDaysUntilExpiry(fruit.expiry_date) < 0)
      .reduce((sum, fruit) => sum + fruit.quantity, 0),
    expiringSoon: fruits.filter(fruit => {
      const days = getDaysUntilExpiry(fruit.expiry_date)
      return days <= 2 && days >= 0
    }).reduce((sum, fruit) => sum + fruit.quantity, 0)
  }

  const totals = calculateTotals()
  const spoilageRate = realTimeData.totalFruits > 0 ? (realTimeData.spoiledFruits / realTimeData.totalFruits) * 100 : 0
  const currentEfficiency = realTimeData.totalFruits > 0 ? ((realTimeData.totalFruits - realTimeData.spoiledFruits) / realTimeData.totalFruits) * 100 : 100

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
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
        <div className="flex items-center space-x-3">
          {onViewChange && (
            <button
              onClick={() => onViewChange('dashboard')}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
          )}
          <BarChart3 className="h-6 w-6 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        </div>

        {/* Real-time Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Fruits</p>
                <p className="text-2xl font-bold text-blue-600">{realTimeData.totalFruits}</p>
              </div>
            </div>
            <div className="mt-3 p-2 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                <Info className="inline h-3 w-3 mr-1" />
                Total number of fruits currently in your inventory
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Spoilage Rate</p>
                <p className="text-2xl font-bold text-red-600">{spoilageRate.toFixed(1)}%</p>
              </div>
            </div>
            <div className="mt-3 p-2 bg-red-50 rounded-lg">
              <p className="text-xs text-red-700">
                <Info className="inline h-3 w-3 mr-1" />
                Percentage of fruits that have expired or spoiled
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue Saved</p>
                <p className="text-2xl font-bold text-green-600">₹{((realTimeData.totalFruits - realTimeData.spoiledFruits) * 10).toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-3 p-2 bg-green-50 rounded-lg">
              <p className="text-xs text-green-700">
                <Info className="inline h-3 w-3 mr-1" />
                Estimated revenue saved by preventing spoilage (₹10 per fruit average)
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Efficiency Score</p>
                <p className="text-2xl font-bold text-purple-600">{currentEfficiency.toFixed(1)}%</p>
              </div>
            </div>
            <div className="mt-3 p-2 bg-purple-50 rounded-lg">
              <p className="text-xs text-purple-700">
                <Info className="inline h-3 w-3 mr-1" />
                Percentage of fruits successfully sold before spoiling
              </p>
            </div>
          </div>
        </div>

        {/* How We Calculate These Metrics */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">How We Calculate Your Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Spoilage Rate</h3>
                <p className="text-sm text-blue-800">
                  (Expired Fruits ÷ Total Fruits) × 100
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Based on fruits that have passed their predicted expiry date
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Efficiency Score</h3>
                <p className="text-sm text-purple-800">
                  (Fresh Fruits ÷ Total Fruits) × 100
                </p>
                <p className="text-xs text-purple-700 mt-1">
                  Higher scores indicate better fruit management
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Revenue Saved</h3>
                <p className="text-sm text-green-800">
                  Fresh Fruits × ₹10 (average price per fruit)
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Estimated value of fruits saved from spoilage
                </p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-900 mb-2">Real-time Updates</h3>
                <p className="text-sm text-orange-800">
                  Metrics update automatically as you add/remove fruits
                </p>
                <p className="text-xs text-orange-700 mt-1">
                  Based on current inventory and expiry predictions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Inventory Status</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
              <h3 className="font-semibold">Fresh Fruits</h3>
              <p className="text-2xl font-bold">{realTimeData.totalFruits - realTimeData.spoiledFruits - realTimeData.expiringSoon}</p>
              <p className="text-sm opacity-90">Ready for sale</p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
              <h3 className="font-semibold">Expiring Soon</h3>
              <p className="text-2xl font-bold">{realTimeData.expiringSoon}</p>
              <p className="text-sm opacity-90">Priority sale needed</p>
            </div>
            
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white">
              <h3 className="font-semibold">Spoiled</h3>
              <p className="text-2xl font-bold">{realTimeData.spoiledFruits}</p>
              <p className="text-sm opacity-90">Remove from inventory</p>
            </div>
          </div>
        </div>

        {/* Historical Analytics */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Historical Performance</h2>
          
          {analytics.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No historical data available yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Analytics will be generated as you add and manage fruits
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {analytics.slice(0, 7).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.total_fruits} fruits managed • {item.spoiled_fruits} spoiled
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">₹{item.revenue_saved}</p>
                    <p className="text-sm text-gray-600">{item.efficiency_score}% efficiency</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Smart Insights */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <h2 className="text-xl font-bold mb-4">Smart Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Waste Reduction</h3>
              <p className="text-sm text-green-100">
                You've prevented {realTimeData.totalFruits - realTimeData.spoiledFruits} fruits from going to waste!
              </p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Revenue Impact</h3>
              <p className="text-sm text-green-100">
                Your smart storage practices saved ₹{((realTimeData.totalFruits - realTimeData.spoiledFruits) * 10).toLocaleString()} in potential losses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard