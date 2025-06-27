import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { LoaderIcon } from "react-hot-toast";
import { HiTrash } from "react-icons/hi2";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
type typeConfirm = {
  resourceName: string;
  onConfirm: () => void;
  disabled: boolean;
  onCloseModel?: () => void;
};
function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModel,
}: typeConfirm) {
  return (
    <StyledConfirmDelete>
      <Heading as="h2">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          onClick={() => onCloseModel?.()}
          variation="secondary"
          sizes="medium"
          disabled={disabled}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variation="danger"
          sizes="medium"
          disabled={disabled}>
          {disabled ? <LoaderIcon /> : <HiTrash />}Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
