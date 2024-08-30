import SideNav from "../components/common/SideNav";
import styles from "./PageLayout.module.css";
import { Outlet } from "react-router-dom";
import AppContextProvider from "../context/AppContextProvider";

export function PageLayout() {
  return (
    <AppContextProvider>
      <div className={styles.layout}>
        <SideNav></SideNav>
        <div className={styles["content-wrapper"]}>
          <Outlet />
        </div>
      </div>
    </AppContextProvider>
  );
}
