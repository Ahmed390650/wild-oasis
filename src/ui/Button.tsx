import styled, { css } from "styled-components";
import { variations } from "../utils/helpers";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const Button = styled.button<
  ButtonProps<keyof typeof sizes, keyof typeof variations>
>`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  width: 100%;
  cursor: pointer;
  ${(props) => sizes[props.sizes || "medium"]}
  ${(props) => variations[props.variation || "secondary"]}
`;
export default Button;
