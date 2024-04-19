'use client';
import { GlobalProvider } from '@/context/globalProvider';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

function ContextProvider({ children }: Props) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 2000);
  }, []);

  if (!isReady) {
    return null;
  }

  return <GlobalProvider>{children}</GlobalProvider>;
}

export default ContextProvider;
