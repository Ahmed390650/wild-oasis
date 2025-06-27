import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const HeaderStyled = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-radius: 1px solid var(--color-grey-100);

  display: flex;
  gap: 1.4rem;
  justify-content: end;
  align-items: center;
`;
const Header = () => {
  return (
    <HeaderStyled>
      <UserAvatar />
      <HeaderMenu />
    </HeaderStyled>
  );
};

export default Header;
