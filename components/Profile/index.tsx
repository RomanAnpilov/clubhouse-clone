/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import Link from "next/link";

import { Avatar } from "../../components/Avatar";
import { Button } from "../../components/Button";
import {BackButton} from "../BackButton";

import styles from "./Profile.module.scss";

interface ProfileProps {
  fullname: string;
  username: string;
  avatarUrl: string;
  about: string;
}

export const Profile: React.FC<ProfileProps> = ({
  fullname,
  username,
  avatarUrl,
  about,
}) => {
  return (
    <>
      <BackButton title="Back" href="/rooms" />

      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center">
          <Avatar src={avatarUrl} width="100px" height="100px" />
          <div className="d-flex flex-column ml-30 mr-30">
            <h2 className="mt-0 mb-0">{fullname}</h2>
            <h3 className={clsx("mt-0 mb-0", styles.username)}>@{username}</h3>
          </div>
        </div>
        <Button className={styles.followButton} color="blue">
          Follow
        </Button>
      </div>

      <p>{about}</p>
      </>
  );
};
