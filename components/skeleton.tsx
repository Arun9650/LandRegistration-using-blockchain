import React from "react";
import { Skeleton } from "./ui/skeleton";

const SkeletonComponent = () => {
  const items = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="flex  flex-wrap gap-3">
      {items.map((item) => (
        <Skeleton key={item} className="w-80 h-80 bg-gray-300" />
      ))}
    </div>
  );
};

export default SkeletonComponent;
