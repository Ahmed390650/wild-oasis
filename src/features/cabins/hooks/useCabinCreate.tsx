import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../../services/apiCabines";
import toast from "react-hot-toast";

const useCabinCreate = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: createEditCabin,
    onSuccess() {
      toast.success("New Cabin successfully created", { id: "cabin-create" });
      client.invalidateQueries({ queryKey: ["cabines"] });
    },
    onError(error: Error) {
      toast.error(error.message, { id: "cabin-create" });
    },
  });
};

export default useCabinCreate;
