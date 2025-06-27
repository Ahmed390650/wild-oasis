import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

const useRecentBooking = () => {
  const [searchParmas] = useSearchParams();
  const last = searchParmas.get("last");
  const numbDays = last ? +last : 7;
  const date = subDays(new Date(), numbDays).toISOString();
  const { data: bookings, isLoading: isLoading1 } = useQuery({
    queryFn: () => getBookingsAfterDate(date),
    queryKey: ["booking", `last-${numbDays}`],
  });
  return {
    bookings,
    isLoading1,
  };
};

export default useRecentBooking;
