/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PlaybackProvider } from './components/player/PlaybackProvider';
import { Shell } from './components/layout/Shell';
import { Home } from './views/Home';
import { Search } from './views/Search';
import { Library } from './views/Library';
import { Settings } from './views/Settings';
import { Login } from './views/Login';
import { AuthProvider, useAuth } from './components/auth/AuthProvider';
import { ThemeProvider } from './components/theme/ThemeProvider';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="h-screen w-screen bg-black flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <PlaybackProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Shell /></ProtectedRoute>}>
                <Route index element={<Home />} />
                <Route path="search" element={<Search />} />
                <Route path="library" element={<Library />} />
                <Route path="library/downloads" element={<Library tab="Downloads" />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PlaybackProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

