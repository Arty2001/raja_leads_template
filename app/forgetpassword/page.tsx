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
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPassword() {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    console.log({
      email: data.get('email'),
    });

  try {
      const res = await fetch("/api/forgetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      if (res.status === 400) {
        setError("This email does not exist");
        setSuccessMessage("Invalid email address");

      }
      if (res.status === 200) {
        setError("");
        setSuccessMessage("Email has been sent successfully");
        setIsSubmitted(true);
        //router.push("/login");

      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
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
            Forget Password
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
            {successMessage && <Typography color="primary">{successMessage}</Typography>}
            {!isSubmitted && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SUBMIT
            </Button>
            )}
          </Box>
        </Box>
      </Container>
    </SessionProvider>
  );
}