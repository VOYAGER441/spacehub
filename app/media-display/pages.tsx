/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "../component/MediaDisplay.module.css";

const MediaDisplay: React.FC = () => {
  const searchParams = useSearchParams();
  const href = searchParams.get("href");
  const [media, setMedia] = useState<{ images: string[]; videos: string[] }>({
    images: [],
    videos: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!href) return;
  
    fetch(href)
      .then((res) => res.json())
      .then((data: string[]) => {
        const uniqueMedia = new Map();
  
        data.forEach((url) => {
          // Extract the filename without the version suffix (e.g., remove `~large`, `~small`)
          const baseName = url.replace(/~(small|medium|large|orig|preview|thumb|mobile|[0-9]+)\./, ".");
  
          if (!uniqueMedia.has(baseName)) {
            uniqueMedia.set(baseName, url);
          }
        });
  
        // Separate images and videos
        const images = [...uniqueMedia.values()].filter((url) => url.match(/\.(jpg|png|jpeg|gif)$/i));
        const videos = [...uniqueMedia.values()].filter((url) => url.match(/\.(mp4|mov|avi|webm)$/i));
  
        setMedia({ images, videos });
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError("Failed to load media.");
      })
      .finally(() => setLoading(false));
  }, [href]);
  

  return (
    <div className={styles.container}>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      
      {!loading && !error && (
        <>
          <h2 className={styles.title}>Media Gallery</h2>

          <div className={styles.mediaSection}>
            <h3>Images</h3>
            <div className={styles.grid}>
              {media.images.map((src, index) => (
                <img key={index} src={src} className={styles.image} alt="NASA Image" />
              ))}
            </div>
          </div>

          <div className={styles.mediaSection}>
            <h3>Videos</h3>
            <div className={styles.grid}>
              {media.videos.map((src, index) => (
                <video key={index} controls className={styles.video}>
                  <source src={src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MediaDisplay;
