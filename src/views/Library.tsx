import React, { useState } from 'react';
import { Library as LibraryIcon, Music, Disc, User, ListMusic, Mic2, Download, Import, Plus, Heart, Trash2, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { usePlayback } from '../components/player/PlaybackProvider';
import { mockMusicService, Song } from '../services/mockMusicService';

export function Library({ tab }: { tab?: string }) {
  const [activeTab, setActiveTab] = useState(tab || 'Playlists');
  const { downloadedSongs, playSong, toggleDownload, currentSong, isPlaying } = usePlayback();
  const [allSongs, setAllSongs] = React.useState<Song[]>([]);

  React.useEffect(() => {
    mockMusicService.getSongs().then(setAllSongs);
  }, []);

  const downloadedList = allSongs.filter(s => downloadedSongs.includes(s.id));

  const tabs = [
    { name: 'Playlists', icon: ListMusic },
    { name: 'Songs', icon: Music },
    { name: 'Albums', icon: Disc },
    { name: 'Artists', icon: User },
    { name: 'Downloads', icon: Download },
  ];

  return (
    <div className="p-6 md:p-10 w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Library</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20">
            <Plus size={18} />
            New Playlist
          </button>
          <button className="p-2.5 bg-surface-variant/50 rounded-full hover:bg-surface-variant transition-colors group" title="Import from Spotify">
            <Import size={20} className="group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
        {tabs.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap",
              activeTab === tab.name 
                ? "bg-primary/20 text-primary border border-primary/30" 
                : "bg-surface-variant/30 text-on-surface/60 hover:bg-surface-variant/50 border border-transparent"
            )}
          >
            <tab.icon size={18} />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-4xl">
        {activeTab === 'Playlists' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div className="group cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-3 shadow-xl group-hover:scale-[1.02] transition-transform">
                <Heart size={48} fill="white" className="text-white" />
              </div>
              <h4 className="font-semibold">Liked Songs</h4>
              <p className="text-xs text-on-surface/50">Auto-playlist • 128 songs</p>
            </div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-square bg-surface-variant/50 rounded-2xl flex items-center justify-center mb-3 shadow-xl group-hover:scale-[1.02] transition-transform relative overflow-hidden">
                  <div className="grid grid-cols-2 grid-rows-2 w-full h-full opacity-40 group-hover:opacity-60 transition-opacity">
                    <div className="bg-primary/20" />
                    <div className="bg-secondary/20" />
                    <div className="bg-on-surface/5" />
                    <div className="bg-primary/10" />
                  </div>
                  <ListMusic size={40} className="absolute text-on-surface/40 group-hover:text-primary transition-colors" />
                </div>
                <h4 className="font-semibold">My Playlist #{i}</h4>
                <p className="text-xs text-on-surface/50">Playlist • {i * 12} songs</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Downloads' && (
          <div className="space-y-1">
            {downloadedList.length > 0 ? downloadedList.map((song, i) => (
              <motion.div 
                key={song.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 group border border-transparent hover:border-white/5 transition-all"
              >
                <div 
                  onClick={() => playSong(song)}
                  className="relative w-12 h-12 rounded-lg overflow-hidden cursor-pointer shadow-lg active:scale-95 transition-transform"
                >
                  <img src={song.artwork} className="w-full h-full object-cover" />
                  <div className={cn(
                    "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                    currentSong?.id === song.id && isPlaying && "opacity-100"
                  )}>
                    <Play size={20} fill="white" className="text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate">{song.title}</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{song.artist}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase border border-blue-500/20">Offline</span>
                  <button 
                    onClick={() => toggleDownload(song.id)}
                    className="p-2 text-white/20 hover:text-red-400 transition-colors"
                    title="Remove download"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            )) : (
              <div className="py-20 flex flex-col items-center justify-center text-white/20">
                <Download size={64} className="mb-4 opacity-10" />
                <p className="font-bold">No offline content</p>
                <p className="text-sm">Songs you download will appear here</p>
              </div>
            )}
          </div>
        )}

        {activeTab !== 'Playlists' && activeTab !== 'Downloads' && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-on-surface/20">
            <LibraryIcon size={64} className="mb-4 opacity-10" />
            <p className="text-lg">Nothing here yet</p>
            <p className="text-sm">Start adding {activeTab.toLowerCase()} to your library</p>
          </div>
        )}
      </div>
    </div>
  );
}
