import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import CreateCabinForm from "../CreateCabinForm";
import useCabinCreate from "../hooks/useCabinCreate";
import useCabinDelete from "../hooks/useCabinDelete";
import toast from "react-hot-toast";
import { Menus } from "../../../ui/Menus";

const ActionButtons = (props: cellProps<Cabin, keyof Cabin>) => {
  const { image, discount, name, maxCapacity, regularPrice, id, description } =
    props.row;
  const { mutate: createDuplicateCabin, isLoading: isDuplicate } =
    useCabinCreate();
  const { mutate, isLoading, isPending } = useCabinDelete();
  const handleDelete = () => {
    toast.loading("loading....", { id: "cabine-deleting" });
    mutate(id);
  };
  const handleDuplicate = () => {
    toast.loading("loading....", { id: "cabin-create" });
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
    <Menus>
      <Menus.Toggle disabled={isDuplicate || isDeleting} />
      <Menus.List>
        <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
          Duplicate
        </Menus.Button>
        <Modal>
          <Modal.Open>
            <Menus.Button variation="danger" icon={<HiTrash />}>
              Delete
            </Menus.Button>
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
            <Menus.Button variation="primary" icon={<HiPencil />}>
              Edit
            </Menus.Button>
          </Modal.Open>
          <Modal.Content>
            <CreateCabinForm editCabin={props.row} />
          </Modal.Content>
        </Modal>
      </Menus.List>
    </Menus>
  );
};

export default ActionButtons;
