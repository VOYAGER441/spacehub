"use client";

import React, { Suspense } from "react";
import MediaDisplay from "../component/MediaDisplay";

const MediaDisplayPage: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MediaDisplay />
    </Suspense>
  );
};

export default MediaDisplayPage;
