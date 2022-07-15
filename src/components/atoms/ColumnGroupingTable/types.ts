import React from "react";

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  format?: (value: number) => string;
}

export interface Data {
  id: number;
  periode: string;
  year_to_date: number;
  month_to_date: number;
}
