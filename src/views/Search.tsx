import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Mic, History, Play, Music, User, Disc, Heart, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { Song, mockMusicService } from '../services/mockMusicService';
import { usePlayback } from '../components/player/PlaybackProvider';
import { cn } from '../lib/utils';

export function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Song[]>([]);
  const { playSong, currentSong, isPlaying, toggleDownload, isDownloaded } = usePlayback();

  useEffect(() => {
    if (query.trim()) {
      mockMusicService.search(query).then(setResults);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="p-6 md:p-10 w-full max-w-4xl mx-auto">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative group mb-10"
      >
        <div className="absolute inset-x-0 h-full bg-primary/20 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative flex items-center bg-surface-variant/50 border border-white/10 rounded-2xl p-2 gap-2 focus-within:border-primary/50 transition-colors">
          <SearchIcon className="ml-3 text-on-surface/40" size={20} />
          <input 
            type="text" 
            placeholder="Search songs, artists, albums..."
            className="flex-1 bg-transparent border-none focus:ring-0 px-2 py-2 text-lg outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="p-3 hover:bg-white/5 rounded-xl transition-colors">
            <Mic size={20} className="text-primary" />
          </button>
        </div>
      </motion.div>

      {query.trim() === '' ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <History size={20} className="text-on-surface/40" />
              Recent searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {['M83', 'The Weeknd', 'Dua Lipa', 'Synthwave'].map(tag => (
                <button key={tag} className="px-4 py-2 bg-surface-variant/30 rounded-full text-sm hover:bg-surface-variant transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Browse genres</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { name: 'Pop', color: 'bg-pink-500/20 text-pink-400 border-pink-500/20' },
                { name: 'Chill', color: 'bg-blue-500/20 text-blue-400 border-blue-500/20' },
                { name: 'Electronic', color: 'bg-purple-500/20 text-purple-400 border-purple-500/20' },
                { name: 'Hip Hop', color: 'bg-orange-500/20 text-orange-400 border-orange-500/20' },
                { name: 'Indie', color: 'bg-green-500/20 text-green-400 border-green-500/20' },
                { name: 'Rock', color: 'bg-red-500/20 text-red-400 border-red-500/20' },
              ].map(genre => (
                <button 
                  key={genre.name}
                  className={cn("h-24 rounded-2xl border flex items-end p-4 font-semibold text-lg hover:scale-[1.02] transition-transform", genre.color)}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-2">
          {results.length > 0 ? results.map((song, i) => (
            <motion.div 
              key={song.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => playSong(song)}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-surface-variant/30 group cursor-pointer border border-transparent hover:border-white/5 active:scale-[0.99] transition-all"
            >
              <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                <img src={song.artwork} alt={song.title} className="h-full w-full object-cover" />
                <div className={cn(
                  "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                  currentSong?.id === song.id && isPlaying && "opacity-100"
                )}>
                  <Play size={18} fill="white" className="text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{song.title}</h4>
                <p className="text-xs text-on-surface/40 uppercase tracking-widest">{song.artist}</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleDownload(song.id); }}
                  className={cn("transition-colors", isDownloaded(song.id) ? "text-blue-400" : "text-white/20 hover:text-white")}
                >
                  <Download size={18} />
                </button>
                <button className="text-on-surface/40 hover:text-primary"><Heart size={18} /></button>
              </div>
            </motion.div>
          )) : (
            <div className="flex flex-col items-center justify-center py-20 text-on-surface/30">
              <SearchIcon size={48} className="mb-4 opacity-20" />
              <p>No results found for "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
