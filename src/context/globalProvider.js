'use client';

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

import { NextResponse } from 'next/server';
import toast from 'react-hot-toast';
import themes from './themes';

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useUser();

  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [importantTasks, setImportantTasks] = useState([]);

  const theme = themes[selectedTheme];

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const collapseMenu = () => {
    setCollapsed(!collapsed);
  }

  const alltasks = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get('/api/tasks');
      const { data } = res;

      const sorted = data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      const completed = sorted.filter((tasks) => tasks.isCompleted === true);
      const incomplete = sorted.filter((tasks) => tasks.isCompleted === false);
      const important = sorted.filter((tasks) => tasks.isImportant === true);

      setCompletedTasks(completed);
      setIncompleteTasks(incomplete);
      setImportantTasks(important);
      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      NextResponse.json({ error: "Error getting tasks", status: 500 });
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success('Task deleted successfully.');

      alltasks();
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  const updateTask = async (task) => {
    try {
      await axios.put(`/api/tasks/`, task);
      toast.success('Task updated successfully.');
      alltasks();
    } catch (error) {}
  };

  useEffect(() => {
    if (user) alltasks();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        alltasks,
        deleteTask,
        updateTask,
        isLoading,
        completedTasks,
        incompleteTasks,
        importantTasks,
        modal,
        openModal,
        closeModal,
        collapsed,
        collapseMenu,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
