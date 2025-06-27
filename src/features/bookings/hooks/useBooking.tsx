import { useQuery } from "@tanstack/react-query";
import { getBookingById } from "../../../services/apiBookings";
import { useParams } from "react-router-dom";

const useBooking = () => {
  const { id } = useParams();
  return useQuery({
    queryFn: () => getBookingById(+id!),
    queryKey: ["booking", id],
    retry: false,
  });
};

export default useBooking;
