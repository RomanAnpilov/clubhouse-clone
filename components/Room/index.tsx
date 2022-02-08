/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import Link from "next/link";
import React from "react";

import { Button } from "../Button";
import { Speaker } from "../Speaker";

import styles from "./Room.module.scss";

interface RoomProps {
  title: string;
}

type User = {
  fullname: string;
  avatarUrl: string;
};

export const Room: React.FC<RoomProps> = ({ title }) => {
  const [users, setUsers] = React.useState<User[]>([]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className="d-flex align-items-center justify-content-between">
          <h2>{title}</h2>
          <div
            className={clsx("d-flex align-items-center", styles.actionButtons)}
          >
            <Link href="/rooms">
              <a>
                <Button color="gray" className={styles.leaveButton}>
                  <img
                    width={18}
                    height={18}
                    src="/static/peace.png"
                    alt="Leave"
                  />
                  Leave queitly
                </Button>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.users}>
          {users.map((obj, index) => (
            <Speaker key={index} {...obj} />
          ))}
        </div>
      </div>
    </>
  );
};
