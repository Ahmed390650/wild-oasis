import styled from "styled-components";
import useRecentBooking from "./hooks/useRecentBooking";
import useRecentStays from "./hooks/useRecentStays";
import Spinner from "../../ui/Spinner";
import useCabin from "../cabins/hooks/useCabin";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isLoading1 } = useRecentBooking();
  const { isLoading2, confirmedstays, numDays } = useRecentStays();
  const { cabines, isLoading: isLoading3 } = useCabin();
  return (
    <StyledDashboardLayout>
      <Stats
        isLoading={isLoading1 || isLoading3}
        bookings={bookings}
        confirmedStays={confirmedstays}
        numDays={numDays}
        cabinCount={cabines.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedstays} isLoading={isLoading2} />
      <SalesChart
        bookings={bookings!}
        numDays={numDays}
        isLoading={isLoading1}
      />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
