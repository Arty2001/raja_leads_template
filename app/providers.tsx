'use client';
 
import { SessionProvider } from 'next-auth/react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Nunito } from 'next/font/google';

const nunito = Nunito({weight:["400"],subsets:["latin"]}) 

const defaultTheme = createTheme();
 
export function Providers({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <SessionProvider>
      <ThemeProvider theme={defaultTheme}>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}