import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabins from "../features/cabins/AddCabines";
import CabinTable from "../features/cabins/CabinTable";
import TableOperators from "../features/cabins/_components/TableOperators";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <TableOperators />
      </Row>
      <Row>
        <AddCabins />
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
