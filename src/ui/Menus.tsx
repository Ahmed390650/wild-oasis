import React, { createContext, ReactNode, useContext } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useClickOutside from "../hooks/useClickOutside";
import { variations } from "../utils/helpers";
import usePortalContext from "../hooks/usePortalContext";
import { RiLoader2Fill } from "react-icons/ri";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  &:hover {
    background-color: var(--color-grey-100);
  }
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.div<typePortalContent>`
  position: absolute;
  display: ${(props) => (props.isOpen ? "none" : "flex")};
  gap: 0.5rem;
  flex-direction: column;
  padding: 0.5rem;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position?.x}px;
  top: ${(props) => props.position?.y}px;
`;

type variant = {
  readonly variation?: keyof typeof variations;
};
const StyledButton = styled.button<variant>`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  display: flex;
  border-radius: 1rem;
  font-weight: bold;
  align-items: center;
  gap: 1.6rem;
  &:hover {
    background-color: var(--color-grey-50);
  }
  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    color: ${(props) =>
      props.variation === "danger" ? "white" : "var(--color-grey-400)"};
    transition: all 0.3s;
  }
  ${(props) => variations[props.variation || "secondary"]}
`;
const MenuContext = createContext<unknown>(null);

const Menus = ({ children }: { children: ReactNode }) => {
  const { closeMenu, handleClick, id, openId, openMenu, position } =
    usePortalContext();

  return (
    <MenuContext.Provider
      value={{
        openId,
        position,
        openMenu,
        closeMenu,
        id,
        handleClick,
      }}>
      <StyledMenu>{children}</StyledMenu>
    </MenuContext.Provider>
  );
};
const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("no context provide");
  return context as typeMenu;
};
const List = ({ children }: { children: ReactNode }) => {
  const { openId, closeMenu, position, id } = useMenu();
  const { ref } = useClickOutside(() => {
    closeMenu();
  }, false);
  const isOpen = openId !== id;
  return createPortal(
    <StyledList position={position} ref={ref} isOpen={isOpen}>
      {children}
    </StyledList>,
    document.body
  );
};
const Toggle = ({
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  const { openMenu, openId, closeMenu, id } = useMenu();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const pos = {
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height + 8,
    };
    if (openId === id) closeMenu();
    else openMenu(pos);
  };
  return (
    <StyledToggle {...props} onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};
const Button = ({
  children,
  icon,
  onClick,
  variation,
  disabled = false,
  isLoading = false,
}: {
  children: ReactNode;
  icon: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  variation?: variant["variation"];
  isLoading?: boolean;
}) => {
  const { closeMenu } = useMenu();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.();
    closeMenu();
  };
  return (
    <StyledButton
      disabled={disabled}
      variation={variation}
      onClick={handleClick}>
      {isLoading ? <RiLoader2Fill /> : icon}
      <span>{children}</span>
    </StyledButton>
  );
};

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.Menu = StyledMenu;
export { Menus };
