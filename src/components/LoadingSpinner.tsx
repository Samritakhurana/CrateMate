import React from 'react'
import { Package2 } from 'lucide-react'

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin mb-4">
          <Package2 className="h-16 w-16 text-green-600 mx-auto" />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">CrateMate</h2>
        <p className="text-gray-500">Loading your dashboard...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner