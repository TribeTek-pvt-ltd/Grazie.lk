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
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    description: string
                    price: number
                    stock?: number
                    category?: string | null
                    material?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    description?: string
                    price?: number
                    stock?: number
                    category?: string | null
                    material?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            product_images: {
                Row: {
                    id: string
                    product_id: string
                    image_url: string
                    is_primary: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    product_id: string
                    image_url: string
                    is_primary?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    product_id?: string
                    image_url?: string
                    is_primary?: boolean
                    created_at?: string
                }
            }
        }
    }
}
