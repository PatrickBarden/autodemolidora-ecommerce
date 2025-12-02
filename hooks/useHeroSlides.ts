import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export interface HeroSlide {
  id: string;
  order: number;
  is_active: boolean;
  background_image: string;
  tag_text: string;
  title_prefix: string;
  title_highlight: string;
  title_suffix: string;
  description: string;
  button_primary_text: string;
  button_primary_link: string;
  button_secondary_text: string;
  button_secondary_link: string;
}

export const useHeroSlides = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true });

      if (error) throw error;
      
      setSlides(data || []);
    } catch (err) {
      console.error('Error fetching hero slides:', err);
      setError('Erro ao carregar slides');
      setSlides([]);
    } finally {
      setLoading(false);
    }
  };

  return { slides, loading, error, refetch: fetchSlides };
};
