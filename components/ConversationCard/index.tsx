/* eslint-disable @next/next/no-img-element */
import React from "react";
import clsx from "clsx";

import { Avatar } from "../Avatar";

import styles from "./ConversationCard.module.scss";
import whiteBlockStyles from "../WhiteBlock/WhiteBlock.module.scss";

interface ConversationCardProps {
    title: string;
    speakers: string[];
    avatars: string[];
    guestsCount: number;
}

export const ConversationCard: React.FC<ConversationCardProps> = ({
  title,
  speakers = [],
  avatars = [],
  guestsCount,
}) => {
  return (
    <div className={clsx(styles.card,whiteBlockStyles.block, "mb-30")}>
      <h4 className={styles.title}>{title}</h4>
      <div className={clsx("d-flex mt-10", styles.content)}>
        <div className={styles.avatars}>
          {avatars.map((url, i) => (
            <Avatar
              width="55px"
              height="55px"
              src={url}
              key={i}
              className={avatars.length > 1 && i === avatars.length - 1 ? styles.lastAvatar : ""}
            />
          ))}
        </div>
        <div className={clsx(styles.info, "ml-10")}>
          <ul className={styles.users}>
            {speakers.map((name, i) => (
              <li key={i}>
                {name}
                <img
                  src="/static/cloud.png"
                  alt="Cloud"
                  width={14}
                  height={14}
                />
              </li>
            ))}
          </ul>
          <ul className={styles.details}>
            <li>
              {guestsCount}{" "}
              <img
                src="/static/user.png"
                alt="Users count"
                width={12}
                height={12}
              />{" "}
            </li>
            <li>
              {speakers.length}
              <img
                className="ml-5"
                src="/static/message.png"
                alt="Users count"
                width={12}
                height={12}
              />{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
