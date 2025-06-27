import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./hooks/useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

const Logout = () => {
  const { isLoading, Logout } = useLogout();
  return (
    <ButtonIcon
      disabled={isLoading}
      onClick={() => {
        Logout();
      }}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
};

export default Logout;
