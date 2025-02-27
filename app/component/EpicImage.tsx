/* eslint-disable @next/next/no-img-element */
import React from "react";

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
    <div className="card text-white bg-dark">
      <img src={imageUrl} alt={caption} className="card-img-top" />
      <div className="card-body text-center">
        <h5 className="card-title">{caption}</h5>
        <p className="card-text">{date}</p>
      </div>
    </div>
  );
};

export default EpicImage;
