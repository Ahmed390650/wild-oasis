import { createContext, ReactNode, useContext } from "react";
import styled, { css } from "styled-components";

const StyledList = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const StyledTrigger = styled.button<{ readonly active?: boolean }>`
  background-color: var(--color-grey-0);
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
  defaultValue?: string;
  children: ReactNode;
};
const TabsContext = createContext<unknown>(null);
type ButtonGroupType = {
  defaultValue?: string;
};
const useTabs = (): ButtonGroupType => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("no context provider");
  return context as ButtonGroupType;
};
const Tabs = ({ defaultValue, children }: TypeFilter) => {
  return (
    <TabsContext.Provider value={{ defaultValue }}>
      {children}
    </TabsContext.Provider>
  );
};
const TabsList = ({ children }: { children: ReactNode }) => {
  return <StyledList>{children}</StyledList>;
};
const Trigger = ({
  children,
  value,
  active = false,
  ...props
}: {
  children: ReactNode;
  value: string;
  active?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  const { defaultValue } = useTabs();
  const currentActive = defaultValue === value;
  return (
    <StyledTrigger {...props} value={value} active={active ?? currentActive}>
      {children}
    </StyledTrigger>
  );
};

Tabs.TabsTrigger = Trigger;
Tabs.TabsList = TabsList;
export default Tabs;
