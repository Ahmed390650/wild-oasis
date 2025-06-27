import { createContext, ReactNode, useContext } from "react";
import styled, { css } from "styled-components";

const StyledButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
`;
const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const StyledButton = styled.button<{ readonly active?: boolean }>`
  background-color: var(--color-grey-0);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;
  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
type TypeFilter = {
  options: option[];
  active?: boolean;
  children: ReactNode;
};
const ButtonGroupContext = createContext<unknown>(null);
type ButtonGroupType = {
  options: option[];
};
const useGroup = (): ButtonGroupType => {
  const context = useContext(ButtonGroupContext);
  if (!context) throw new Error("no context provider");
  return context as ButtonGroupType;
};
const ButtonGroup = ({ options, active, children }: TypeFilter) => {
  return (
    <ButtonGroupContext.Provider value={{ options, active }}>
      {children}
    </ButtonGroupContext.Provider>
  );
};
const Button = ({ option: { label, value } }: { option: option }) => {
  return <StyledButton value={value}>{label}</StyledButton>;
};
const ListButton = ({ children }: { children: ReactNode }) => {
  return (
    <StyledButtonGroup>
      <StyledFilter>{children}</StyledFilter>
    </StyledButtonGroup>
  );
};
const Group = () => {
  const { options } = useGroup();
  return (
    <ListButton>
      {options.map((option, i) => (
        <Button key={i} option={option} />
      ))}
    </ListButton>
  );
};
ButtonGroup.Group = Group;
export default ButtonGroup;
