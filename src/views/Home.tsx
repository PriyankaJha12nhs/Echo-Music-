import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Play, MoreVertical, Heart, Share2, Disc, Mic2, Radio, Music2, TrendingUp, Sparkles, Download } from 'lucide-react';
import { Song, Album, mockMusicService } from '../services/mockMusicService';
import { usePlayback } from '../components/player/PlaybackProvider';
import { cn } from '../lib/utils';

export function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const { playSong, currentSong, isPlaying, isDownloaded } = usePlayback();

  useEffect(() => {
    mockMusicService.getSongs().then(setSongs);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min"
    >
      {/* Hero / Personal Mix */}
      <motion.div 
        variants={item}
        className="md:col-span-8 md:row-span-3 h-[300px] md:h-auto rounded-[32px] bg-gradient-to-br from-[#ED5564] to-[#7b2c34] p-8 flex flex-col justify-end relative group cursor-pointer overflow-hidden"
      >
        <div className="absolute top-6 right-6 p-4 bg-white/20 backdrop-blur-md rounded-full shadow-lg group-hover:scale-110 transition-transform">
           <Play size={24} fill="white" className="text-white" />
        </div>
        <p className="text-white/60 uppercase text-xs font-bold tracking-[0.2em] mb-2">Personal Mix</p>
        <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Late Night<br/>Grooves</h2>
        <p className="text-white/80 max-w-sm text-sm">Based on your listening history and Spotify imports.</p>
      </motion.div>

      {/* Recognition Widget */}
      <motion.div 
        variants={item}
        className="md:col-span-4 md:row-span-2 rounded-[32px] bg-[#1a1a1a] border border-white/5 p-8 flex flex-col items-center justify-center text-center hover:bg-[#222] transition-all group cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Mic2 size={32} className="text-blue-400" />
        </div>
        <h3 className="text-lg font-bold">Recognition</h3>
        <p className="text-white/40 text-xs mt-1">Identify music playing nearby</p>
      </motion.div>

      {/* Stats Widget */}
      <motion.div 
        variants={item}
        className="md:col-span-2 md:row-span-1 rounded-[32px] bg-[#121212] border border-white/5 p-6 flex flex-col justify-between"
      >
        <span className="text-3xl font-bold text-[#ED5564]">420</span>
        <p className="text-[10px] uppercase font-bold text-white/40 leading-tight tracking-wider">Hours Streamed</p>
      </motion.div>

      {/* Import Button */}
      <motion.div 
        variants={item}
        className="md:col-span-2 md:row-span-1 rounded-[32px] bg-spotify/10 border border-spotify/20 p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-spotify/20 transition-colors group"
      >
        <TrendingUp size={32} className="text-spotify mb-2 group-hover:scale-110 transition-transform" />
        <span className="text-[10px] font-bold text-spotify tracking-widest uppercase">Sync</span>
      </motion.div>

      {/* Recent Activity */}
      <motion.div 
        variants={item}
        className="md:col-span-5 md:row-span-3 rounded-[32px] bg-[#1a1a1a] border border-white/5 p-6 flex flex-col gap-4"
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Recent Activity</h4>
          <button className="text-xs text-[#ED5564] font-bold">View All</button>
        </div>
        <div className="flex flex-col gap-1">
          {songs.slice(0, 4).map(song => (
            <div 
              key={song.id}
              onClick={() => playSong(song)}
              className="flex items-center gap-4 hover:bg-white/5 rounded-2xl p-2 cursor-pointer transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-lg">
                <img src={song.artwork} alt={song.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{song.title}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-white/40 truncate uppercase tracking-tighter">{song.artist}</p>
                  {isDownloaded(song.id) && <Download size={10} className="text-blue-400" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Lyrics Snippet */}
      <motion.div 
        variants={item}
        className="md:col-span-7 md:row-span-1 rounded-[32px] bg-[#1a1a1a] border border-white/5 px-8 flex items-center gap-6 overflow-hidden min-h-[80px]"
      >
         <Mic2 size={24} className="text-yellow-400 shrink-0" />
         <p className="text-lg italic font-serif text-white/70 truncate">"But I'm a creep, I'm a weirdo, what the hell am I doing here?"</p>
      </motion.div>

       {/* Top Charts */}
       <motion.div 
        variants={item}
        className="md:col-span-3 md:row-span-2 rounded-[32px] bg-gradient-to-t from-[#222] to-[#111] border border-white/5 p-6 flex flex-col justify-between overflow-hidden"
       >
          <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest">Top Charts</h4>
          <div className="flex -space-x-4 mt-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-16 h-16 rounded-full border-4 border-[#111] bg-gray-700 overflow-hidden shadow-2xl">
                 <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000}?w=100&h=100&fit=crop`} alt="chart" />
              </div>
            ))}
          </div>
          <p className="text-sm font-bold mt-2">Global Top 50</p>
       </motion.div>

       {/* Featured / Community */}
       <motion.div 
        variants={item}
        className="md:col-span-4 md:row-span-2 rounded-[32px] bg-primary p-8 text-black flex flex-col justify-between group cursor-pointer"
       >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase opacity-60">Trending</p>
              <h4 className="text-2xl font-black leading-tight">Frank Ocean<br/>Channel Orange</h4>
            </div>
            <div className="w-12 h-12 bg-black shadow-lg rounded-full flex items-center justify-center text-white">
              <Disc size={24} strokeWidth={2} />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
             <div className="px-3 py-1 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-wider">Listen Now</div>
          </div>
       </motion.div>
    </motion.div>
  );
}
