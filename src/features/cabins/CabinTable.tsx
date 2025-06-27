import Spinner from "../../ui/Spinner";
import { memo } from "react";
import useCabin from "./hooks/useCabin";
import ActionButtons from "./_components/ActionButtons";
import Table from "../../ui/Table";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const TableRowFooter = <TData extends RowWithId>(props: TableValue<TData>) => {
  return <Table.Row id={"footer"}>result:{props.rows.length}</Table.Row>;
};
const columns: columnDef<Cabin>[] = [
  {
    header: "",
    accessorKey: "image",
    cell(props) {
      return <Img src={props.row.image} alt={props.row.image} />;
    },
  },
  {
    header: "Cabine",
    accessorKey: "name",
    cell(props) {
      return <Cabin>{props.value}</Cabin>;
    },
  },
  { header: "Capacity", accessorKey: "maxCapacity" },
  {
    header: "Price",
    accessorKey: "regularPrice",
    cell(props) {
      return <Price>{formatCurrency(+props.value)}</Price>;
    },
  },
  {
    header: "Discount",
    accessorKey: "discount",
    cell: (props) => (
      <Discount>
        {props.value ? formatCurrency(+props.value) : <span>--</span>}
      </Discount>
    ),
  },
  {
    header: "",
    accessorKey: "actions",
    cell(props) {
      return <ActionButtons {...props} />;
    },
  },
];
const CabinTable = () => {
  const { isLoading, cabines } = useCabin();
  if (isLoading) return <Spinner />;

  return (
    <Table rows={cabines} columns={columns}>
      <Table.Header />
      <Table.Body></Table.Body>
      <Table.Footer render={TableRowFooter} />
    </Table>
  );
};

export default memo(CabinTable);
