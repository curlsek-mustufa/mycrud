import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getAllUsers, deleteUser } from '../lib/api';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data || []);
    } catch (e) {
      console.error(e);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id) {
    if (!confirm('Delete user?')) return;
    try {
      await deleteUser(id);
      await load();
    } catch (e) {
      alert('Delete failed');
    }
  }

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>All Users</h2>
        <Link href="/create">Create New</Link>
      </div>

      {loading ? <p>Loading...</p> : (
        <table border="1" cellPadding="8" style={{ width: '100%', marginTop: 12 }}>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Country</th><th>Occupation</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.country}</td>
                <td>{u.occupation}</td>
                <td>
                  <Link href={`/users/${u.id}`}>View</Link> |{' '}
                  <Link href={`/edit/${u.id}`}>Edit</Link> |{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); handleDelete(u.id); }}>Delete</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
