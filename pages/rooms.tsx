import React from "react";
import {Axios} from "../core/axios";
import Cookies from "nookies"

import { Button } from "../components/Button";
import {StartRoomModal} from "../components/StartRoomModal";
import { Header } from "../components/Header";
import { ConversationCard } from "../components/ConversationCard";
import { API } from "../api";

import {Room, RoomApi} from "../api/RoomApi";

import Link from "next/link";
import { checkAuth } from "../utils/checkAuth";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";


interface RoomPageProps {
  rooms: Room[];
}

const Rooms: NextPage<RoomPageProps> = ({rooms = []}) => {
  
  const [visibleModal, setVisibleModal] = React.useState(false);
  
    return (
    <>
      <Header></Header>
      <div className="container">
        <div className="mt-40 d-flex align-items-center justify-content-between">
          <h1>All conversations</h1>
          <Button color="green" onClick={() => setVisibleModal(true)}>+ Start room</Button>
        </div>
        {visibleModal ? <StartRoomModal onClose={() => setVisibleModal(false)} /> : ""}
        <div className="grid mt-20">
          {rooms.map((room) => (
            <Link key={room.id} href={`/rooms/${room.id}`}>
              <a>
                <ConversationCard
                  title={room.title}
                  guestsCount={room.listenersCount}
                  speakers={room.speakers}
                  avatars={[]}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<RoomPageProps> = async (ctx) => {
  try {
    // const {data} = await axios.get('http://localhost:3000/rooms.json');
    const user = await checkAuth(ctx);
    console.log(user, "USER !!!!!!")
    
    const rooms = await API(ctx).getAll();

    return {
      props: {
        rooms: rooms
      }
    }
    // console.log(data)
  } catch (err) {
    console.log("ERROR BITCH!" + err)
  }
  
}

export default Rooms;