import styled, { css } from "styled-components";

interface RowType {
  readonly type?: "horizontal";
}
const Row = styled.div<RowType>`
  ${(props) =>
    props.type === "horizontal" &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `}
  gap: 5px;
`;

export default Row;
