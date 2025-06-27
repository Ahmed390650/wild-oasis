import styled from "styled-components";
import Logout from "../features/authentication/logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
const StyledHeaderMenu = styled.div`
  display: flex;
  gap: 0.4rem;
`;
const HeaderMenu = () => {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <div>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </div>
      <div>
        <ToggleTheme />
      </div>
      <div>
        <Logout />
      </div>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
