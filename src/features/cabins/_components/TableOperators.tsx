import Filter from "../../../ui/Filter";
import Row from "../../../ui/Row";
import SortBy from "../../../ui/SortBy";

const optionsFitler: option<filter>[] = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "With discount",
    value: "With-discount",
  },
  {
    label: "No discount",
    value: "No-discount",
  },
];
const optionsSortBy: option[] = [
  { label: "sort by name (A-Z)", value: "name-asc" },
  { label: "sort By name(Z-A)", value: "name-desc" },
  { label: "sort By price (low price)", value: "regularPrice-asc" },
  { label: "sort By price (high price)", value: "regularPrice-desc" },
  { label: "sort By maxCapacity (low Capacity)", value: "maxCapacity-asc" },
  { label: "sort By maxCapacity (high Capacity)", value: "maxCapacity-desc" },
];
const TableOperators = () => {
  return (
    <Row type="horizontal">
      <Filter filterField="discount" options={optionsFitler}></Filter>
      <SortBy options={optionsSortBy} placeholder="Sort By" />
    </Row>
  );
};

export default TableOperators;
