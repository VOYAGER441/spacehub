/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import styles from "./EpicImage.module.css";

const EpicImage = ({
  image,
  caption,
  date,
}: {
  image: string;
  caption: string;
  date: string;
}) => {
  const imageUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/EPIC/archive/natural/${date
    .split("-")
    .join("/")}/png/${image}.png?api_key=${
    process.env.NEXT_PUBLIC_NASA_API_KEY
  }`;

  return (
    <div className={styles.epicCard}>
      <Image
        src={imageUrl}
        alt={caption}
        width={500}
        height={500}
        className={styles.epicImage}
        priority
      />
      <div className={styles.epicCardBody}>
        <h5>{caption}</h5>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default EpicImage;
