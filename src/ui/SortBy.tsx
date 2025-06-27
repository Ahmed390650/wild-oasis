import { useSearchParams } from "react-router-dom";
import Select from "./Select";
type sortType = {
  options: option[];
  placeholder: string;
  defaultValue?: string;
};
const SortBy = ({ options, placeholder, defaultValue }: sortType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const currentActive = searchParams.get(filterField) || options.at(0)?.value;
  const handleChange = (value: string) => {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  return (
    <Select onValueChange={handleChange} defaultValue={defaultValue}>
      <Select.SelectTrigger>
        <Select.SelectValue placeholder={placeholder} />
      </Select.SelectTrigger>
      <Select.SelectContent>
        {options.map(({ label, value }) => (
          <Select.SelectItem value={value}>{label}</Select.SelectItem>
        ))}
      </Select.SelectContent>
    </Select>
  );
};

export default SortBy;
