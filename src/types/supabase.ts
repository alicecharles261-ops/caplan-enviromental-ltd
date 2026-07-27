export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      quote_requests: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          service: string | null
          property_type: string | null
          property_size: string | null
          address: string | null
          city: string | null
          postal_code: string | null
          preferred_contact_method: string | null
          message: string | null
          status: 'New' | 'Contacted' | 'Scheduled' | 'Completed' | 'Closed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone: string
          service?: string | null
          property_type?: string | null
          property_size?: string | null
          address?: string | null
          city?: string | null
          postal_code?: string | null
          preferred_contact_method?: string | null
          message?: string | null
          status?: 'New' | 'Contacted' | 'Scheduled' | 'Completed' | 'Closed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string
          service?: string | null
          property_type?: string | null
          property_size?: string | null
          address?: string | null
          city?: string | null
          postal_code?: string | null
          preferred_contact_method?: string | null
          message?: string | null
          status?: 'New' | 'Contacted' | 'Scheduled' | 'Completed' | 'Closed'
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      inspection_bookings: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          service: string | null
          booking_date: string
          booking_time: string
          address: string
          city: string
          notes: string | null
          status: 'New' | 'Contacted' | 'Scheduled' | 'Completed' | 'Closed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone: string
          service?: string | null
          booking_date: string
          booking_time: string
          address: string
          city: string
          notes?: string | null
          status?: 'New' | 'Contacted' | 'Scheduled' | 'Completed' | 'Closed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string
          service?: string | null
          booking_date?: string
          booking_time?: string
          address?: string
          city?: string
          notes?: string | null
          status?: 'New' | 'Contacted' | 'Scheduled' | 'Completed' | 'Closed'
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          subject: string
          message: string
          status: 'New' | 'Contacted' | 'Scheduled' | 'Completed' | 'Closed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone: string
          subject: string
          message: string
          status?: 'New' | 'Contacted' | 'Scheduled' | 'Completed' | 'Closed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string
          subject?: string
          message?: string
          status?: 'New' | 'Contacted' | 'Scheduled' | 'Completed' | 'Closed'
          created_at?: string
          updated_at?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
