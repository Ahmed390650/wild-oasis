import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";

const useCheckOut = () => {
  const quertClient = useQueryClient();
  const { isLoading: isCheckOut, mutate: checkOut } = useMutation({
    mutationFn: ({ id }: { id: number }) =>
      updateBooking(id, { status: "checked-out" }),

    onSuccess(data) {
      toast.success(`Booking #${data.id} successfully checked out`, {
        id: "update-checking-out",
      });
      quertClient.invalidateQueries({ exact: true });
    },
    onError(error: Error) {
      toast.error(`Booking #${error.message}  checked out`, {
        id: "update-checking-out",
      });
    },
    mutationKey: ["update-Checking-out"],
  });
  return {
    checkOut,
    isCheckOut,
  };
};

export default useCheckOut;
