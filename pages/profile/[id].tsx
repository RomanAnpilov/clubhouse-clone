/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";

import { Profile } from "../../components/Profile";
import {Header} from "../../components/Header";


export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
    <Header />
    <div className="container">
      <Profile
        fullname="Roman Anpilov"
        username="airgurt"
        avatarUrl="/static/cat.jpeg"
        about="asdsdsd"
      ></Profile>
    </div>
    </>
  );
}
