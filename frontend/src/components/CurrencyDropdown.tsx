import Select, { SingleValue } from "react-select";
import { currency } from "../constants/currency";

export type SelectedOption = SingleValue<{label: string, value: string}>

type DropdownProps = {
  placeholder: string;
  handleChange: (selectedOption: SelectedOption) => void;
  value: string;
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const { handleChange, value, placeholder } = props

  const selectedValue = currency.find((option) => option.value === value)

  return(
    <Select
      options={currency}
      onChange={handleChange}
      value={selectedValue}
      placeholder={placeholder}
      isSearchable={true}
    />
  );
};