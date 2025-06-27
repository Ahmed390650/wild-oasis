import { useSearchParams } from "react-router-dom";
import Tabs from "./Tab";

type TypeFilter = {
  options: option[];
  filterField: string;
};
const Filter = ({ options, filterField }: TypeFilter) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentActive = searchParams.get(filterField) || options.at(0)?.value;
  const handleFilter = (value: string) => {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  };
  return (
    <Tabs defaultValue="All">
      <Tabs.TabsList>
        {options.map(({ label, value }, i) => (
          <Tabs.TabsTrigger
            active={currentActive == value}
            onClick={() => handleFilter(value)}
            value={value}
            key={i}>
            {label}
          </Tabs.TabsTrigger>
        ))}
      </Tabs.TabsList>
    </Tabs>
  );
};

export default Filter;
