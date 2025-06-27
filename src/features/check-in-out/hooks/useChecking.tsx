import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useChecking = () => {
  const quertClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({
      id,
      breakFast,
    }: {
      id: number;
      breakFast?: {
        hasBreakfast: boolean;
        extrasPrice: number;
        totalPrice: number;
      };
    }) =>
      updateBooking(id, { status: "checked-in", isPaid: true, ...breakFast }),

    onSuccess(data) {
      toast.success(`Booking #${data.id} successfully checked in`, {
        id: "update-checking",
      });
      quertClient.invalidateQueries({ exact: true });
      navigate("/");
    },
    onError(error: Error) {
      toast.error(`Booking #${error.message}  checked in`, {
        id: "update-checking",
      });
    },
    mutationKey: ["update-Checking"],
  });
};

export default useChecking;
