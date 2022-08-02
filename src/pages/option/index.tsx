import * as React from "react";
import { DrawerNav, Report } from "../../components";
import { Dashboard } from "..";
export default function Index() {
  return (
    <DrawerNav>
      <Dashboard />
    </DrawerNav>
  );
}
