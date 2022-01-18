/* eslint-disable @next/next/no-img-element */
import React from "react";
import axios from "../../core/axios"

import { Header } from "../../components/Header";
import { BackButton } from "../../components/BackButton";
import { Room } from "../../components/Room";

export default function RoomPage({room}) {
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

export const getServerSideProps = async (ctx) => {
  try {
    const {data} = await axios.get('/rooms.json');
    const room = data.find((obj) => obj.id === ctx.query.id)
    console.log(room)
    return {
      props: {
        room: room
      }
    }
    console.log(data)
  } catch (err) {
    console.log("ERROR BITCH!")
  }
}