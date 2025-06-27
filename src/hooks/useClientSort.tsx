import { useSearchParams } from "react-router-dom";

const useClientSort = <T,>(data: T[] | undefined) => {
  const [searchParams] = useSearchParams();
  const [sortBy, sortWith] = (searchParams.get("sort")?.split("-") || "") as [
    keyof T,
    "asc" | "desc",
  ];
  if (!data) return null;
  data.sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];

    if (typeof valA === "number" && typeof valB === "number") {
      return sortWith === "asc" ? valA - valB : valB - valA;
    }
    if (typeof valA === "string" && typeof valB === "string") {
      return sortWith === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    return 0; // fallback if types are mixed or unknown
  });
  return data;
};

export default useClientSort;
