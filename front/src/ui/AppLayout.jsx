import { Outlet } from "react-router";

import Header from "./Header";
import Footer from "./Footer";

function AppLayout() {
  return (
    <>
      <Header></Header>
      <main className="overflow-hidden bg-gray-100">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
}

export default AppLayout;
