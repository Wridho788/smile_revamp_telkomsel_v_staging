export interface IResponsiveDatePickerProps {
  label?: string;
  placeholder?: string;
  value?: any;
  handleChange?: any;
  totalColumn?: number;
  leftColumn?: number;
  rightColumn?: number;
  direction?: "row" | "column";
  isRequired?: boolean;
  minDate?: any;
  disabled?: boolean;
}
