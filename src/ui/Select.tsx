import React, {
  createContext,
  forwardRef,
  ReactNode,
  useContext,
  useState,
} from "react";
import styled from "styled-components";
import Button from "./Button";
import { createPortal } from "react-dom";
import usePortalContext from "../hooks/usePortalContext";
import { HiArrowDown, HiCheck } from "react-icons/hi2";
import useClickOutside from "../hooks/useClickOutside";
const BaseButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => <button ref={ref} {...props} />);
const StyledSelectItem = styled(BaseButton)`
  all: unset;
  font-size: 1.4rem;
  display: flex;
  padding: 2.5px 1px;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  color: var(--color-grey-800);
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  &:hover {
    background-color: var(--color-grey-100);
  }
  &:focus {
    background-color: var(--color-grey-100);
    outline: 2px solid var(--color-brand-500);
    outline-offset: 2px;
  }
  &[data-state="active"] {
    background-color: var(--color-brand-50);
    color: var(--color-brand-700);
    font-weight: 600;
  }
`;

const StyledSelectContent = styled.div<typePortalContent>`
  position: absolute;
  min-width: 220px;
  display: ${(props) => (props.isOpen ? "none" : "flex")};
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.6rem 1rem;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-200);
  z-index: 999;
  top: ${(props) => props.position?.y}px;
  right: ${(props) => props.position?.x}px;
`;
const ButtonStyled = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-800);
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: background-color 0.2s ease;

  svg {
    font-size: 1.6rem;
  }

  &:hover {
    background-color: var(--color-grey-100);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-brand-500);
  }
`;

const selectContext = createContext<unknown>(null);
interface SelectContext extends typeMenu {
  value: string;
  handleChange: (label: string, value: string) => void;
}
const useSelect = () => {
  const context = useContext(selectContext);
  if (!context) throw new Error("");
  return context as SelectContext;
};
type SelectType = {
  children: ReactNode;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
};
const Select = ({ children, onValueChange, defaultValue }: SelectType) => {
  const { closeMenu, handleClick, openId, openMenu, position } =
    usePortalContext();
  const [value, setValue] = useState(defaultValue ?? "");
  const handleChange = (label: string, valueChange: string) => {
    setValue(label);
    onValueChange?.(valueChange);
  };
  return (
    <selectContext.Provider
      value={{
        closeMenu,
        handleClick,
        openId,
        openMenu,
        position,
        value,
        handleChange,
      }}>
      {children}
    </selectContext.Provider>
  );
};
const SelectTrigger = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};
type SelectItemProps = {
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const SelectItem = ({ children, ...props }: SelectItemProps) => {
  const { closeMenu, handleChange, value } = useSelect();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleChange(e.currentTarget.textContent!, e.currentTarget.value);
    closeMenu();
  };
  const active = children === value ? "active" : "";
  return (
    <StyledSelectItem {...props} onClick={handleClick} data-state={active}>
      {children}
      {active && <HiCheck />}
    </StyledSelectItem>
  );
};

const SelectValue = ({ placeholder }: { placeholder: string }) => {
  const { handleClick, value } = useSelect();
  const valueButton = !value ? placeholder : value;
  return (
    <ButtonStyled value={valueButton} onClick={handleClick}>
      {valueButton}
      <HiArrowDown />
    </ButtonStyled>
  );
};
const SelectContent = ({ children }: { children: ReactNode }) => {
  const { openId, position, id, closeMenu } = useSelect();
  const isOpen = !openId;
  const { ref } = useClickOutside(closeMenu);
  if (!position) return null;

  return createPortal(
    <StyledSelectContent ref={ref} isOpen={isOpen} position={position} id={id}>
      {children}
    </StyledSelectContent>,
    document.body
  );
};
SelectItem.displayName = "SelectItem";

Select.SelectTrigger = SelectTrigger;
Select.SelectValue = SelectValue;
Select.SelectContent = SelectContent;
Select.SelectItem = SelectItem;
export default Select;
