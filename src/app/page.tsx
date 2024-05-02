'use client';

import Tasks from '@/components/tasks/Tasks';
import { useGlobalState } from '@/context/globalProvider';
import { redirect } from 'next/navigation';

const Home = () => {
  const { tasks } = useGlobalState();

  if(tasks.length <= 0) {
    redirect('/signin');
  }

  return <Tasks title="All Tasks" tasks={tasks} />;
};

export default Home;
