/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import Link from "next/link";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useRouter } from "next/router";
import io, { Socket } from "socket.io-client";
import React from "react";

import { Button } from "../Button";
import { Speaker } from "../Speaker";

import styles from "./Room.module.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";
import { UserData } from "../../pages";

interface RoomProps {
  title: string;
}

type User = {
  fullname: string;
  avatarUrl: string;
};

export const Room: React.FC<RoomProps> = ({ title }) => {
  const user = useSelector(selectUser)
  const [users, setUsers] = React.useState<UserData[]>([]);

  const router = useRouter();

  const socketRef = React.useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  React.useEffect(() => {
    socketRef.current = io("http://localhost:3002");

    socketRef.current.emit("CLIENT@ROOMS:JOIN", {
      user: user,
      roomId: router.query.id,
    });

    socketRef.current.on("SERVER@ROOMS:JOIN", (joinedUser) => {
      setUsers((prev) => [...prev, joinedUser]);
      console.log(joinedUser);
    });

    socketRef.current.on("SERVER@ROOMS:LEAVE", (leaveUser) => {
     setUsers((prev) => prev.filter(obj => obj.id !== leaveUser.id))
     console.log("AGAGAGAG")
    });

    setUsers((prev) => [...prev, user])

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

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
