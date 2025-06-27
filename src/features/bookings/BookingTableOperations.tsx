import Filter from "../../ui/Filter";
import Row from "../../ui/Row";
import SortBy from "../../ui/SortBy";
import { statusToTagName } from "../../utils/config";
import Tag from "../../ui/Tag";
function BookingTableOperations() {
  return (
    <Row type="horizontal">
      <Filter
        filterField="status"
        options={[
          {
            value: "all",
            label: "All",
          },
          {
            value: "checked-out",
            label: <Tag type={statusToTagName["checked-out"]}>checked out</Tag>,
          },
          {
            value: "checked-in",
            label: <Tag type={statusToTagName["checked-in"]}>checked in</Tag>,
          },
          {
            value: "unconfirmed",
            label: <Tag type={statusToTagName["unconfirmed"]}>unconfirmed</Tag>,
          },
        ]}
      />
      <SortBy
        defaultValue="Sort by date (recent first)"
        placeholder="sort with"
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </Row>
  );
}

export default BookingTableOperations;
