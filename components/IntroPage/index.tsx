import { useRef } from "react";
import { useScroll } from "framer-motion";
import { useParallax } from "../../utils";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export default function IntroPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 10);

  return (
    <section style={{ height: "100vh", scrollSnapAlign: "center" }}>
      <div style={{ boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", height: 60, backgroundColor: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>YourLogo</div>
  <div style={{ display: 'flex' }}>
    <a href="#" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>Home</a>
    <a href="#" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>About</a>
    <a href="#" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>Services</a>
    <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a>
  </div>
</div>
    </section>
  );
}
