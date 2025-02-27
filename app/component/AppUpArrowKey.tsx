"use client";
import React from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import styles from './AppUpArrowKey.module.css';

const AppUpArrowKey = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.upArrow}>
      <a href="#top" onClick={scrollToTop} aria-label="Scroll to top">
        <FaArrowCircleUp style={{ width: "50px", height: "50px" }} />
      </a>
    </div>
  );
};

export default AppUpArrowKey;