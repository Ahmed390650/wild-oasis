import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useTheme } from "./Provider/ThemeProvider";

const ToggleTheme = () => {
  const { handleToggle, isDarkMode } = useTheme();
  return (
    <ButtonIcon onClick={handleToggle}>
      {!isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
};

export default ToggleTheme;
