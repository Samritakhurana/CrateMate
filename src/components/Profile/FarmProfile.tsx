import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getFarmProfile, updateFarmProfile } from '../../lib/supabase'
import { User, MapPin, Phone, Mail, Briefcase, Save, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

interface FarmProfileData {
  id?: string
  user_id: string
  farm_name: string | null
  location: string | null
  farm_size: number | null
  primary_crops: string[] | null
  contact_phone: string | null
  address: string | null
  coordinates: any | null
  created_at?: string
  updated_at?: string
}

interface FarmProfileProps {
  onViewChange?: (view: string) => void
}

const FarmProfile: React.FC<FarmProfileProps> = ({ onViewChange }) => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<FarmProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    farm_name: '',
    location: '',
    farm_size: '',
    primary_crops: '',
    contact_phone: '',
    address: ''
  })

  useEffect(() => {
    if (user) {
      loadProfile()
    }
  }, [user])

  const loadProfile = async () => {
    if (!user) return

    try {
      const { data, error } = await getFarmProfile(user.id)
      if (error && error.code !== 'PGRST116') { // Not found error
        throw error
      }
      
      if (data) {
        setProfile(data)
        setFormData({
          farm_name: data.farm_name || '',
          location: data.location || '',
          farm_size: data.farm_size?.toString() || '',
          primary_crops: data.primary_crops?.join(', ') || '',
          contact_phone: data.contact_phone || '',
          address: data.address || ''
        })
      }
    } catch (error: any) {
      console.error('Failed to load profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)
    try {
      const profileData = {
        farm_name: formData.farm_name || null,
        location: formData.location || null,
        farm_size: formData.farm_size ? parseFloat(formData.farm_size) : null,
        primary_crops: formData.primary_crops 
          ? formData.primary_crops.split(',').map(crop => crop.trim()).filter(Boolean)
          : null,
        contact_phone: formData.contact_phone || null,
        address: formData.address || null
      }

      const { data, error } = await updateFarmProfile(user.id, profileData)
      if (error) throw error

      setProfile(data?.[0] || null)
      toast.success('Profile updated successfully!')
    } catch (error: any) {
      toast.error('Failed to update profile: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
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
          <User className="h-6 w-6 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Farm Profile</h1>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium text-gray-900">
                    {user?.user_metadata?.full_name || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Farm Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Farm Name
                </label>
                <input
                  type="text"
                  value={formData.farm_name}
                  onChange={(e) => handleChange('farm_name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80"
                  placeholder="Your farm name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80"
                    placeholder="City, State"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Farm Size (acres)
                </label>
                <input
                  type="number"
                  value={formData.farm_size}
                  onChange={(e) => handleChange('farm_size', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80"
                  placeholder="Farm size in acres"
                  min="0"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.contact_phone}
                    onChange={(e) => handleChange('contact_phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Crops
              </label>
              <input
                type="text"
                value={formData.primary_crops}
                onChange={(e) => handleChange('primary_crops', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80"
                placeholder="e.g., Papaya, Mango, Banana (comma separated)"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter your main crops separated by commas
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Farm Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80"
                placeholder="Complete farm address"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-5 w-5" />
                <span>{saving ? 'Saving...' : 'Save Profile'}</span>
              </button>
            </div>
          </form>
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

export default FarmProfile