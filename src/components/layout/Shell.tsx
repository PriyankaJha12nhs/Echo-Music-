import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, Search, Library, Settings, Disc, Mic2, Radio, PlayCircle, Star, Download, Import, Info, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MiniPlayer } from '../player/MiniPlayer';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../auth/AuthProvider';
import { useTheme } from '../theme/ThemeProvider';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isDesktop?: boolean;
}

const NavItem = ({ to, icon: Icon, label, isDesktop }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) => cn(
      "flex flex-col items-center justify-center gap-1 group transition-colors",
      isDesktop ? "w-full py-4 px-2" : "flex-1 py-3",
      isActive ? "text-[#ED5564]" : "text-white/60 hover:text-white"
    )}
  >
    {({ isActive }) => (
      <>
        <div className={cn(
          "relative p-3 rounded-2xl transition-all duration-300",
          isActive ? "bg-[#ED5564]/10" : "group-hover:bg-white/5"
        )}>
          <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        </div>
        {!isDesktop && (
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-wider transition-all duration-300",
            isActive ? "opacity-100" : "opacity-60"
          )}>
            {label}
          </span>
        )}
      </>
    )}
  </NavLink>
);

export function Shell() {
  const { user } = useAuth();
  
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-white font-sans select-none">
      {/* Navigation Rail (Tablet/Desktop) */}
      <aside className="hidden md:flex flex-col w-[80px] border-r border-white/10 bg-[#0a0a0a] py-6">
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-[#ED5564] flex items-center justify-center text-white shadow-lg shadow-[#ED5564]/20">
            <PlayCircle size={28} fill="currentColor" />
          </div>
        </div>
        
        <nav className="flex flex-col flex-1 items-center gap-4">
          <NavItem to="/" icon={Home} label="Home" isDesktop />
          <NavItem to="/search" icon={Search} label="Search" isDesktop />
          <NavItem to="/library" icon={Library} label="Library" isDesktop />
        </nav>

        <div className="mt-auto items-center flex flex-col">
          <NavItem to="/settings" icon={Settings} label="Settings" isDesktop />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-full overflow-hidden">
        {/* App Bar */}
        <header className="h-[64px] px-8 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold tracking-tight text-white">Echo Music</h1>
            <span className="px-2 py-0.5 rounded bg-[#ED5564]/20 text-[#ED5564] text-[10px] font-bold uppercase tracking-wider">Premium</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 focus-within:border-primary/50 transition-colors">
              <Search size={16} className="text-white/40" />
              <input 
                type="text" 
                placeholder="Search music..." 
                className="bg-transparent border-none text-sm outline-none w-48 text-white/80 placeholder:text-white/20"
              />
            </div>
            <img 
              src={user?.avatar} 
              alt="avatar"
              className="w-10 h-10 rounded-full border border-white/10 hover:border-primary/50 cursor-pointer transition-colors"
              onClick={() => window.location.href = '/settings'}
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scroll-smooth pb-32">
          <Outlet />
        </div>

        {/* Mini Player */}
        <MiniPlayer />

        {/* Bottom Navigation (Mobile) */}
        <nav className="md:hidden flex items-stretch border-t border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl h-[72px] px-2 pb-safe shrink-0">
          <NavItem to="/" icon={Home} label="Home" />
          <NavItem to="/search" icon={Search} label="Search" />
          <NavItem to="/library" icon={Library} label="Library" />
        </nav>
      </main>
    </div>
  );
}
