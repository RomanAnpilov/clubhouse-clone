/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";

import { Header } from "../../components/Header";
import { BackButton } from "../../components/BackButton";
import { Room } from "../../components/Room";

export default function RoomPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header />
      <div className="container mt-40">
        <BackButton title="All rooms" href="/rooms" />
      </div>
      <Room title="Its time to fuck"/>
    </>
  );
}
