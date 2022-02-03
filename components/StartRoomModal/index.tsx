/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import React from "react";

import { Button } from "../Button";
import { Axios } from "../../core/axios";
import { useRouter } from "next/router";

import styles from "./StartRoomModal.module.scss";

interface StartRoomModalProps {
  onClose: () => void;
}

export const StartRoomModal: React.FC<StartRoomModalProps> = ({ onClose }) => {
  const [roomType, setRoomType] = React.useState("open");

  const [form, setForm] = React.useState({title: '', type: ''})
  const router = useRouter();
  const onSubmit = async () => {
    try {
      const room = await Axios.post("/rooms", form);
      router.push(`/rooms/${room.id}`)
    } catch (error) {}
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img
          width={24}
          height={24}
          src="/static/close.svg"
          alt="Close"
          onClick={onClose}
        />
        <div className="mb-30">
          <h3>Topic</h3>
          <input
            className={styles.inputTitle}
            placeholder="Enter the topic to be discussed"
          />
        </div>
        <div className="mb-30">
          <h3>Room type</h3>
          <div className="d-flex justify-content-between">
            <div
              onClick={() => setRoomType("open")}
              className={clsx(styles.roomType, {
                [styles.roomTypeActive]: roomType === "open",
              })}
            >
              <img
                width={70}
                height={70}
                src="/static/room-type-1.png"
                alt="Room type"
              />
              <h5>Open</h5>
            </div>
            <div
              onClick={() => setRoomType("social")}
              className={clsx(styles.roomType, {
                [styles.roomTypeActive]: roomType === "social",
              })}
            >
              <img
                width={70}
                height={70}
                src="/static/room-type-2.png"
                alt="Room type"
              />
              <h5>Social</h5>
            </div>
            <div
              onClick={() => setRoomType("closed")}
              className={clsx(styles.roomType, {
                [styles.roomTypeActive]: roomType === "closed",
              })}
            >
              <img
                width={70}
                height={70}
                src="/static/room-type-3.png"
                alt="Room type"
              />
              <h5>Closed</h5>
            </div>
          </div>
        </div>
        <div className={styles.delimiter}></div>
        <div className="text-center">
          <h3>Start a room open to everyone</h3>
          <Button color="green" onClick={onClose}>
            <img
              width={18}
              height={18}
              src="/static/celebration.png"
              alt="Celebration"
            />
            Let&apos;s go
          </Button>
        </div>
      </div>
    </div>
  );
};
