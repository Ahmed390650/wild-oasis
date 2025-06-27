import Button from "../../ui/Button";
import useCheckOut from "./hooks/useCheckOut";
import { LoaderIcon } from "react-hot-toast";

function CheckoutButton({ bookingId }: { bookingId: number }) {
  const { checkOut, isCheckOut } = useCheckOut();
  return (
    <Button
      variation="primary"
      sizes="small"
      disabled={isCheckOut}
      onClick={() => {
        checkOut({ id: bookingId });
      }}>
      {isCheckOut && <LoaderIcon style={{ width: 10, height: 10 }} />}
      Check out
    </Button>
  );
}

export default CheckoutButton;
