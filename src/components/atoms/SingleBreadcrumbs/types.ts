import { BreadcrumbsProps } from "@mui/material";

export interface ISingleBreadcrumbsProps extends BreadcrumbsProps {
  firstLink?: string;
  firstTitle?: string;
  secondLink?: string;
  secondTitle?: string;
  title?: string;
}
