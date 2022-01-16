/* eslint-disable @next/next/no-img-element */
import React from "react";
import clsx from "clsx";

import { Button } from "../../Button";
import { WhiteBlock } from "../../WhiteBlock";
import { StepInfo } from "../../StepInfo";
import { Avatar } from "../../Avatar";

import styles from "./ChooseAvatarStep.module.scss";

export const ChooseAvatarStep: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = React.useState<string>('');
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChangeImage = (event: Event):void => {
    const file = (event.target as HTMLInputElement).files[0];
    const imageUrl = URL.createObjectURL(file);
    setAvatarUrl(imageUrl);
  };

  React.useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener("change", handleChangeImage);
    }
  }, []);

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/celebration.png"
        title="Okay, Roman Anpilov!"
        description="How is this photo?"
      />
      <WhiteBlock className={clsx("m-auto mt-40", styles.whiteBlock)}>
        <div className={styles.avatar}>
        <Avatar
          width="120px"
          height="120px"
          src={avatarUrl}
        />
        </div>
        <div className="mb-30">
          <label htmlFor="image" className="link cup">
            Choose a different photo
          </label>
        </div>
        <input id="image" ref={inputFileRef} type="file" hidden />
        <Button>
          Next
          <img
            height={12}
            className="d-ib ml-10"
            src="/static/arrow.png"
            alt="arrow"
          />
        </Button>
      </WhiteBlock>
    </div>
  );
};
