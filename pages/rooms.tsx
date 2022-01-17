import React from "react";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { ConversationCard } from "../components/ConversationCard";
import Link from "next/link";

export default function Rooms() {
  return (
    <>
      <Header></Header>
      <div className="container">
        <div className="mt-40 d-flex align-items-center justify-content-between">
          <h1>All conversations</h1>
          <Button color="green">+ Start room</Button>
        </div>
        <div className="mt-20">
          <Link href="/rooms/test-room">
            <a>
              <ConversationCard
                title="Создаю клон Clubhouse"
                guestsCount={5}
                speakersCount={5}
                guests={["Adam Abramov", "Roman Anpilov", "Barak Obama"]}
                avatars={[
                  "https://images.unsplash.com/photo-1610974045780-b6f4e6cf424c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
                  "https://images.unsplash.com/photo-1641437229204-4ca4df00b6dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                ]}
              />
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
