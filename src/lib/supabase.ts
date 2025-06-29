import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key exists:', !!supabaseAnonKey)

// Check if we have valid Supabase credentials
const hasValidCredentials = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url' && 
  supabaseAnonKey !== 'your_supabase_anon_key' &&
  supabaseUrl.startsWith('https://') &&
  supabaseUrl.includes('.supabase.co')

if (!hasValidCredentials) {
  console.warn('⚠️ Supabase credentials not configured properly!')
  console.warn('Please click "Connect to Supabase" in the top right to set up your database connection.')
}

// Use valid fallback URL to prevent constructor errors
const fallbackUrl = 'https://placeholder.supabase.co'
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder'

export const supabase = createClient<Database>(
  hasValidCredentials ? supabaseUrl : fallbackUrl,
  hasValidCredentials ? supabaseAnonKey : fallbackKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'X-Client-Info': 'fruit-management-app'
      }
    }
  }
)

// Auth helpers with better error handling
export const signUp = async (email: string, password: string, userData: any) => {
  if (!hasValidCredentials) {
    return { 
      data: null, 
      error: { message: 'Supabase not configured. Please connect to Supabase first.' }
    }
  }
  
  try {
    console.log('Attempting signup for:', email)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.full_name || email,
          ...userData
        }
      }
    })
    
    if (error) {
      console.error('Signup error:', error)
      return { data: null, error }
    }
    
    console.log('Signup successful:', data)
    return { data, error: null }
  } catch (error: any) {
    console.error('SignUp network error:', error)
    return { 
      data: null, 
      error: { 
        message: error.message || 'Network error during signup. Please check your connection and try again.' 
      }
    }
  }
}

export const signIn = async (email: string, password: string) => {
  if (!hasValidCredentials) {
    return { 
      data: null, 
      error: { message: 'Supabase not configured. Please connect to Supabase first.' }
    }
  }
  
  try {
    console.log('Attempting signin for:', email)
    
    // Test connection first
    const { data: testData, error: testError } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (testError && testError.message.includes('relation "users" does not exist')) {
      console.error('Users table does not exist. Please run the database migrations.')
      return { 
        data: null, 
        error: { message: 'Database not properly configured. Please contact support.' }
      }
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      console.error('Signin error:', error)
      return { data: null, error }
    }
    
    console.log('Signin successful:', data)
    return { data, error: null }
  } catch (error: any) {
    console.error('SignIn network error:', error)
    return { 
      data: null, 
      error: { 
        message: error.message || 'Network error during signin. Please check your connection and try again.' 
      }
    }
  }
}

export const signOut = async () => {
  if (!hasValidCredentials) {
    return { error: { message: 'Supabase not configured. Please connect to Supabase first.' } }
  }
  
  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (error: any) {
    console.error('SignOut error:', error)
    return { error: { message: error.message || 'Error during signout' } }
  }
}

export const getCurrentUser = async () => {
  if (!hasValidCredentials) {
    return { 
      user: null, 
      error: { message: 'Supabase not configured. Please connect to Supabase first.' }
    }
  }
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  } catch (error: any) {
    console.error('Get user error:', error)
    return { 
      user: null, 
      error: { message: error.message || 'Error getting user' }
    }
  }
}

// User profile helpers
export const getUserProfile = async (userId: string) => {
  if (!hasValidCredentials) {
    return { 
      data: null, 
      error: { message: 'Supabase not configured. Please connect to Supabase first.' }
    }
  }
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}

export const updateUserProfile = async (userId: string, updates: any) => {
  if (!hasValidCredentials) {
    return { 
      data: null, 
      error: { message: 'Supabase not configured. Please connect to Supabase first.' }
    }
  }
  
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
  return { data, error }
}

// Database helpers
export const insertFruit = async (fruitData: any) => {
  if (!hasValidCredentials) {
    return { 
      data: null, 
      error: { message: 'Supabase not configured. Please connect to Supabase first.' }
    }
  }
  
  const { data, error } = await supabase
    .from('fruits')
    .insert([fruitData])
    .select()
  return { data, error }
}

export const getFruits = async (userId: string) => {
  if (!hasValidCredentials) {
    return { 
      data: null, 
      error: { message: 'Supabase not configured. Please connect to Supabase first.' }
    }
  }
  
  const { data, error } = await supabase
    .from('fruits')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const updateFruit = async (id: string, updates: any) => {
  if (!hasValidCredentials) {
    return { 
      data: null, 
      error: { message: 'Supabase not configured. Please connect to Supabase first.' }
    }
  }
  
  const { data, error } = await supabase
    .from('fruits')
    .update(updates)
    .eq('id', id)
    .select()
  return { data, error }
}

export const deleteFruit = async (id: string) => {
  if (!hasValidCredentials) {
    return { error: { message: 'Supabase not configured. Please connect to Supabase first.' } }
  }
  
  const { error } = await supabase
    .from('fruits')
    .delete()
    .eq('id', id)
  return { error }
}

export const getAlerts = async (userId: string) => {
  if (!hasValidCredentials) {
    return { 
      data: null, 
      error: { message: 'Supabase not configured. Please connect to Supabase first.' }
    }
  }
  
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const insertAlert = async (alertData: any) => {
  if (!hasValidCredentials) {
    return { 
      data: null, 
      error: { message: 'Supabase not configured. Please connect to Supabase first.' }
    }
  }
  
  const { data, error } = await supabase
    .from('alerts')
    .insert([alertData])
    .select()
  return { data, error }
}

export const markAlertAsRead = async (id: string) => {
  if (!hasValidCredentials) {
    return { 
      data: null, 
      error: { message: 'Supabase not configured. Please connect to Supabase first.' }
    }
  }
  
  const { data, error } = await supabase
    .from('alerts')
    .update({ read: true })
    .eq('id', id)
    .select()
  return { data, error }
}

export const deleteAlert = async (id: string) => {
  if (!hasValidCredentials) {
    return { error: { message: 'Supabase not configured. Please connect to Supabase first.' } }
  }
  
  const { error } = await supabase
    .from('alerts')
    .delete()
    .eq('id', id)
  return { error }
}

// Real-time subscriptions
export const subscribeFruits = (userId: string, callback: (payload: any) => void) => {
  if (!hasValidCredentials) {
    console.warn('Cannot subscribe to fruits changes: Supabase not configured')
    return { unsubscribe: () => {} }
  }
  
  return supabase
    .channel('fruits_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'fruits',
        filter: `user_id=eq.${userId}`
      },
      callback
    )
    .subscribe()
}

export const subscribeAlerts = (userId: string, callback: (payload: any) => void) => {
  if (!hasValidCredentials) {
    console.warn('Cannot subscribe to alerts changes: Supabase not configured')
    return { unsubscribe: () => {} }
  }
  
  return supabase
    .channel('alerts_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'alerts',
        filter: `user_id=eq.${userId}`
      },
      callback
    )
    .subscribe()
}

// Analytics
export const getAnalytics = async (userId: string) => {
  if (!hasValidCredentials) {
    return { 
      data: null, 
      error: { message: 'Supabase not configured. Please connect to Supabase first.' }
    }
  }
  
  const { data, error } = await supabase
    .from('analytics')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(30)
  return { data, error }
}

export const insertAnalytics = async (analyticsData: any) => {
  if (!hasValidCredentials) {
    return { 
      data: null, 
      error: { message: 'Supabase not configured. Please connect to Supabase first.' }
    }
  }
  
  const { data, error } = await supabase
    .from('analytics')
    .upsert([analyticsData], { onConflict: 'user_id,date' })
    .select()
  return { data, error }
}

// Market data
export const getMarketPrices = async () => {
  if (!hasValidCredentials) {
    return { 
      data: null, 
      error: { message: 'Supabase not configured. Please connect to Supabase first.' }
    }
  }
  
  const { data, error } = await supabase
    .from('market_prices')
    .select('*')
    .order('updated_at', { ascending: false })
  return { data, error }
}

// Farm profiles
export const getFarmProfile = async (userId: string) => {
  if (!hasValidCredentials) {
    return { 
      data: null, 
      error: { message: 'Supabase not configured. Please connect to Supabase first.' }
    }
  }
  
  const { data, error } = await supabase
    .from('farm_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  return { data, error }
}

export const updateFarmProfile = async (userId: string, profileData: any) => {
  if (!hasValidCredentials) {
    return { 
      data: null, 
      error: { message: 'Supabase not configured. Please connect to Supabase first.' }
    }
  }
  
  const { data, error } = await supabase
    .from('farm_profiles')
    .upsert({ user_id: userId, ...profileData })
    .select()
  return { data, error }
}

// Export the credentials validation status for use in components
export { hasValidCredentials }