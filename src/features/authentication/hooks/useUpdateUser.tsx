import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../../services/apiAuth";
import toast from "react-hot-toast";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: UpdateUser, isLoading: isUpdating } = useMutation({
    mutationFn: (user: UserType) => updateCurrentUser(user),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Successfulyl Updated", { id: "update-user" });
    },
    onError(error: Error) {
      toast.error(error.message, { id: "update-user" });
    },
  });
  return {
    UpdateUser,
    isUpdating,
  };
};

export default useUpdateUser;
