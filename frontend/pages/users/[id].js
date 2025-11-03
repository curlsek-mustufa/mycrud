import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getUserById, deleteUser } from '../../lib/api';

export default function UserView() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;
    getUserById(id).then(setUser).catch(() => setUser(null));
  }, [id]);

  async function handleDelete() {
    if (!confirm('Delete user?')) return;
    await deleteUser(id);
    router.push('/');
  }

  if (!user) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Country:</strong> {user.country}</p>
      <p><strong>Occupation:</strong> {user.occupation}</p>
      <p>
        <button onClick={() => router.push(`/edit/${id}`)}>Edit</button>{' '}
        <button onClick={handleDelete}>Delete</button>{' '}
        <button onClick={() => router.push('/')}>Back</button>
      </p>
    </Layout>
  );
}
