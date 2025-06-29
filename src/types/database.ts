export interface Database {
  public: {
    Tables: {
      fruits: {
        Row: {
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
        Insert: {
          id?: string
          user_id: string
          fruit_type: string
          variety?: string | null
          quantity: number
          harvest_date: string
          storage_method: string
          condition: string
          shelf_life_days: number
          expiry_date: string
          status: string
          location?: string | null
          temperature?: number | null
          humidity?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          fruit_type?: string
          variety?: string | null
          quantity?: number
          harvest_date?: string
          storage_method?: string
          condition?: string
          shelf_life_days?: number
          expiry_date?: string
          status?: string
          location?: string | null
          temperature?: number | null
          humidity?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      alerts: {
        Row: {
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
        Insert: {
          id?: string
          user_id: string
          fruit_id?: string | null
          type: string
          title: string
          message: string
          priority: string
          read?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          fruit_id?: string | null
          type?: string
          title?: string
          message?: string
          priority?: string
          read?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      farm_profiles: {
        Row: {
          id: string
          user_id: string
          farm_name: string | null
          location: string | null
          farm_size: number | null
          primary_crops: string[] | null
          contact_phone: string | null
          address: string | null
          coordinates: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          farm_name?: string | null
          location?: string | null
          farm_size?: number | null
          primary_crops?: string[] | null
          contact_phone?: string | null
          address?: string | null
          coordinates?: any | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          farm_name?: string | null
          location?: string | null
          farm_size?: number | null
          primary_crops?: string[] | null
          contact_phone?: string | null
          address?: string | null
          coordinates?: any | null
          created_at?: string
          updated_at?: string
        }
      }
      analytics: {
        Row: {
          id: string
          user_id: string
          date: string
          total_fruits: number
          spoiled_fruits: number
          revenue_saved: number
          efficiency_score: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          total_fruits: number
          spoiled_fruits: number
          revenue_saved: number
          efficiency_score: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          total_fruits?: number
          spoiled_fruits?: number
          revenue_saved?: number
          efficiency_score?: number
          created_at?: string
        }
      }
      market_prices: {
        Row: {
          id: string
          fruit_type: string
          variety: string | null
          price_per_kg: number
          market_location: string
          quality_grade: string
          updated_at: string
          created_at: string
        }
        Insert: {
          id?: string
          fruit_type: string
          variety?: string | null
          price_per_kg: number
          market_location: string
          quality_grade: string
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          fruit_type?: string
          variety?: string | null
          price_per_kg?: number
          market_location?: string
          quality_grade?: string
          updated_at?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}