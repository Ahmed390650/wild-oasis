import styled from "styled-components";
import { getStaysTodayActivity } from "../../services/apiBookings";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import CheckoutButton from "./CheckoutButton";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 10rem;
  gap: 1.2rem;
  align-items: center;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;
type Active = Awaited<ReturnType<typeof getStaysTodayActivity>>[number];
const TodayItem = ({ active }: { active: Active }) => {
  const { status, guests, numNights, id } = active;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Deparating</Tag>}
      <Flag
        src={guests?.countryFlag || ""}
        alt={` name of ${guests?.nationality}`}
      />
      <Guest>{guests?.fullName}</Guest>
      <div>{numNights} nights</div>
      {status === "unconfirmed" && (
        <Button
          as={Link}
          to={`/checkin/${id}`}
          sizes="small"
          variation="primary">
          check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
};

export default TodayItem;
