import React from "react";
import axios from "../core/axios";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { ConversationCard } from "../components/ConversationCard";

import Link from "next/link";

export default function Rooms() {
  const [rooms, setRooms] = React.useState([]);
  //TODO: исправить получение данных на крутое getprops ...
  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get("/rooms.json");
      setRooms(data);
    })();
  }, []);

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
            <Link key={room.id} href="/rooms/test-room">
              <a>
                <ConversationCard
                  title={room.title}
                  guestsCount={room.guestsCount}
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
