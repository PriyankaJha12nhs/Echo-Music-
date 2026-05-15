
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../components/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Music, ArrowRight, Mail, Lock, Sparkles } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    await login(email);
    navigate('/');
  };

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-x-0 top-0 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2" />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-card rounded-[40px] border border-white/10 p-10 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center text-white mb-6 shadow-xl shadow-primary/30">
            <Music size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Echo Music</h1>
          <p className="text-white/40 text-sm font-medium">Your personal music sanctuary</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl p-4 focus-within:border-primary/50 transition-colors">
              <Mail size={18} className="text-white/20 mr-3" />
              <input 
                type="email" 
                placeholder="you@example.com"
                className="bg-transparent outline-none flex-1 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Password</label>
            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl p-4 focus-within:border-primary/50 transition-colors">
              <Lock size={18} className="text-white/20 mr-3" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="bg-transparent outline-none flex-1 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center gap-2 font-bold text-black active:scale-95 transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in...' : (
              <>
                Sign In
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-xs text-white/30">Don't have an account? <span className="text-primary font-bold cursor-pointer hover:underline">Create one</span></p>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-[10px] text-primary font-bold uppercase tracking-widest">
            <Sparkles size={12} />
            Mock Authentication Enabled
          </div>
        </div>
      </motion.div>
    </div>
  );
}
