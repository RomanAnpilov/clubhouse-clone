import clsx from "clsx";

import { Avatar } from "../../components/Avatar";
import { Button } from "../../components/Button";
import Link from "next/link";

import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className="container d-flex align-items-center justify-content-between">
        <div className={clsx(styles.headerLogo, "d-flex align-items-center")}>
          <img
            src="/static/hand-wave.svg"
            className={clsx(styles.logo, "mr-10")}
            alt="Logo"
          />
          <h4>Clubhouse</h4>
        </div>
        <div className="d-flex align-items-center  cup">
          <b className="mr-5">Roman Anpilov</b>
          <Link href="/profile/1">
            <div>
              <Avatar src="/static/cat.jpeg" width="50px" height="50px" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
