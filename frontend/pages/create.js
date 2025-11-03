import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import UserForm from '../components/UserForm';
import { createUser } from '../lib/api';

export default function Create() {
  const router = useRouter();

  async function onSubmit(form) {
    await createUser(form);
    router.push('/');
  }

  return (
    <Layout>
      <h2>Create User</h2>
      <UserForm onSubmit={onSubmit} />
    </Layout>
  );
}

