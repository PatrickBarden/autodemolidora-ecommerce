import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Product } from '../types';

// Mapeia os dados do Supabase para o formato do frontend
const mapProductFromDB = (dbProduct: any): Product => {
  // Parse images - pode vir como array ou string JSON
  let images: string[] = [];
  if (dbProduct.images) {
    try {
      images = Array.isArray(dbProduct.images) ? dbProduct.images : JSON.parse(dbProduct.images);
    } catch {
      images = [];
    }
  }
  
  return {
    id: dbProduct.id,
    code: dbProduct.code || '',
    name: dbProduct.name,
    brand: dbProduct.brand || '',
    price: dbProduct.price,
    originalPrice: dbProduct.original_price || undefined,
    category: dbProduct.category,
    image: dbProduct.image_url || '/placeholder.jpg',
    images: images.length > 0 ? images : undefined,
    description: dbProduct.description || '',
    compatibility: dbProduct.compatibility || [],
    specs: dbProduct.specs || {},
    stock: dbProduct.stock || 0,
    isNew: dbProduct.is_new || false
  };
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setProducts((data || []).map(mapProductFromDB));
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: fetchProducts };
};

export const useProductsByCategory = (categoryId: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (categoryId !== 'all') {
        query = query.eq('category', categoryId);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      setProducts((data || []).map(mapProductFromDB));
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error };
};

export const useProductSearch = (query: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      searchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  const searchProducts = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,code.ilike.%${query}%,brand.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setProducts((data || []).map(mapProductFromDB));
    } catch (err) {
      console.error('Error searching products:', err);
      setError('Erro ao buscar produtos');
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error };
};

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setProduct(data ? mapProductFromDB(data) : null);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Produto não encontrado');
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, error };
};
