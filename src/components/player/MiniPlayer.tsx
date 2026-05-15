import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Heart } from 'lucide-react';
import { usePlayback } from './PlaybackProvider';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export function MiniPlayer() {
  const { currentSong, isPlaying, togglePlay, progress, duration, next, previous } = usePlayback();

  if (!currentSong) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute bottom-20 md:bottom-2 left-0 right-0 z-50 pointer-events-none"
    >
      <div className="mx-6 mb-2 h-[64px] bg-[#222]/80 backdrop-blur-2xl rounded-2xl flex items-center px-4 gap-4 border border-white/5 pointer-events-auto shadow-2xl">
        <div className="w-10 h-10 rounded bg-[#333] shrink-0 overflow-hidden shadow-lg">
          <img src={currentSong.artwork} alt={currentSong.title} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold truncate group-hover:text-primary transition-colors cursor-pointer">{currentSong.title}</p>
          <p className="text-[10px] text-white/40 truncate uppercase tracking-widest">{currentSong.artist}</p>
        </div>

        <div className="flex items-center gap-4 px-2">
          <button 
            onClick={(e) => { e.stopPropagation(); previous(); }}
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-lg active:scale-95 transition-transform"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <SkipForward size={20} fill="currentColor" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
