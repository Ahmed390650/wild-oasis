import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./hooks/useBooking";
import CheckoutButton from "../check-in-out/CheckoutButton";
import useBookingDelete from "./hooks/useBookingDelete";
import toast from "react-hot-toast";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import { HiTrash } from "react-icons/hi2";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { data } = useBooking();
  const statusDefault = "checked-in";
  const { isDeleteingBooking, DeleteBookingById } = useBookingDelete();
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (!data) return null;
  const { id } = data;
  const status = (
    data.status ? data.status : statusDefault
  ) as keyof typeof statusToTagName;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={data} />

      <Row type="horizontal">
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        {status === "checked-in" && <CheckoutButton bookingId={id} />}

        <Modal>
          <Modal.Open>
            <Button variation="danger">
              <HiTrash />
              Delete
            </Button>
          </Modal.Open>
          <Modal.Content>
            <ConfirmDelete
              resourceName="delete booking"
              disabled={isDeleteingBooking}
              onConfirm={() => {
                toast.loading("loading", { id: `${id}-delete` });
                DeleteBookingById(id, {
                  onSuccess: () => {
                    moveBack();
                  },
                });
              }}
            />
          </Modal.Content>
        </Modal>
      </Row>
    </>
  );
}

export default BookingDetail;
