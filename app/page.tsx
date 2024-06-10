'use client'

import { useMediaQuery } from "@mui/material";
import React from "react";
import IntroPage from '../components/IntroPage';
import ReviewPage from "../components/ReviewPage";
import FormPage from "../components/FormPage";
import FloatingNav from "../components/FloatingNav";

function App() {
  const matches = useMediaQuery("(min-width: 56.25em)"); //true if desktop false if not

  return  <>
  <FloatingNav/>
          <IntroPage/>
          <FormPage/>
          <ReviewPage/>
      </>
}

export default App;
