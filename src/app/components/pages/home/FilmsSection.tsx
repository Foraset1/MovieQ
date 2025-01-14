import SwiperMovie from '@/app/components/shared/swiperMovie';
import type { Movie } from '@/app/types';
import Link from 'next/link';
import { fetchMovieData } from '@/app/lib/movieApi';

interface FilmsSectionProps {
  title: string;
  endpoint: string;
}

const FilmsSection = async ({ title, endpoint }: FilmsSectionProps) => {
  let data: Movie[] | null = null;

  try {
    const response = await fetchMovieData(endpoint);
    data = response.results;
  } catch (error) {
    console.error(`Error in ${endpoint} component:`, error);
  }

  return (
    <section>
      <div className='flex items-center justify-between'>
        <h2 className='font-frank text-5xl font-normal'>{title}</h2>
        <Link
          className='leading-4 block border-b border-white font-frank text-xl'
          href={{ pathname: '/searchResults', query: { type: endpoint } }}
        >
          Zobacz więcej
        </Link>
      </div>
      {data && (
        <div className='mt-5'>
          <SwiperMovie movieData={data} />
        </div>
      )}
    </section>
  );
};

export default FilmsSection;