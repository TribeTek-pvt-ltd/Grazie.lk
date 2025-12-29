// src/types/supabase.ts
import { User } from '@supabase/supabase-js';

// Product types
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string | null;
    material: string | null;
    created_at: string;
    updated_at: string;
}

export interface ProductImage {
    id: string;
    product_id: string;
    image_url: string;
    is_primary: boolean;
    created_at: string;
}

export interface ProductWithImages extends Product {
    images: ProductImage[];
}

// Admin user metadata - extends Supabase UserMetadata
export interface AdminUserMetadata {
    role?: 'admin';
    [key: string]: any;
}

// Supabase Auth User with admin metadata
export type AuthUser = User & {
    user_metadata: AdminUserMetadata;
};


// API Response types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface ProductCreateInput {
    name: string;
    description: string;
    price: number;
    stock: number;
    category?: string;
    material?: string;
    image: File;
}
