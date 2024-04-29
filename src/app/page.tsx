'use client';

import Tasks from '@/components/tasks/Tasks';
import { useGlobalState } from '@/context/globalProvider';

const Home = () => {
  const { tasks } = useGlobalState();

  return <Tasks title="All Tasks" tasksObj={tasks} />;
};

export default Home;
