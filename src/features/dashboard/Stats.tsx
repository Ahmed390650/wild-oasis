import {
  getBookingsAfterDate,
  getStaysAfterDate,
} from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
type bookings = Awaited<ReturnType<typeof getBookingsAfterDate>>;
type stays = Awaited<ReturnType<typeof getStaysAfterDate>>;
const Stats = ({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
  isLoading,
}: {
  bookings: bookings | undefined;
  confirmedStays: stays | undefined;
  numDays: number;
  cabinCount: number;
  isLoading: boolean;
}) => {
  if (isLoading) return <Spinner />;

  if (!bookings || !confirmedStays) return null;
  const numBookings = bookings.length;
  const sales = confirmedStays.reduce((acc, cur) => acc + cur.totalPrice!, 0);
  const checkins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights!, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        color={"blue"}
        title={"Bookings"}
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        color={"green"}
        title={"Sales"}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        color={"indigo"}
        title={"Check ins"}
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        color={"yellow"}
        title={"Occupancy rate"}
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
};

export default Stats;
