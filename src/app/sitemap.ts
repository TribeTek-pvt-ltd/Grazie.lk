import { MetadataRoute } from 'next'
import { supabaseServer } from '@/src/lib/supabaseServer'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://grazie.lk'

    // Fetch all products for dynamic routes
    const { data: products } = await supabaseServer
        .from('products')
        .select('id')

    const productUrls = (products || []).map((product) => ({
        url: `${baseUrl}/products/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/products`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...productUrls,
    ]
}
