import Table from "../../ui/Table";
import useBooking from "./hooks/useBookings";
import Spinner from "../../ui/Spinner";
import { getBooking } from "../../services/apiBookings";
import { Amount, Cabin, Stacked } from "./BookingRow";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import Tag from "../../ui/Tag";
import { statusToTagName } from "../../utils/config";
import Pagination from "../../ui/Pagination";
import { Menus } from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckOut from "../check-in-out/hooks/useCheckOut";
import useBookingDelete from "./hooks/useBookingDelete";
import toast from "react-hot-toast";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
export type booking = Awaited<ReturnType<typeof getBooking>>["data"][number];

const ActionButton = ({ row }: { row: booking }) => {
  const navigate = useNavigate();
  const { checkOut, isCheckOut } = useCheckOut();
  const { DeleteBookingById, isDeleteingBooking } = useBookingDelete();
  return (
    <Menus>
      <Menus.Toggle />
      <Menus.List>
        <Menus.Button
          icon={<HiEye />}
          onClick={() => {
            navigate(`/bookings/${row.id}`);
          }}>
          See Details
        </Menus.Button>
        <Modal>
          <Modal.Open>
            <Menus.Button variation="danger" icon={<HiTrash />}>
              Delete
            </Menus.Button>
          </Modal.Open>
          <Modal.Content>
            <ConfirmDelete
              resourceName="delete booking"
              disabled={isDeleteingBooking}
              onConfirm={() => {
                toast.loading("loading", { id: `${row.id}-delete` });
                DeleteBookingById(row.id);
              }}
            />
          </Modal.Content>
        </Modal>
        {row.status === "unconfirmed" && (
          <Menus.Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => {
              navigate(`/checkin/${row.id}`);
            }}>
            Check In
          </Menus.Button>
        )}
        {row.status === "checked-in" && (
          <Menus.Button
            disabled={isCheckOut}
            isLoading={isCheckOut}
            icon={<HiArrowUpOnSquare />}
            onClick={() => {
              checkOut({ id: row.id });
            }}>
            Check Out
          </Menus.Button>
        )}
      </Menus.List>
    </Menus>
  );
};
const columns: columnDef<booking>[] = [
  {
    accessorKey: "cabines",
    header: "CABINE",
    cell(props) {
      return <Cabin>{props.row.cabines?.name}</Cabin>;
    },
  },
  {
    accessorKey: "guests",
    header: "CABINE",
    cell(props) {
      const { guests } = props.row;
      return (
        <Stacked>
          <span>{guests?.fullName}</span>
          <span>{guests?.email}</span>
        </Stacked>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "date",
    cell(props) {
      const { startDate, numNights, endDate } = props.row;
      return (
        <Stacked>
          <span>
            {isToday(new Date(startDate || ""))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate || ""), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate || ""), "MMM dd yyyy")}
          </span>
        </Stacked>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell(props) {
      const { status } = props.row;
      if (!status) return null;
      return (
        <Tag type={statusToTagName[status as keyof typeof statusToTagName]}>
          {status?.replace("-", " ")}
        </Tag>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: "AMOUNT",
    cell(props) {
      return <Amount>{formatCurrency(props.row.totalPrice || 0)}</Amount>;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell(props) {
      return <ActionButton row={props.row} />;
    },
  },
];
function BookingTable() {
  const { booking, isLoading, error, count } = useBooking();
  if (isLoading) return <Spinner />;
  if (error) return <div>{JSON.stringify(error, null, 4)}</div>;

  return (
    <Table rows={booking} columns={columns}>
      <Table.Header />
      <Table.Body />
      <Table.Footer>
        <Pagination count={count || 1} />
      </Table.Footer>
    </Table>
  );
}

export default BookingTable;
