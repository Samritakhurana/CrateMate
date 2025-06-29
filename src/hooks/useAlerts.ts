import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getAlerts, insertAlert, markAlertAsRead, deleteAlert, subscribeAlerts } from '../lib/supabase'
import toast from 'react-hot-toast'

export interface Alert {
  id: string
  user_id: string
  fruit_id: string | null
  type: string
  title: string
  message: string
  priority: string
  read: boolean
  created_at: string
  updated_at: string
}

export const useAlerts = () => {
  const { user } = useAuth()
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  const loadAlerts = useCallback(async () => {
    if (!user) return
    
    try {
      const { data, error } = await getAlerts(user.id)
      if (error) throw error
      console.log('Loaded alerts:', data)
      setAlerts(data || [])
    } catch (error: any) {
      console.error('Failed to load alerts:', error)
      toast.error('Failed to load alerts: ' + error.message)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      loadAlerts()
      
      // Subscribe to real-time changes
      const subscription = subscribeAlerts(user.id, (payload) => {
        console.log('Alert subscription payload:', payload)
        if (payload.eventType === 'INSERT') {
          setAlerts(prev => [payload.new, ...prev])
        } else if (payload.eventType === 'UPDATE') {
          setAlerts(prev => prev.map(alert => 
            alert.id === payload.new.id ? payload.new : alert
          ))
        } else if (payload.eventType === 'DELETE') {
          setAlerts(prev => prev.filter(alert => alert.id !== payload.old.id))
        }
      })

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [user, loadAlerts])

  const addAlert = useCallback(async (alertData: Omit<Alert, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return

    try {
      const { data, error } = await insertAlert({
        ...alertData,
        user_id: user.id
      })
      if (error) throw error
      console.log('Added alert:', data)
      return data?.[0]
    } catch (error: any) {
      console.error('Failed to create alert:', error)
      toast.error('Failed to create alert: ' + error.message)
      throw error
    }
  }, [user])

  const markAsRead = useCallback(async (id: string) => {
    try {
      const { data, error } = await markAlertAsRead(id)
      if (error) throw error
      console.log('Marked alert as read:', data)
      return data?.[0]
    } catch (error: any) {
      console.error('Failed to mark alert as read:', error)
      toast.error('Failed to mark alert as read: ' + error.message)
      throw error
    }
  }, [])

  const removeAlert = useCallback(async (id: string) => {
    try {
      const { error } = await deleteAlert(id)
      if (error) throw error
      console.log('Deleted alert:', id)
      toast.success('Alert deleted successfully!')
    } catch (error: any) {
      console.error('Failed to delete alert:', error)
      toast.error('Failed to delete alert: ' + error.message)
      throw error
    }
  }, [])

  return {
    alerts,
    loading,
    addAlert,
    markAsRead,
    removeAlert,
    refetch: loadAlerts
  }
}