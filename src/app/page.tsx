'use client';

import Tasks from '@/components/tasks/Tasks';
import { useGlobalState } from '@/context/globalProvider';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const Home = () => {
  const { tasks } = useGlobalState();
  const { user } = useUser();


  if(!user) {
    redirect('/signin');
  }

  return <Tasks title="All Tasks" tasks={tasks} />;
};

export default Home;
