import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

const useRecentStays = () => {
  const [searchParmas] = useSearchParams();
  const last = searchParmas.get("last");
  const numDays = last ? +last : 7;
  const date = subDays(new Date(), numDays).toISOString();
  const { data: stays, isLoading: isLoading2 } = useQuery({
    queryFn: () => getStaysAfterDate(date),
    queryKey: ["stays", `last-${numDays}`],
  });
  const confirmedstays = stays?.filter((stay) => {
    return stay.status !== "unconfirmed";
  });
  return {
    stays,
    isLoading2,
    confirmedstays,
    numDays,
  };
};

export default useRecentStays;
