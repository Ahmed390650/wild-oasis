import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/hooks/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import useChecking from "./hooks/useChecking";
import toast, { LoaderIcon } from "react-hot-toast";
import { formatCurrency } from "../../utils/helpers";
import { BsSave2 } from "react-icons/bs";
import useSetting from "../settings/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { data: booking, isLoading } = useBooking();
  const [confirmPaid, setConfirmPiad] = useState(false);
  const [addBreakFast, setAddBreakFast] = useState(false);
  const moveBack = useMoveBack();
  const { mutate, isPending } = useChecking();
  const { data: setting, isLoading: isSettingLoading } = useSetting();
  useEffect(() => {
    setConfirmPiad(booking?.isPaid ?? false);
  }, [booking]);
  if (isLoading || isSettingLoading) return <Spinner />;
  if (!booking || !setting) return null;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  function handleCheckin() {
    if (!confirmPaid) return null;
    toast.loading("loading ...", { id: "update-checking" });
    if (addBreakFast) {
      mutate({
        id: bookingId,
        breakFast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakFastPrice,
          totalPrice: totalPrice! + optionalBreakFastPrice,
        },
      });
    } else {
      mutate({ id: bookingId });
    }
  }
  const optionalBreakFastPrice =
    setting.breakfastPrice! * numNights! * numGuests!;
  const totalPriceCheck = !addBreakFast
    ? formatCurrency(totalPrice!)
    : `${formatCurrency(totalPrice! + optionalBreakFastPrice)} (${formatCurrency(totalPrice!)} +${formatCurrency(optionalBreakFastPrice!)})`;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakFast}
            id={setting.id.toString()}
            onChange={() => {
              setAddBreakFast((v) => !v);
              setConfirmPiad(false);
            }}>
            Want to add breakfast for {optionalBreakFastPrice}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isPending}
          id={bookingId.toString()}
          onChange={() => setConfirmPiad((v) => !v)}>
          I confirm that{guests?.fullName} has paid the total amount{" "}
          {totalPriceCheck}
        </Checkbox>
      </Box>
      <Row
        type="horizontal"
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          width: "500px",
        }}>
        <Button
          onClick={handleCheckin}
          disabled={isPending || !confirmPaid}
          variation="primary">
          {isPending ? <LoaderIcon /> : <BsSave2 />}Check in booking #
          {bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </Row>
    </>
  );
}

export default CheckinBooking;
