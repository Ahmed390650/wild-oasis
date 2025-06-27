
interface Cabin {
  id: number;
  createdAt: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}
interface booking {
  cabineId: number | null;
  cabinePrice: number | null;
  created_at: string;
  endDate: string | null;
  extraPrice: number | null;
  guestId: number | null;
  hasBreakfast: boolean | null;
  id: number;
  isPaid: boolean | null;
  numGuests: number | null;
  numNights: number | null;
  observations: string | null;
  startDate: string | null;
  status: string | null;
  totalPrice: number | null;
}
type RowWithId = {
  id: number;
};
type cellProps<TData, TKey extends keyof TData> = {
  value: TData[TKey];
  row: TData;
};
type columnDef<TData, TKey extends keyof TData = keyof TData> = {
  accessorKey: Exclude<keyof TData, "id"> | "actions";
  header: string;
  cell?: (props: cellProps<TData, TKey>) => ReactNode | ReactNode
};
type TableValue<TData extends RowWithId> = {
  columns: columnDef<TData>[];
  columnsTemplate: string;
  rows: TData[];
};
type option<T extends string = ReactNode> = {
  value: string;
  label: T
}
type filter = "All" | "With discount" | "No discount";
interface ButtonProps<TSizes, Tvariations> {
  readonly sizes?: TSizes;
  readonly variation?: Tvariations;
}
type position = { x: number; y: number } | null;
type typePortalContent = { position: position; isOpen: boolean };
type typeMenu = {
  openId: string | null;
  id: string;
  position: { x: number; y: number };
  openMenu: (pos: { x: number; y: number }) => void;
  closeMenu: () => void;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
};

type UserType = { email?: string, password?: string, avatar?: File, fullName?: string }
