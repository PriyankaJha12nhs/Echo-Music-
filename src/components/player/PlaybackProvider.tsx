import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Song } from '../../services/mockMusicService';

interface PlaybackContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  queue: Song[];
  addToQueue: (song: Song) => void;
  next: () => void;
  previous: () => void;
}

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export function PlaybackProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [queue, setQueue] = useState<Song[]>([]);
  const [downloadedSongs, setDownloadedSongs] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('echo_downloads');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleDownload = (songId: string) => {
    setDownloadedSongs(prev => {
      const next = new Set(prev);
      if (next.has(songId)) next.delete(songId);
      else next.add(songId);
      localStorage.setItem('echo_downloads', JSON.stringify([...next]));
      return next;
    });
  };

  const isDownloaded = (songId: string) => downloadedSongs.has(songId);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const audio = audioRef.current;

    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => next();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  const playSong = (song: Song) => {
    if (audioRef.current) {
      if (currentSong?.id === song.id) {
        togglePlay();
        return;
      }
      setCurrentSong(song);
      audioRef.current.src = song.url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (audioRef.current && currentSong) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const setVolume = (v: number) => {
    if (audioRef.current) {
      audioRef.current.volume = v;
      setVolumeState(v);
    }
  };

  const addToQueue = (song: Song) => {
    setQueue(prev => [...prev, song]);
  };

  const next = () => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      setQueue(prev => prev.slice(1));
      playSong(nextSong);
    }
  };

  const previous = () => {
    // Basic implementation: just restart current song if > 3s, else nothing for now
    if (audioRef.current && audioRef.current.currentTime > 3) {
      seek(0);
    }
  };

  return (
    <PlaybackContext.Provider value={{
      currentSong, isPlaying, progress, duration, volume,
      playSong, togglePlay, seek, setVolume, queue, addToQueue,
      next, previous, toggleDownload, isDownloaded, downloadedSongs: Array.from(downloadedSongs)
    }}>
      {children}
    </PlaybackContext.Provider>
  );
}

export function usePlayback() {
  const context = useContext(PlaybackContext);
  if (!context) throw new Error('usePlayback must be used within PlaybackProvider');
  return context;
}
