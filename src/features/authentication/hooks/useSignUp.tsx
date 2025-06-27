import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: SignUp, isLoading: isSigning } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signUp({ email, password }),
    onSuccess() {
      toast.success("Account successfully created ", { id: "create-user" });
    },
    onError(error: Error) {
      toast.error(error.message, { id: "create-user" });
    },
  });
  return {
    isSigning,
    SignUp,
  };
};

export default useSignUp;
