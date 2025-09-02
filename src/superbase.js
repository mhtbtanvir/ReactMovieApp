import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Update search count or insert a new movie record
export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const movieId = movie.id.toString();

    // Check if movie already exists by movie_id
    const { data: existing, error: fetchError } = await supabase
      .from('movieApp')
      .select('*')
      .eq('movie_id', movieId)
      .limit(1);

    if (fetchError) throw fetchError;

    if (existing.length > 0) {
      // Increment count
      const { error: updateError } = await supabase
        .from('movieApp')
        .update({ count: existing[0].count + 1, updated_at: new Date() })
        .eq('movie_id', movieId);

      if (updateError) throw updateError;
    } else {
      // Insert new movie
      const { error: insertError } = await supabase.from('movieApp').insert([
        {
          searchTerm,
          count: 1,
          movie_id: movieId,
          poster_url: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : null,
          title: movie.title || 'Untitled',
        },
      ]);

      if (insertError) throw insertError;
    }
  } catch (error) {
    console.error('Error updating search count:', error.message);
  }
};

// Get top 7 trending movies by count
export const getTrendingMovies = async () => {
  try {
    const { data, error } = await supabase
      .from('movieApp')
      .select('*')
      .order('count', { ascending: false })
      .limit(7);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};
