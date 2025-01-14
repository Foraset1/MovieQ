import Link from 'next/link';
import Image from 'next/image';
import Search from './Search';
import rock from '@/app/assets/rock.png';

const Header = () => {
  return (
    <header className='px-2 py-4'>
      <nav className='m-auto flex max-w-7xl items-center justify-between'>
        <div className='flex items-center gap-x-5'>
          <Link href={'/'}>
            <Image src={rock} alt='' loading='eager' priority aria-hidden='true' />
          </Link>
          <div className='flex items-center'>
            <Link
              href={'/roulette'}
              className='rounded-[90px] border border-white px-5 py-2.5 text-sm transition hover:bg-inherit'
            >
              Ruletka
            </Link>

            <Search />
          </div>
        </div>
        <div>
          <Link
            href={'/tinder'}
            className='rounded-[90px] border border-[#EA7D00] bg-[#EA7D00] px-5 py-2.5 text-sm transition hover:bg-inherit'
          >
            KinoTinder
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
