import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCabin } from "../../../services/apiCabines";
import toast from "react-hot-toast";

const useCabinDelete = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: DeleteCabin,
    onSuccess() {
      client.invalidateQueries({ queryKey: ["cabines"] });
      toast.success("Cabine successfulyy deleted", { id: "cabine-deleting" });
    },
    onError(error: Error) {
      toast.error(error.message, { id: "cabine-deleting" });
    },
  });
};

export default useCabinDelete;
