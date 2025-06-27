import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: Login, isLoading: isLogin } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login({ email, password }),
    onSuccess(data) {
      queryClient.setQueryData(["user"], data.user);
      navigate("/", { replace: true });
    },
    onError(error: Error) {
      toast.error(error.message);
    },
  });
  return {
    Login,
    isLogin,
  };
};

export default useLogin;
