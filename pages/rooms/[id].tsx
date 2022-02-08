/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Axios } from "../../core/axios";
import io, { Socket } from "socket.io-client";

import { Header } from "../../components/Header";
import { BackButton } from "../../components/BackButton";
import { Room } from "../../components/Room";
import { API } from "../../api";
import { GetServerSideProps } from "next";
import { wrapper } from "../../redux/store";
import { checkAuth } from "../../utils/checkAuth";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useRouter } from "next/router";


export default function RoomPage({ room }) {
  const router = useRouter();

  const socketRef = React.useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  React.useEffect(() => {
    socketRef.current = io("http://localhost:3002");

    socketRef.current.emit("ROOMS/JOIN", router.query.id)

    return () => {
      socketRef.current.disconnect()
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-40">
        <BackButton title="All rooms" href="/rooms" />
      </div>
      <Room title={room.title} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    {
      try {
        const user = await checkAuth(ctx, store);
        const roomID = ctx.query.id;

        const room = await API(ctx).get(Number(roomID));
        return {
          props: {
            room: room,
          },
        };
      } catch (err) {
        console.log("ERROR BITCH!");
        return {
          props: [],
          redirect: {
            destination: "/rooms",
            permanent: false,
          },
        };
      }
    }
  });
