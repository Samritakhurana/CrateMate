import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getFruits, insertFruit, updateFruit, deleteFruit, subscribeFruits, insertAlert } from '../lib/supabase'
import { generateAlertsForFruit } from '../utils/storage'
import toast from 'react-hot-toast'

export interface Fruit {
  id: string
  user_id: string
  fruit_type: string
  variety: string | null
  quantity: number
  harvest_date: string
  storage_method: string
  condition: string
  shelf_life_days: number
  expiry_date: string
  status: string
  location: string | null
  temperature: number | null
  humidity: number | null
  notes: string | null
  created_at: string
  updated_at: string
}

export const useFruits = () => {
  const { user } = useAuth()
  const [fruits, setFruits] = useState<Fruit[]>([])
  const [loading, setLoading] = useState(true)

  const loadFruits = useCallback(async () => {
    if (!user) return
    
    try {
      const { data, error } = await getFruits(user.id)
      if (error) throw error
      console.log('Loaded fruits:', data)
      setFruits(data || [])
    } catch (error: any) {
      console.error('Failed to load fruits:', error)
      toast.error('Failed to load fruits: ' + error.message)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      loadFruits()
      
      // Subscribe to real-time changes
      const subscription = subscribeFruits(user.id, (payload) => {
        console.log('Fruit subscription payload:', payload)
        if (payload.eventType === 'INSERT') {
          setFruits(prev => [payload.new, ...prev])
        } else if (payload.eventType === 'UPDATE') {
          setFruits(prev => prev.map(fruit => 
            fruit.id === payload.new.id ? payload.new : fruit
          ))
        } else if (payload.eventType === 'DELETE') {
          setFruits(prev => prev.filter(fruit => fruit.id !== payload.old.id))
        }
      })

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [user, loadFruits])

  const addFruit = useCallback(async (fruitData: Omit<Fruit, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return

    try {
      const { data, error } = await insertFruit({
        ...fruitData,
        user_id: user.id
      })
      if (error) throw error
      
      const newFruit = data?.[0]
      if (newFruit) {
        // Generate alerts for the new fruit
        const alerts = generateAlertsForFruit(newFruit)
        for (const alert of alerts) {
          try {
            await insertAlert({
              ...alert,
              user_id: user.id
            })
          } catch (alertError) {
            console.error('Failed to create alert:', alertError)
          }
        }
      }
      
      toast.success('Fruit added successfully!')
      return newFruit
    } catch (error: any) {
      console.error('Failed to add fruit:', error)
      toast.error('Failed to add fruit: ' + error.message)
      throw error
    }
  }, [user])

  const updateFruitData = useCallback(async (id: string, updates: Partial<Fruit>) => {
    try {
      const { data, error } = await updateFruit(id, updates)
      if (error) throw error
      toast.success('Fruit updated successfully!')
      return data?.[0]
    } catch (error: any) {
      console.error('Failed to update fruit:', error)
      toast.error('Failed to update fruit: ' + error.message)
      throw error
    }
  }, [])

  const removeFruit = useCallback(async (id: string) => {
    try {
      const { error } = await deleteFruit(id)
      if (error) throw error
      // Don't show success toast here as it's handled in the component
    } catch (error: any) {
      console.error('Failed to remove fruit:', error)
      toast.error('Failed to remove fruit: ' + error.message)
      throw error
    }
  }, [])

  return {
    fruits,
    loading,
    addFruit,
    updateFruit: updateFruitData,
    removeFruit,
    refetch: loadFruits
  }
}