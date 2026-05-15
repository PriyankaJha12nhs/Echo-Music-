import React, { useState } from 'react';
import { Settings as SettingsIcon, Moon, Palette, Shield, Info, LogOut, Github, Chrome, Music, Bell, Download, Zap, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useTheme } from '../components/theme/ThemeProvider';
import { useAuth } from '../components/auth/AuthProvider';

export function Settings() {
  const { accentColor, setAccentColor, isPureBlack, setPureBlack, fontFamily, setFontFamily } = useTheme();
  const { user, logout } = useAuth();
  const [customHex, setCustomHex] = useState('');

  const SettingRow = ({ icon: Icon, label, description, children }: any) => (
    <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded-2xl">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-[#1a1a1a] rounded-xl border border-white/5">
          <Icon size={20} className="text-white/80" />
        </div>
        <div>
          <h4 className="font-medium text-sm">{label}</h4>
          {description && <p className="text-xs text-white/40">{description}</p>}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="p-6 md:p-10 w-full max-w-3xl mx-auto pb-40">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-3 bg-primary/20 rounded-2xl text-primary">
          <SettingsIcon size={28} />
        </div>
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="space-y-8">
        {/* Appearance */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold px-4 mb-4">Appearance</h2>
          <div className="bg-[#1a1a1a] rounded-3xl overflow-hidden border border-white/5">
            <SettingRow 
              icon={Moon} 
              label="Pure black mode" 
              description="Optimized for OLED screens"
            >
              <button 
                onClick={() => setPureBlack(!isPureBlack)}
                className={cn(
                  "w-12 h-6 rounded-full relative transition-colors",
                  isPureBlack ? "bg-primary" : "bg-white/20"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                  isPureBlack ? "left-7" : "left-1"
                )} />
              </button>
            </SettingRow>

            <SettingRow 
              icon={Palette} 
              label="Accent color" 
              description="Choose your primary theme seed"
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {['#ED5564', '#4FC3F7', '#81C784', '#FFB74D'].map(color => (
                    <button 
                      key={color}
                      onClick={() => setAccentColor(color)}
                      className={cn(
                        "w-6 h-6 rounded-full border-2 transition-all",
                        accentColor === color ? "border-white scale-110" : "border-transparent"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="w-[1px] h-4 bg-white/10" />
                <input 
                  type="text"
                  placeholder="#Hex"
                  className="w-16 bg-white/5 border border-white/10 rounded-lg p-1 text-[10px] uppercase text-center outline-none focus:border-primary/50"
                  value={customHex}
                  onChange={(e) => {
                    setCustomHex(e.target.value);
                    if (e.target.value.match(/^#[0-9a-f]{6}$/i)) {
                      setAccentColor(e.target.value);
                    }
                  }}
                />
              </div>
            </SettingRow>

            <SettingRow 
              icon={Info} 
              label="Font Family" 
              description="Select UI typography"
            >
              <div className="flex bg-white/5 rounded-xl p-1 gap-1">
                {(['Poppins', 'System'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFontFamily(f)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                      fontFamily === f ? "bg-white text-black" : "text-white/40 hover:text-white"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </SettingRow>
          </div>
        </section>

        {/* Content */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold px-4 mb-4">Content & Streaming</h2>
          <div className="bg-[#1a1a1a] rounded-3xl overflow-hidden border border-white/5">
            <SettingRow icon={Music} label="Playback quality" description="Set your preferred audio bitrate">
              <span className="text-sm font-medium">Extreme</span>
            </SettingRow>
            <SettingRow icon={Download} label="Download quality" description="Manage offline storage settings">
              <span className="text-sm font-medium">Standard</span>
            </SettingRow>
            <SettingRow icon={Zap} label="Crossfade" description="Smooth transitions between tracks">
              <span className="text-sm font-medium">12s</span>
            </SettingRow>
          </div>
        </section>

        {/* Account */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold px-4 mb-4">Account</h2>
          <div className="bg-[#1a1a1a] rounded-3xl overflow-hidden border border-white/5">
            <div className="p-4 flex items-center gap-4">
              <img 
                src={user?.avatar} 
                alt="avatar"
                className="h-12 w-12 rounded-full border border-white/10"
              />
              <div className="flex-1">
                <h4 className="font-bold">{user?.name}</h4>
                <p className="text-xs text-white/40">Free Plan • {user?.email}</p>
              </div>
              <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-xl text-xs font-bold transition-colors">
                Premium
              </button>
            </div>
            <div className="h-[1px] bg-white/5" />
            <button 
              onClick={logout}
              className="w-full text-left"
            >
              <SettingRow icon={LogOut} label="Log out" description="End your current session" />
            </button>
          </div>
        </section>

        {/* About */}
        <section>
          <div className="flex flex-col items-center gap-4 py-10 opacity-40">
            <div className="flex items-center gap-2">
              <Music size={24} className="text-primary" />
              <span className="font-bold text-xl tracking-tight">Echo Music</span>
            </div>
            <p className="text-xs text-center leading-relaxed">
              v1.0.4-stable (Web/PWA)<br />
              Made with ❤️ in AI Studio
            </p>
            <div className="flex gap-4">
              <Github size={20} />
              <Chrome size={20} />
              <Info size={20} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
