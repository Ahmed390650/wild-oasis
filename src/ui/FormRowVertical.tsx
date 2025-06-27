import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;
const Label = styled.label`
  font-weight: 500;
`;
const Error = styled.div`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
const FormRowVertical = ({
  children,
  label,
  error,
}: {
  children: ReactElement;
  label?: ReactNode;
  error?: string;
}) => {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
};

export default FormRowVertical;
