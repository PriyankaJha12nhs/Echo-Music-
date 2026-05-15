export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  artwork: string;
  duration: number; // in seconds
  url: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  year: number;
}

export interface Artist {
  id: string;
  name: string;
  avatar: string;
  genre: string;
}

const MOCK_SONGS: Song[] = [
  {
    id: '1',
    title: 'Midnight City',
    artist: 'M83',
    album: 'Hurry Up, We\'re Dreaming',
    artwork: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop',
    duration: 243,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Starboy',
    artist: 'The Weeknd',
    album: 'Starboy',
    artwork: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=300&h=300&fit=crop',
    duration: 230,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    artwork: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop',
    duration: 203,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: '4',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    duration: 200,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: '5',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    artwork: 'https://images.unsplash.com/photo-1514525253361-bee8718a74a9?w=300&h=300&fit=crop',
    duration: 238,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
];

const MOCK_ALBUMS: Album[] = [
  { id: 'a1', title: 'After Hours', artist: 'The Weeknd', artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', year: 2020 },
  { id: 'a2', title: 'Future Nostalgia', artist: 'Dua Lipa', artwork: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop', year: 2020 },
  { id: 'a3', title: 'Dreamland', artist: 'Glass Animals', artwork: 'https://images.unsplash.com/photo-1514525253361-bee8718a74a9?w=300&h=300&fit=crop', year: 2020 },
];

export const mockMusicService = {
  getSongs: () => Promise.resolve(MOCK_SONGS),
  getAlbums: () => Promise.resolve(MOCK_ALBUMS),
  search: (query: string) => {
    const lowerQuery = query.toLowerCase();
    return Promise.resolve(
      MOCK_SONGS.filter(s => s.title.toLowerCase().includes(lowerQuery) || s.artist.toLowerCase().includes(lowerQuery))
    );
  },
};
