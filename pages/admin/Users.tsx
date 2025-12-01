import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { Search, UserPlus, Shield, User, Trash2, Mail, Phone, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface UserProfile {
  id: string;
  full_name: string;
  email?: string;
  phone?: string;
  role: 'user' | 'admin';
  created_at: string;
}

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', password: '', full_name: '', phone: '', role: 'user' as const });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
        options: {
          data: {
            full_name: newUser.full_name,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Update profile with role
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            full_name: newUser.full_name,
            phone: newUser.phone,
            role: newUser.role,
          });

        if (profileError) throw profileError;
      }

      alert('Usuário criado com sucesso!');
      setShowModal(false);
      setNewUser({ email: '', password: '', full_name: '', phone: '', role: 'user' });
      fetchUsers();
    } catch (error: any) {
      alert('Erro ao criar usuário: ' + error.message);
    } finally {
      setCreating(false);
    }
  };

  const handleToggleRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    
    if (!window.confirm(`Alterar para ${newRole === 'admin' ? 'Administrador' : 'Usuário'}?`)) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;
      
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      alert('Erro ao atualizar role');
    }
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;
      setUsers(users.filter(u => u.id !== userId));
    } catch (error) {
      alert('Erro ao excluir usuário');
    }
  };

  const filteredUsers = users.filter(u =>
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    users: users.filter(u => u.role === 'user').length,
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading text-white uppercase">Usuários</h1>
          <p className="text-grayLight">Gerenciamento de contas</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="flex items-center gap-2">
          <UserPlus size={20} /> Novo Usuário
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-grayDark p-6 rounded border border-grayMedium">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-grayLight text-sm uppercase font-bold">Total</h3>
            <User className="text-primary" size={24} />
          </div>
          <p className="text-3xl font-heading text-white">{stats.total}</p>
        </div>
        <div className="bg-grayDark p-6 rounded border border-grayMedium">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-grayLight text-sm uppercase font-bold">Administradores</h3>
            <Shield className="text-warning" size={24} />
          </div>
          <p className="text-3xl font-heading text-white">{stats.admins}</p>
        </div>
        <div className="bg-grayDark p-6 rounded border border-grayMedium">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-grayLight text-sm uppercase font-bold">Clientes</h3>
            <User className="text-success" size={24} />
          </div>
          <p className="text-3xl font-heading text-white">{stats.users}</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-grayLight" size={20} />
        <input
          type="text"
          placeholder="Buscar por nome ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-grayDark border border-grayMedium text-white rounded pl-10 p-3 focus:border-primary outline-none"
        />
      </div>

      {/* Users Table */}
      <div className="bg-grayDark rounded border border-grayMedium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-grayLight">
            <thead className="bg-blackCarbon/50 text-xs uppercase font-bold">
              <tr>
                <th className="p-4">Usuário</th>
                <th className="p-4">Contato</th>
                <th className="p-4">Role</th>
                <th className="p-4">Cadastro</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-grayMedium">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center">Carregando...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center">Nenhum usuário encontrado.</td></tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-blackCarbon/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-primary font-bold">
                            {user.full_name?.charAt(0) || '?'}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-white">{user.full_name || 'Sem nome'}</div>
                          <div className="text-xs opacity-60">{user.id.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        {user.email && (
                          <span className="flex items-center gap-1 text-xs">
                            <Mail size={12} /> {user.email}
                          </span>
                        )}
                        {user.phone && (
                          <span className="flex items-center gap-1 text-xs">
                            <Phone size={12} /> {user.phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                        user.role === 'admin' 
                          ? 'bg-warning/20 text-warning' 
                          : 'bg-success/20 text-success'
                      }`}>
                        {user.role === 'admin' ? 'Admin' : 'Cliente'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-1 text-xs">
                        <Calendar size={12} />
                        {new Date(user.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleRole(user.id, user.role)}
                        className="p-2 hover:text-warning hover:bg-warning/10 rounded transition-colors"
                        title="Alterar Role"
                      >
                        <Shield size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-grayDark rounded-lg border border-grayMedium w-full max-w-md">
            <div className="p-6 border-b border-grayMedium">
              <h2 className="text-xl font-heading text-white uppercase">Novo Usuário</h2>
            </div>
            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-grayLight mb-2">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={newUser.full_name}
                  onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                  className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-grayLight mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-grayLight mb-2">Senha</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-grayLight mb-2">Telefone</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-grayLight mb-2">Tipo de Conta</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'user' | 'admin' })}
                  className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none"
                >
                  <option value="user">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={() => setShowModal(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" disabled={creating} className="flex-1">
                  {creating ? 'Criando...' : 'Criar Usuário'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
