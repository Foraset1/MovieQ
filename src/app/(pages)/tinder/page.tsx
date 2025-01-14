'use client';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import RandomFilm from '../../components/RandomFilm';
import { Movie } from '../../types';
import MatchesMovie from '@/app/components/pages/tinder/MatchesMovie';


const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001');
const Page = () => {
  const [roomId, setRoom] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const [userId, setUserId] = useState('');
  const [movie, setMovie] = useState<Movie[] | null>(null);
  const [matchesMovie, setMatchesMovie] = useState<Movie[] | []>([]);
  const [num, setNum] = useState(0);

  // Generowanie losowego identyfikatora użytkownika
  function generateUserId() {
    return `user-${Math.floor(Math.random() * 1000)}`;
  }

  // Dołączanie do pokoju
  const joinRoom = () => {
    if (roomId !== '') {
      const userId = generateUserId();
      setUserId(userId);
      socket.emit('join_room', userId, roomId);
    }
  };

  // Like
  const likeMovie = (movie: Movie) => {
    if (roomId !== '' && userId !== '') {
      socket.emit('like_movie', userId, roomId, movie);
      setNum((prevState) => prevState + 1);
    }
  };

  // Skip filmu
  const skipMovie = () => {
    setNum((prevState) => prevState + 1);
  };

  useEffect(() => {
    // Obsługa zdarzeń z serwera
    socket.on('room_full', (data) => {
      setMessageReceived(data.message);
    });

    socket.on('user_joined', (data) => {
      setMessageReceived(data.message);
    });

    // Pokazujemy film pobrany z serwera
    socket.on('show_movie', (data: Movie[]) => {
      setMovie(data);
    });

    
    socket.on('match', (data: Movie) => {
      setMatchesMovie((prevState) => [...prevState, data]);
    });

    return () => {
      socket.off('room_full');
      socket.off('user_joined');
      socket.off('show_movie');
      socket.off('match');
    };
  }, []);
  console.log(movie);

  return (
    <div className='relative'>
      {!movie && (
        <>
          <input
            type='text'
            className='text-black'
            placeholder='Room Number...'
            onChange={(event) => setRoom(event.target.value)}
          />
          <button onClick={joinRoom} className='rounded-r-lg border p-2'>
            Dołączenie do sesji
          </button>
        </>
      )}
      {movie && <RandomFilm likeMovie={likeMovie} skipMovie={skipMovie} movie={movie[num]} />}

      <div className='mt-2'>{matchesMovie.length > 0 && <MatchesMovie movies={matchesMovie} />}</div>

      {messageReceived && <p> Message: {messageReceived} </p>}
    </div>
  );
};

export default Page;
