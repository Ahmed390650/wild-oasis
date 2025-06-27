import { createContext, ReactNode, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div<{ readonly columns: string; readonly id: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledFooter = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;
  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const TableContext = createContext<unknown>(null);

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;
function useTable<TData extends RowWithId>(): TableValue<TData> {
  const context = useContext(TableContext);
  if (!context) throw new Error("TableContext is not provided");
  return context as TableValue<TData>;
}

const Table = <TData extends RowWithId>({
  children,
  rows,
  columns,
}: {
  children: ReactNode;
  columns: columnDef<TData>[];
  rows?: TData[];
}) => {
  const columnsTemplate = columns.map(() => "1fr").join(" ");

  return (
    <TableContext.Provider value={{ columns, columnsTemplate, rows }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
};

const Header = () => {
  const { columns, columnsTemplate } = useTable();

  return (
    <StyledHeader
      columns={columnsTemplate}
      as={"header"}
      id={new Date().getTime().toString()}>
      {columns.map(({ header, accessorKey }) => (
        <div key={accessorKey}>{header}</div>
      ))}
    </StyledHeader>
  );
};
const Row = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string | number;
}) => {
  const { columnsTemplate, rows } = useTable();
  if (!rows.length) return <Empty>No Data to show at the moment</Empty>;
  return (
    <StyledRow id={String(id)} role="row" columns={columnsTemplate}>
      {children}
    </StyledRow>
  );
};
const Cell = <TData,>({
  columns,
  row,
}: {
  columns: columnDef<TData>[];
  row: TData;
}) => {
  return (
    <>
      {columns.map((col, i) => {
        const value = row[col.accessorKey as keyof TData];
        return <div key={i}>{col.cell ? col.cell({ row, value }) : value}</div>;
      })}
    </>
  );
};
const Body = <TData extends RowWithId>() => {
  const props = useTable<TData>();
  const { columns, rows } = props;
  return (
    <StyledBody>
      {rows.map((row) => (
        <Row key={row.id} id={row.id}>
          <Cell columns={columns} row={row} />
        </Row>
      ))}
    </StyledBody>
  );
};
const Footer = ({ children }: { children: ReactNode }) => {
  return <StyledFooter>{children}</StyledFooter>;
};
Table.Footer = Footer;
Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
export default Table;
