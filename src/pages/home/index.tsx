import * as React from "react";
import { Layout, MainCard, H1, H2, H3 } from "../../components";
export default function Index() {
  return (
    <Layout auth={""}>
      <MainCard
        label={"Home"}
        title={"Ini Home"}
        description={"Semangat bekerja demi kau dan sibuah hati"}
      />
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
    </Layout>
  );
}
