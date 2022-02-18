import React from "react";
import { Axios } from "../core/axios";
import Cookies from "nookies";

import { Button } from "../components/Button";
import { StartRoomModal } from "../components/StartRoomModal";
import { Header } from "../components/Header";
import { ConversationCard } from "../components/ConversationCard";
import { API } from "../api";

import { Room, RoomApi } from "../api/RoomApi";

import Link from "next/link";
import { checkAuth } from "../utils/checkAuth";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { setRooms } from "../redux/slices/roomSlice";
import { useSelector } from "react-redux";
import { selectRooms } from "../redux/selectors";
import { wrapper } from "../redux/store";
import { redirect } from "next/dist/server/api-utils";
import { setUserData } from "../redux/slices/userSlice";

const Rooms: NextPage = () => {
  const [visibleModal, setVisibleModal] = React.useState(false);
  const rooms = useSelector(selectRooms);

  return (
    <>
      <Header></Header>
      <div className="container">
        <div className="mt-40 d-flex align-items-center justify-content-between">
          <h1>All conversations</h1>
          <Button color="green" onClick={() => setVisibleModal(true)}>
            + Start room
          </Button>
        </div>
        {visibleModal ? (
          <StartRoomModal onClose={() => setVisibleModal(false)} />
        ) : (
          ""
        )}
        <div className="grid mt-20">
          {rooms.map((room) => (
            <Link key={room.id} href={`/rooms/${room.id}`}>
              <a>
                <ConversationCard
                  title={room.title}
                  guestsCount={room.listenersCount}
                  speakers={room.speakers}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    try {
      const user = await checkAuth(ctx, store);

      if (!user) {
        return {
          props: {},
          redirect: {
            permanent: false,
            destination: "/",
          },
        };
      }

      const rooms = await API(ctx).getAll();

      store.dispatch(setRooms(rooms));
      

      return {
        props: {},
      };

      // console.log(data)
    } catch (err) {
      console.log("ERROR BITCH!" + err);
    }
  });

export default Rooms;
