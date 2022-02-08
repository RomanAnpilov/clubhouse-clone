/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";

import { Avatar } from "../../components/Avatar";
import { Button } from "../../components/Button";
import Link from "next/link";

import styles from "./Header.module.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";

export const Header: React.FC = () => {
  const userData = useSelector(selectUser)
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
          <b className="mr-5">{userData?.fullname}</b>
          <Link href={`/profile/${userData?.id}`} passHref>
            <div>
              <Avatar src={userData?.avatarUrl} width="50px" height="50px" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
