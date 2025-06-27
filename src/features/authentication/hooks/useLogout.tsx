import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutate: Logout } = useMutation({
    mutationFn: logout,
    onSuccess() {
      queryClient.clear();
      navigate("/login");
    },
    onError(error: Error) {
      toast.error(error.message);
    },
  });
  return {
    Logout,
    isLoading,
  };
};

export default useLogout;
