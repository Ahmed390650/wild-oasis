import React from "react";
import { useSearchParams } from "react-router-dom";

const useServerSort = <T,>() => {
  const [searchParams] = useSearchParams();
  const [sortBy, sortWith] = (searchParams.get("sort")?.split("-") || "") as [
    keyof T,
    "asc" | "desc",
  ];
};

export default useServerSort;
