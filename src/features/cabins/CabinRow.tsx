import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import useCabinDelete from "./hooks/useCabinDelete";
import useCabinCreate from "./hooks/useCabinCreate";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import toast from "react-hot-toast";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const CabinRow = ({ cabin }: { cabin: Cabin }) => {
  const { image, discount, name, maxCapacity, regularPrice, id, description } =
    cabin;
  const { mutate: createDuplicateCabin, isLoading: isDuplicate } =
    useCabinCreate();
  const { mutate, isLoading, isPending } = useCabinDelete();
  const handleDelete = () => {
    toast.loading("loading....", { id: "create" });
    mutate(id);
  };
  const handleDuplicate = () => {
    toast.loading("loading....", { id: "create" });
    createDuplicateCabin({
      image,
      discount,
      maxCapacity,
      regularPrice,
      name: `Copy of ${name}`,
      description,
    });
  };
  const isDeleting = isLoading || isPending;
  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>fits up to {maxCapacity} quests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>
          {discount ? formatCurrency(discount) : <span>&mdash;</span>}
        </Discount>
        <div>
          <Button
            variation="secondary"
            disabled={isDuplicate}
            onClick={handleDuplicate}>
            <HiSquare2Stack />
          </Button>

          <Modal>
            <Modal.Open>
              <Button
                variation="danger"
                disabled={isDeleting}
                onClick={handleDelete}>
                <HiTrash />
              </Button>
            </Modal.Open>
            <Modal.Content>
              <ConfirmDelete
                onConfirm={handleDelete}
                disabled={isDeleting}
                resourceName="Cabin"
              />
            </Modal.Content>
          </Modal>
          <Modal>
            <Modal.Open>
              <Button variation="primary">
                <HiPencil />
              </Button>
            </Modal.Open>
            <Modal.Content>
              <CreateCabinForm editCabin={cabin} />
            </Modal.Content>
          </Modal>
        </div>
      </TableRow>
    </>
  );
};

export default CabinRow;
