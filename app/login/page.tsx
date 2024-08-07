"use client";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { SessionProvider, signIn } from "next-auth/react";
import Box from '@mui/material/Box';
import {IconLockAccess} from '@tabler/icons-react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';



export default function SignIn() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    await signIn("credentials",{
      username: data.get('email'),
      password: data.get('password'),
      callbackUrl:"/dashboard",
    })
  };

  return (
    <SessionProvider>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <IconLockAccess />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <div>
              <p className='text-black text-[16px] mb-4'>
                Forget Password?
                <Link
                  href="/forgetpassword"
                  className="ml-2 text-blue-500 hover:underline"
                >Reset Here</Link>
              </p>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </SessionProvider>
  );
}