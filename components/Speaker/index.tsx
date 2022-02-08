import React from "react";
import { Avatar } from "../Avatar";

interface SpeakerProps {
  fullname: string;
  avatarUrl: string;
}

export const Speaker: React.FC<SpeakerProps> = ({ avatarUrl, fullname }) => {
  return (
    <div className="d-i-flex flex-column align-items-center mr-40 mb-50">
      <Avatar src={avatarUrl} height="100px" width="100px"/>
      <div className="mt-10">
        <b>{fullname}</b>
      </div>
    </div>
  );
};
