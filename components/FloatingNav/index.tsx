import React, { useState, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react"; // Assuming you are using the Tabler Icons library

const dotStyle = {
  position: "relative",
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  margin: "5px 0",
  backgroundColor: "#888000"
} as React.CSSProperties;

const textStyle = {
    position: "absolute",
    top: "-6px",
    left: "100%",
    padding: "3px",
    whiteSpace: "nowrap",
    fontSize: "10px", // Adjust font size
    color: "#888", // Grey color
} as React.CSSProperties;

const activeDotStyle = {
  backgroundColor: "#333",
} as React.CSSProperties;

function FloatingNav() {
  const [textVisible1, setTextVisible1] = useState(false);
  const [textVisible2, setTextVisible2] = useState(false);
  const [textVisible3, setTextVisible3] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const { scrollY } = useScroll({layoutEffect: false});

  useMotionValueEvent(scrollY, "change", (latest) => {
    const windowHeight = window.innerHeight;
    setCurrentPage(Math.floor(latest / windowHeight) + 1); // +1 to start page numbering from 1
  });

  useEffect(() => {
    return () => {
      scrollY.clearListeners(); // Cleanup listeners
    };
  }, [scrollY]);

  const handleDotClick = (pageNumber : number) => {
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: windowHeight * (pageNumber - 1),
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <IconChevronUp
        style={{
          width: "20px",
          height: "20px",
          cursor: "pointer",
          color: "#888",
        }}
        onClick={() => {if(currentPage !== 1 ){handleDotClick(currentPage-1)}}}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "8px",
          marginBottom: "8px",
        }}
      >
        <motion.div
          style={{
            ...dotStyle,
            ...(currentPage === 1 && activeDotStyle),
          }}
          whileHover={{ scale: 1.1, backgroundColor: "#333" }}
          onMouseEnter={() => setTextVisible1(true)}
          onMouseLeave={() => setTextVisible1(false)}
          onClick={() => handleDotClick(1)}
        >
          <span
            style={{ ...textStyle, display: textVisible1 ? "block" : "none" }}
          >
            Page 1
          </span>
        </motion.div>
        <motion.div
          style={{
            ...dotStyle,
            ...(currentPage === 2 && activeDotStyle),
          }}
          whileHover={{ scale: 1.1, backgroundColor: "#333" }}
          onMouseEnter={() => setTextVisible2(true)}
          onMouseLeave={() => setTextVisible2(false)}
          onClick={() => handleDotClick(2)}
        >
          <span
            style={{ ...textStyle, display: textVisible2 ? "block" : "none" }}
          >
            Page 2
          </span>
        </motion.div>
        <motion.div
          style={{
            ...dotStyle,
            ...(currentPage === 3 && activeDotStyle),
          }}
          whileHover={{ scale: 1.1, backgroundColor: "#333" }}
          onMouseEnter={() => setTextVisible3(true)}
          onMouseLeave={() => setTextVisible3(false)}
          onClick={() => handleDotClick(3)}
        >
          <span
            style={{ ...textStyle, display: textVisible3 ? "block" : "none" }}
          >
            Page 3
          </span>
        </motion.div>
      </div>
      <IconChevronDown
        style={{
          width: "20px",
          height: "20px",
          cursor: "pointer",
          color: "#888",
        }}
        onClick={() => {if(currentPage !== 3 ){handleDotClick(currentPage+1)}}}
      />
    </div>
  );
}

export default FloatingNav;
