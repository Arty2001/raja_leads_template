import { useRef } from "react";
import {
  motion,
  useScroll,
} from "framer-motion";
import {
    useParallax
} from "../../utils";

export default function FormPage(){
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 10);
  
    return (
      <section style={{height: '100vh', scrollSnapAlign: 'center'}}>
        <div ref={ref}>
          Test
        </div>
        <motion.h2 style={{ y }}>{`MAIN PAGE`}</motion.h2>
      </section>
    );
}