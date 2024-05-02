import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';

import Sidebar from '@/components/sidebar/Sidebar';
import ContextProvider from '@/providers/ContextProvider';
import GlobalStyleProvider from '@/providers/GlobalStyleProvider';
import { auth } from '@clerk/nextjs/server';
import NextTopLoader from 'nextjs-toploader';

const nunito = Nunito({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
            integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body className={`${nunito.className}`}>
          <NextTopLoader
            height={2}
            color='#27AE60'
            easing='cubic-bezier(0.53,0.21,0,1)'
            showSpinner={false}
          />
          <ContextProvider>
            <GlobalStyleProvider>
              {userId && <Sidebar />}
              <div className="main-container">{children}</div>
            </GlobalStyleProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
