export interface IResponsiveDateTimePickerProps {
  label?: string;
  placeholder?: string;
  value?: any;
  handleChange?: any;
  totalColumn?: number;
  leftColumn?: number;
  rightColumn?: number;
  direction?: "row" | "column";
  isRequired?: boolean;
  minDateTime?: any;
}
