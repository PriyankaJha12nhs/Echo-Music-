
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export const authService = {
  login: (email: string): Promise<{ user: User; token: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 'u1',
            name: email.split('@')[0],
            email: email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
          },
          token: 'mock-jwt-token-' + Date.now()
        });
      }, 1000);
    });
  },
  logout: () => {
    localStorage.removeItem('echo_token');
    localStorage.removeItem('echo_user');
  },
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('echo_user');
    return user ? JSON.parse(user) : null;
  }
};
