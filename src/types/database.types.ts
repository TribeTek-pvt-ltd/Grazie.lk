// Auto-generated placeholder - run `npx supabase gen types typescript` to generate
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
            products: {
                Row: {
                    id: string
                    name: string
                    description: string
                    price: number
                    stock: number
                    category: string | null
                    material: string | null
                    delivey_days: number | null
                }
                Insert: {
                    id?: string
                    name: string
                    description: string
                    price: number
                    stock?: number
                    category?: string | null
                    material?: string | null
                    delivey_days?: number | null
                }
                Update: {
                    id?: string
                    name?: string
                    description?: string
                    price?: number
                    stock?: number
                    category?: string | null
                    material?: string | null
                    delivey_days?: number | null
                }
            }
            images: {
                Row: {
                    id: string
                    product_id: string
                    image_url: string[]
                }
                Insert: {
                    id?: string
                    product_id: string
                    image_url: string[]
                }
                Update: {
                    id?: string
                    product_id?: string
                    image_url?: string[]
                }
            }
            Category: {
                Row: {
                    id: string
                    Category: string
                }
                Insert: {
                    id?: string
                    Category: string
                }
                Update: {
                    id?: string
                    Category?: string
                }
            }
        }
    }
}
