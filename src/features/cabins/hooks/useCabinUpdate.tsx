import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../../services/apiCabines";
import toast from "react-hot-toast";

const useCabinUpdate = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: (
            { variables, id }: {
                variables: Omit<Cabin, "image"> & {
                    image: File | string;
                }, id: number
            },
        ) => createEditCabin(variables, id),
        onSuccess() {
            toast.success("New Cabin successfully updated", { id: "create" });
            client.invalidateQueries({ queryKey: ["cabines"] });
        },
        onError(error: Error) {
            toast.error(error.message, { id: "create" });
        },
    });
}

export default useCabinUpdate
