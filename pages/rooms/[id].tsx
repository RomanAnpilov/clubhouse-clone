/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Axios } from "../../core/axios";

import { Header } from "../../components/Header";
import { BackButton } from "../../components/BackButton";
import { Room } from "../../components/Room";
import { API } from "../../api";
import { GetServerSideProps } from "next";
import { wrapper } from "../../redux/store";
import { checkAuth } from "../../utils/checkAuth";

export default function RoomPage({ room }) {
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

        // if (!user) {
        //   return {
        //     props: {},
        //     redirect: {
        //       permanent: false,
        //       destination: "/",
        //     },
        //   };
        // }
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
