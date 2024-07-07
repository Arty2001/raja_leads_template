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
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";

const ResetPassword = ({params}:any) => {

  console.log(params.token);
  const router = useRouter();
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);
  const [user,setUser]=useState(null);
  const {data:session,status:sessionStatus}=useSession();
  

  useEffect (() => {
    console.log('useEffect triggered');
    const verifyToken = async () => {
      console.log(session);
      console.log(verified);
      try{
          const res = await fetch("/api/verifytoken", {
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            body: JSON.stringify({
              token: params.token,
            }),
          });
          if (res.status === 400) {
            setError("Invalid token or token has expired");
            console.log("UNSUCCESSFUL");
          }
          if (res.status === 200) {
            setError("");
            setVerified(true);
            const userData = await res.json();
            setUser(userData);
            console.log("SUCCESSFUL");
          }
        } catch (error) {
          setError("Error, try again");
          console.log(error);
        }
      };
      verifyToken();
    },[params.token]);

  useEffect(() => {
    if(sessionStatus === "authenticated"){
      router.replace("/dashboard");
    }
  }, [sessionStatus,router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get('password');
    console.log({
      password: data.get('password'),
    });

  try {
    const res = await fetch("/api/resetpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email: user?.email,
      }),
    });
    if (res.status === 400) {
      setError("This email does not exist");
    }
    if (res.status === 200) {
      setError("");
      router.push("/login");
    }
  } catch (error) {
    setError("Error, try again");
    console.log(error);
  }
};

  if (sessionStatus === "loading" || !verified)
    {
    return <h1>Loading...</h1>
    }

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
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled= {error.length >0}
              sx={{ mt: 3, mb: 2 }}
            >
              SUBMIT
            </Button>
          </Box>
        </Box>
      </Container>
    </SessionProvider>
  );
};

export default ResetPassword;