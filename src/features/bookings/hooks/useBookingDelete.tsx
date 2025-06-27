import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";

const useBookingDelete = () => {
  const queryClient = useQueryClient();
  const {
    mutate: DeleteBookingById,
    isLoading: isDeleteingBooking,
    isSuccess,
  } = useMutation({
    mutationFn: (id: number) => deleteBooking(id),
    onSuccess(_, variables) {
      toast.success("successfully delete ", { id: `${variables}-delete` });
      queryClient.invalidateQueries({ exact: true });
    },
    onError(error: Error, variables) {
      toast.error(`${error.message}`, { id: `${variables}-delete` });
    },
  });
  return {
    isDeleteingBooking,
    DeleteBookingById,
    isSuccess,
  };
};

export default useBookingDelete;
