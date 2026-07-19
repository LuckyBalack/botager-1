// Database Types for WRM Application
// Generated from supabase/migrations/001_initial_schema.sql

export type Database = {
  public: {
    Tables: {
      buildings: {
        Row: {
          id: string
          name: string
          location: string
          total_units: number
          occupied_units: number
          open_maintenance_tickets: number
          monthly_revenue: number
          image_url: string | null
          owner_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          location: string
          total_units: number
          occupied_units: number
          open_maintenance_tickets?: number
          monthly_revenue?: number
          image_url?: string
          owner_id?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string
          total_units?: number
          occupied_units?: number
          open_maintenance_tickets?: number
          monthly_revenue?: number
          image_url?: string
          owner_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string
          phone: string | null
          role: string
          building_id: string | null
          telegram_handle: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string
          email: string
          phone?: string
          role?: string
          building_id?: string
          telegram_handle?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string
          role?: string
          building_id?: string
          telegram_handle?: string
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          building_id: string
          room_number: string
          floor: string
          square_footage: number | null
          occupancy_status: string
          lease_status: string | null
          lease_start_date: string | null
          lease_end_date: string | null
          listing_type: string
          base_rent: number | null
          pricing_mode: string
          is_auction: boolean
          current_bid: number | null
          auction_start_time: string | null
          auction_end_time: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          building_id: string
          room_number: string
          floor: string
          square_footage?: number
          occupancy_status?: string
          lease_status?: string
          lease_start_date?: string
          lease_end_date?: string
          listing_type?: string
          base_rent?: number
          pricing_mode?: string
          is_auction?: boolean
          current_bid?: number
          auction_start_time?: string
          auction_end_time?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          building_id?: string
          room_number?: string
          floor?: string
          square_footage?: number
          occupancy_status?: string
          lease_status?: string
          lease_start_date?: string
          lease_end_date?: string
          listing_type?: string
          base_rent?: number
          pricing_mode?: string
          is_auction?: boolean
          current_bid?: number
          auction_start_time?: string
          auction_end_time?: string
          created_at?: string
          updated_at?: string
        }
      }
      tenants: {
        Row: {
          id: string
          user_id: string | null
          building_id: string
          property_id: string
          full_name: string
          email: string | null
          phone: string | null
          company_name: string | null
          outstanding_balance: number
          lease_start: string | null
          lease_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          building_id: string
          property_id: string
          full_name: string
          email?: string
          phone?: string
          company_name?: string
          outstanding_balance?: number
          lease_start?: string
          lease_end?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          building_id?: string
          property_id?: string
          full_name?: string
          email?: string
          phone?: string
          company_name?: string
          outstanding_balance?: number
          lease_start?: string
          lease_end?: string
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          tenant_id: string
          property_id: string
          building_id: string
          invoice_month: string
          base_rent: number | null
          utilities: number
          other_charges: number
          total_amount: number
          amount_paid: number
          payment_date: string | null
          status: string
          due_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          property_id: string
          building_id: string
          invoice_month: string
          base_rent?: number
          utilities?: number
          other_charges?: number
          total_amount: number
          amount_paid?: number
          payment_date?: string
          status?: string
          due_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          property_id?: string
          building_id?: string
          invoice_month?: string
          base_rent?: number
          utilities?: number
          other_charges?: number
          total_amount?: number
          amount_paid?: number
          payment_date?: string
          status?: string
          due_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      receipts: {
        Row: {
          id: string
          invoice_id: string
          tenant_id: string
          payment_method: string | null
          amount_paid: number
          transaction_reference: string | null
          payment_date: string
          created_at: string
        }
        Insert: {
          id?: string
          invoice_id: string
          tenant_id: string
          payment_method?: string
          amount_paid: number
          transaction_reference?: string
          payment_date: string
          created_at?: string
        }
        Update: {
          id?: string
          invoice_id?: string
          tenant_id?: string
          payment_method?: string
          amount_paid?: number
          transaction_reference?: string
          payment_date?: string
          created_at?: string
        }
      }
      maintenance_tickets: {
        Row: {
          id: string
          building_id: string
          property_id: string | null
          tenant_id: string | null
          category: string
          description: string
          priority: string
          status: string
          submitted_date: string
          resolved_date: string | null
          assigned_to: string | null
          photo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          building_id: string
          property_id?: string
          tenant_id?: string
          category: string
          description: string
          priority?: string
          status?: string
          submitted_date?: string
          resolved_date?: string
          assigned_to?: string
          photo_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          building_id?: string
          property_id?: string
          tenant_id?: string
          category?: string
          description?: string
          priority?: string
          status?: string
          submitted_date?: string
          resolved_date?: string
          assigned_to?: string
          photo_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      leases: {
        Row: {
          id: string
          tenant_id: string
          property_id: string
          building_id: string
          start_date: string
          end_date: string
          base_rent: number | null
          start_date_ec: string | null
          end_date_ec: string | null
          lease_document_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          property_id: string
          building_id: string
          start_date: string
          end_date: string
          base_rent?: number
          start_date_ec?: string
          end_date_ec?: string
          lease_document_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          property_id?: string
          building_id?: string
          start_date?: string
          end_date?: string
          base_rent?: number
          start_date_ec?: string
          end_date_ec?: string
          lease_document_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      marketplace_listings: {
        Row: {
          id: string
          building_id: string
          property_id: string | null
          space_type: string
          title: string
          description: string | null
          price: number | null
          size_sqm: number | null
          amenities: string[] | null
          location: string | null
          images_urls: string[] | null
          is_auction: boolean
          current_bid: number | null
          auction_start_time: string | null
          auction_end_time: string | null
          views_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          building_id: string
          property_id?: string
          space_type: string
          title: string
          description?: string
          price?: number
          size_sqm?: number
          amenities?: string[]
          location?: string
          images_urls?: string[]
          is_auction?: boolean
          current_bid?: number
          auction_start_time?: string
          auction_end_time?: string
          views_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          building_id?: string
          property_id?: string
          space_type?: string
          title?: string
          description?: string
          price?: number
          size_sqm?: number
          amenities?: string[]
          location?: string
          images_urls?: string[]
          is_auction?: boolean
          current_bid?: number
          auction_start_time?: string
          auction_end_time?: string
          views_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      bids: {
        Row: {
          id: string
          listing_id: string
          bidder_id: string
          bid_amount: number
          bid_time: string
          created_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          bidder_id: string
          bid_amount: number
          bid_time?: string
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          bidder_id?: string
          bid_amount?: number
          bid_time?: string
          created_at?: string
        }
      }
      subscription_plans: {
        Row: {
          id: string
          name: string
          price: number | null
          period: string | null
          features: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          price?: number
          period?: string
          features?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          price?: number
          period?: string
          features?: string[]
          created_at?: string
        }
      }
      subscription_payments: {
        Row: {
          id: string
          building_owner_id: string
          plan_id: string
          amount: number | null
          payment_status: string
          payment_date: string | null
          renewal_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          building_owner_id: string
          plan_id: string
          amount?: number
          payment_status?: string
          payment_date?: string
          renewal_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          building_owner_id?: string
          plan_id?: string
          amount?: number
          payment_status?: string
          payment_date?: string
          renewal_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      workspace_submissions: {
        Row: {
          id: string
          building_id: string | null
          owner_name: string
          owner_email: string | null
          building_name: string
          location: string | null
          description: string | null
          document_count: number
          status: string
          submission_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          building_id?: string
          owner_name: string
          owner_email?: string
          building_name: string
          location?: string
          description?: string
          document_count?: number
          status?: string
          submission_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          building_id?: string
          owner_name?: string
          owner_email?: string
          building_name?: string
          location?: string
          description?: string
          document_count?: number
          status?: string
          submission_date?: string
          created_at?: string
        }
      }
      tax_rules: {
        Row: {
          id: string
          name: string
          value: number
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          value: number
          description?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          value?: number
          description?: string
          created_at?: string
          updated_at?: string
        }
      }
      financial_reports: {
        Row: {
          id: string
          building_id: string
          month: string | null
          total_revenue: number | null
          total_expenses: number | null
          outstanding_payments: number | null
          maintenance_costs: number | null
          created_at: string
        }
        Insert: {
          id?: string
          building_id: string
          month?: string
          total_revenue?: number
          total_expenses?: number
          outstanding_payments?: number
          maintenance_costs?: number
          created_at?: string
        }
        Update: {
          id?: string
          building_id?: string
          month?: string
          total_revenue?: number
          total_expenses?: number
          outstanding_payments?: number
          maintenance_costs?: number
          created_at?: string
        }
      }
      credit_partners: {
        Row: {
          id: string
          name: string
          contact_person: string | null
          email: string | null
          phone: string | null
          credit_limit: number
          used_credit: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          contact_person?: string
          email?: string
          phone?: string
          credit_limit: number
          used_credit?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          contact_person?: string
          email?: string
          phone?: string
          credit_limit?: number
          used_credit?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      credit_requests: {
        Row: {
          id: string
          tenant_id: string
          amount_requested: number
          purpose: string | null
          status: string
          request_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          amount_requested: number
          purpose?: string
          status?: string
          request_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          amount_requested?: number
          purpose?: string
          status?: string
          request_date?: string
          created_at?: string
        }
      }
      utility_readings: {
        Row: {
          id: string
          property_id: string
          tenant_id: string | null
          previous_reading: number | null
          current_reading: number | null
          rate_per_unit: number | null
          reading_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          tenant_id?: string
          previous_reading?: number
          current_reading?: number
          rate_per_unit?: number
          reading_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          tenant_id?: string
          previous_reading?: number
          current_reading?: number
          rate_per_unit?: number
          reading_date?: string
          created_at?: string
        }
      }
      waitlist_leads: {
        Row: {
          id: string
          name: string
          phone: string | null
          email: string | null
          desired_size: string | null
          budget_range: string | null
          desired_floor: string | null
          date_joined: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          phone?: string
          email?: string
          desired_size?: string
          budget_range?: string
          desired_floor?: string
          date_joined?: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          email?: string
          desired_size?: string
          budget_range?: string
          desired_floor?: string
          date_joined?: string
          status?: string
          created_at?: string
        }
      }
    }
  }
}
