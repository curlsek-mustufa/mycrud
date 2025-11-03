import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import UserForm from '../../components/UserForm';
import { getUserById, updateUser } from '../../lib/api';

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;
    getUserById(id).then(setUser).catch(() => setUser(null));
  }, [id]);

  async function onSubmit(form) {
    await updateUser(id, form);
    router.push('/');
  }

  if (!user) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h2>Edit User</h2>
      <UserForm initial={user} onSubmit={onSubmit} />
    </Layout>
  );
}

