"use client";

import { useState } from 'react';
import Button from '@/components/atoms/Button';
import { Lock } from 'lucide-react';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.reload(); 
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-surface-container-low">
      <div className="text-center mb-8">
        <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <h1 className="font-display text-2xl font-bold text-primary">Admin Access</h1>
        <p className="text-on-secondary-container text-sm mt-2">Enter the admin password to manage products.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            className="w-full px-4 py-3 bg-surface rounded-xl border border-outline/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            required
          />
        </div>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button type="submit" className="w-full justify-center" disabled={loading}>
          {loading ? 'Authenticating...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}
