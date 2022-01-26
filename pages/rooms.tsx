import React from "react";
import axios from "axios";
import Cookies from "nookies"

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { ConversationCard } from "../components/ConversationCard";
import { UserApi } from "../api/UserApi";

import Link from "next/link";


export default function Rooms({rooms = []}) {
    return (
    <>
      <Header></Header>
      <div className="container">
        <div className="mt-40 d-flex align-items-center justify-content-between">
          <h1>All conversations</h1>
          <Button color="green">+ Start room</Button>
        </div>
        <div className="grid mt-20">
          {rooms.map((room) => (
            <Link key={room.id} href={`/rooms/${room.id}`}>
              <a>
                <ConversationCard
                  title={room.title}
                  guestsCount={room.guestCount}
                  speakersCount={room.speakersCount}
                  guests={room.guests}
                  avatars={room.avatars}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const {data} = await axios.get('http://localhost:3000/rooms.json');
    // const user = await UserApi.getMe();
    // console.log(user, "USER !!!!!!")

    return {
      props: {
        rooms: data
      }
    }
    // console.log(data)
  } catch (err) {
    console.log("ERROR BITCH!" + err)
  }
  
}