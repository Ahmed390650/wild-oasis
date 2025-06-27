import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
// import Uploader from "../data/Uploader";

const SideBarStyled = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  display: flex;
  gap: 3.2rem;
  flex-direction: column;
`;
const SideBar = () => {
  return (
    <SideBarStyled>
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </SideBarStyled>
  );
};

export default SideBar;
