import { Breadcrumbs, Link, Typography } from "@mui/material";
import * as React from "react";
import { ISingleBreadcrumbsProps } from "./types";

const Index: React.FunctionComponent<ISingleBreadcrumbsProps> = ({
  firstLink = "#",
  firstTitle,
  secondLink = "#",
  secondTitle,
  title,
  ...props
}) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" {...props}>
      <Link underline="hover" color="inherit" href={firstLink}>
        {firstTitle}
      </Link>
      <Link underline="hover" color="inherit" href={secondLink}>
        {secondTitle}
      </Link>
      <Typography color="text.primary">{title}</Typography>
    </Breadcrumbs>
  );
};

export default Index;
