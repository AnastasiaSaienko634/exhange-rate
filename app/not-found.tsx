import { redirect } from 'next/navigation';

const NotFoundPage = () => {
  redirect('/');
  return;
};

export default NotFoundPage;
