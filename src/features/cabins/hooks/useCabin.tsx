import { useQuery } from "@tanstack/react-query";
import { GetCabines } from "../../../services/apiCabines";
import { useSearchParams } from "react-router-dom";
import useClientSort from "../../../hooks/useClientSort";

const useCabin = () => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("discount") || "All";
  const query = useQuery({
    queryFn: GetCabines,
    queryKey: ["cabines"],
  });

  let filterData;
  const dataSort = useClientSort(query.data);
  if (!dataSort)
    return {
      ...query,
      cabines: [],
    };

  switch (filter) {
    case "No-discount":
      filterData = dataSort.filter((v) => {
        return v.discount <= 0;
      });
      break;
    case "With-discount":
      filterData = dataSort.filter((v) => {
        return v.discount > 0;
      });
      break;
    default:
      filterData = dataSort;
      break;
  }

  return {
    ...query,
    cabines: filterData,
  };
};

export default useCabin;
