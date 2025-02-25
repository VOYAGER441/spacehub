// app/page.tsx
import Spline from "@splinetool/react-spline/next";
import styles from './page.module.css';
import Link from "next/link";


export default function Home() {
  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <Spline
        scene="https://prod.spline.design/vuEwSJrXmFphGfTu/scene.splinecode"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <Link href={"/Explore"}>
      <button className={styles.spaceButton}>
        <span className={styles.buttonText}>Explore</span>
        <div className={styles.buttonGlow} />
      </button>
      </Link>
    </div>
  );
}