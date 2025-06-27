import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { HiSave } from "react-icons/hi";

const AddCabins = () => {
  return (
    <Modal>
      <Modal.Open>
        <Button variation="primary" sizes="large">
          <HiSave />
          Add new Cabin
        </Button>
      </Modal.Open>
      <Modal.Content>
        <CreateCabinForm />
      </Modal.Content>
    </Modal>
  );
};

export default AddCabins;
