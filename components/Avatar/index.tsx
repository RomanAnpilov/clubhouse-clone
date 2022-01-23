import clsx from "clsx";
import React from "react";

import styles from "./Avatar.module.scss";

interface AvatarProps {
  src: string;
  width: string;
  height: string;
  className?: string;
  isVoice?: boolean;
  letters?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  width,
  height,
  className,
  isVoice,
  letters
}) => {
  return (
    <div
      style={{ width, height, backgroundImage: `url(${src})` }}
      className={clsx(
        styles.avatar,
        isVoice ? styles.avatarBorder : "",
        className,
        { [styles.emptyAvatar]: !src }
      )}
    >{!src ? letters : null}</div>
  );
};
