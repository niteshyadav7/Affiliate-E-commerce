"use client";

import { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  UserCheck, 
  UserX, 
  CheckCircle2, 
  AlertCircle,
  Key
} from 'lucide-react';
import Button from '@/components/atoms/Button';

export default function TeamClient({ currentUser }: { currentUser: string }) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states for adding user
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('editor');
  
  // States for updating password
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editPasswordValue, setEditPasswordValue] = useState('');

  // Toast notifications
  const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' | null }>({
    message: '',
    type: null
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data || []);
      } else {
        showStatus('Failed to load team directory', 'error');
      }
    } catch (err) {
      console.error(err);
      showStatus('Failed to load team directory', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showStatus = (message: string, type: 'success' | 'error') => {
    setStatus({ message, type });
    setTimeout(() => {
      setStatus({ message: '', type: null });
    }, 4000);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newPassword.trim()) {
      showStatus('Username and Password are required', 'error');
      return;
    }

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
          role: newRole
        })
      });

      const data = await res.json();
      if (res.ok) {
        showStatus(`Account for "${newUsername}" created successfully!`, 'success');
        setNewUsername('');
        setNewPassword('');
        setNewRole('editor');
        fetchUsers();
      } else {
        showStatus(data.error || 'Failed to create user', 'error');
      }
    } catch (err) {
      showStatus('An error occurred during account creation', 'error');
    }
  };

  const handleToggleBlock = async (user: any) => {
    if (user.username === currentUser) {
      showStatus('You cannot block your own active session!', 'error');
      return;
    }

    const confirmMsg = user.is_blocked 
      ? `Are you sure you want to unblock "${user.username}"?` 
      : `Are you sure you want to block "${user.username}"?`;

    if (!confirm(confirmMsg)) return;

    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          isBlocked: !user.is_blocked
        })
      });

      const data = await res.json();
      if (res.ok) {
        showStatus(`Account "${user.username}" updated successfully!`, 'success');
        fetchUsers();
      } else {
        showStatus(data.error || 'Failed to update status', 'error');
      }
    } catch (err) {
      showStatus('An error occurred while updating status', 'error');
    }
  };

  const handleChangePassword = async (userId: string, username: string) => {
    if (!editPasswordValue.trim()) {
      showStatus('Password cannot be empty', 'error');
      return;
    }

    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          password: editPasswordValue
        })
      });

      const data = await res.json();
      if (res.ok) {
        showStatus(`Password for "${username}" updated successfully!`, 'success');
        setEditingUserId(null);
        setEditPasswordValue('');
        fetchUsers();
      } else {
        showStatus(data.error || 'Failed to update password', 'error');
      }
    } catch (err) {
      showStatus('An error occurred while updating password', 'error');
    }
  };

  const handleDeleteUser = async (user: any) => {
    if (user.username === currentUser) {
      showStatus('You cannot delete your own logged-in account!', 'error');
      return;
    }

    if (!confirm(`Are you sure you want to permanently delete user "${user.username}"?`)) return;

    try {
      const res = await fetch(`/api/admin/users?userId=${user.id}`, {
        method: 'DELETE'
      });

      const data = await res.json();
      if (res.ok) {
        showStatus(`Account "${user.username}" deleted successfully!`, 'success');
        fetchUsers();
      } else {
        showStatus(data.error || 'Failed to delete user', 'error');
      }
    } catch (err) {
      showStatus('An error occurred while deleting user', 'error');
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'editor':
        return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin';
      case 'editor':
        return 'Editor';
      default:
        return 'Viewer';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary flex items-center gap-2">
            <Users className="w-8 h-8 text-primary" /> Team & Roles Management
          </h1>
          <p className="text-on-secondary-container mt-2">Create credentials, edit passwords, block access, and manage workspace permissions.</p>
        </div>
      </div>

      {/* Notification Toast */}
      {status.message && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 transition-all duration-300 ${
          status.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          <p className="text-sm font-medium">{status.message}</p>
        </div>
      )}

      {loading ? (
        <div className="p-16 text-center text-on-secondary-container">
          <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-primary rounded-full mb-4"></div>
          <p className="text-sm">Retrieving team database records...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Create User Form Section */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-surface-container-low shadow-sm">
            <h2 className="font-display text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-indigo-500" /> Create Team Account
            </h2>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">Username / Email</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. golu or yash@domain.com"
                  className="w-full px-4 py-2.5 border border-outline/20 rounded-lg text-sm bg-white focus:outline-none focus:border-primary/50 text-primary"
                  value={newUsername}
                  onChange={e => setNewUsername(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">Default Password</label>
                <input 
                  type="text"
                  required
                  placeholder="Enter login password..."
                  className="w-full px-4 py-2.5 border border-outline/20 rounded-lg text-sm bg-white focus:outline-none focus:border-primary/50 text-primary"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">Workspace Privilege Role</label>
                <select
                  className="w-full px-4 py-2.5 border border-outline/20 rounded-lg text-sm bg-white focus:outline-none focus:border-primary/50 text-primary cursor-pointer"
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                >
                  <option value="super_admin">Super Admin (Full Access)</option>
                  <option value="editor">Editor (Create & Edit)</option>
                  <option value="viewer">Viewer (Read-Only)</option>
                </select>
              </div>

              <Button type="submit" className="w-full justify-center mt-2 flex items-center gap-2">
                <UserPlus className="w-4 h-4" /> Create Account
              </Button>
            </form>
          </div>

          {/* Directory Listings Section */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-surface-container-low shadow-sm overflow-hidden">
            <div className="p-6 border-b border-surface-container-low">
              <h2 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" /> Active Workspace Directory
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-on-secondary-container">
                <thead className="bg-gray-50 border-b border-surface-container-low text-xs uppercase text-primary font-bold">
                  <tr>
                    <th className="px-6 py-4">Admin Username</th>
                    <th className="px-6 py-4">Role Privileges</th>
                    <th className="px-6 py-4">Login Password</th>
                    <th className="px-6 py-4">Access Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  {users.map((user) => (
                    <tr key={user.id} className={`hover:bg-surface/20 transition-colors ${user.is_blocked ? 'bg-red-50/20' : ''}`}>
                      <td className="px-6 py-4 font-semibold text-primary">
                        <div className="flex flex-col">
                          <span>{user.username}</span>
                          {user.username === currentUser && (
                            <span className="text-[9px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded border border-green-100 w-fit mt-0.5">
                              Your Session
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getRoleBadgeClass(user.role)}`}>
                          {getRoleLabel(user.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-primary">
                        {editingUserId === user.id ? (
                          <div className="flex items-center gap-1.5">
                            <input 
                              type="text"
                              className="px-2 py-1 border border-outline/35 rounded text-xs bg-white focus:outline-none w-28 text-primary"
                              value={editPasswordValue}
                              placeholder="New password"
                              onChange={e => setEditPasswordValue(e.target.value)}
                            />
                            <button 
                              onClick={() => handleChangePassword(user.id, user.username)}
                              className="text-[10px] text-indigo-600 hover:underline font-bold"
                            >
                              Save
                            </button>
                            <button 
                              onClick={() => { setEditingUserId(null); setEditPasswordValue(''); }}
                              className="text-[10px] text-slate-500 hover:underline"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 group">
                            <span>{user.password}</span>
                            <button 
                              onClick={() => { setEditingUserId(user.id); setEditPasswordValue(user.password); }}
                              className="opacity-0 group-hover:opacity-100 text-[10px] text-primary hover:underline font-bold transition-opacity flex items-center gap-0.5"
                              title="Edit Password"
                            >
                              <Key className="w-2.5 h-2.5" /> Edit
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.is_blocked ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                            <UserX className="w-3 h-3" /> Blocked
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                            <UserCheck className="w-3 h-3" /> Active
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {/* Block/Unblock toggle */}
                          <button
                            onClick={() => handleToggleBlock(user)}
                            disabled={user.username === currentUser}
                            className={`p-2 rounded-lg border transition-colors cursor-pointer disabled:opacity-30 ${
                              user.is_blocked 
                                ? 'text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 border-green-100' 
                                : 'text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 border-orange-100'
                            }`}
                            title={user.is_blocked ? "Unblock Account" : "Block Account"}
                          >
                            {user.is_blocked ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                          </button>

                          {/* Delete user */}
                          <button
                            onClick={() => handleDeleteUser(user)}
                            disabled={user.username === currentUser}
                            className="p-2 text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg transition-colors cursor-pointer disabled:opacity-30"
                            title="Delete Account"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
