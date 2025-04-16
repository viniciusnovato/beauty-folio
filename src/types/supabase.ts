export interface Portfolio {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface BeforeAfter {
  id: string;
  title: string;
  description: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  tags?: string[];
  createdAt: string;
}

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
      professionals: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string
          bio: string
          logo: string
          primary_color: string
          secondary_color: string
          services?: Service[]
          appointments?: Appointment[]
          availability?: Availability[]
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone: string
          bio?: string
          logo?: string
          primary_color?: string
          secondary_color?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string
          bio?: string
          logo?: string
          primary_color?: string
          secondary_color?: string
        }
      }
      services: {
        Row: {
          id: string
          created_at: string
          professional_id: string
          name: string
          description: string
          price: number
          duration: number
          images: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          professional_id: string
          name: string
          description: string
          price: number
          duration: number
          images?: string[]
        }
        Update: {
          id?: string
          created_at?: string
          professional_id?: string
          name?: string
          description?: string
          price?: number
          duration?: number
          images?: string[]
        }
      }
      appointments: {
        Row: {
          id: string
          created_at: string
          professional_id: string
          service_id: string
          client_name: string
          client_email: string
          client_phone: string
          date: string
          time_slot_id: string
          status: 'pending' | 'confirmed' | 'cancelled'
          notes?: string
        }
        Insert: {
          id?: string
          created_at?: string
          professional_id: string
          service_id: string
          client_name: string
          client_email: string
          client_phone: string
          date: string
          time_slot_id: string
          status?: 'pending' | 'confirmed' | 'cancelled'
          notes?: string
        }
        Update: {
          id?: string
          created_at?: string
          professional_id?: string
          service_id?: string
          client_name?: string
          client_email?: string
          client_phone?: string
          date?: string
          time_slot_id?: string
          status?: 'pending' | 'confirmed' | 'cancelled'
          notes?: string
        }
      }
      availability: {
        Row: {
          id: string
          created_at: string
          professional_id: string
          day: number
          slots: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          professional_id: string
          day: number
          slots: string[]
        }
        Update: {
          id?: string
          created_at?: string
          professional_id?: string
          day?: number
          slots?: string[]
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

export type Professional = Database['public']['Tables']['professionals']['Row']
export type Service = Database['public']['Tables']['services']['Row']
export type Appointment = Database['public']['Tables']['appointments']['Row']
export type Availability = Database['public']['Tables']['availability']['Row'] 