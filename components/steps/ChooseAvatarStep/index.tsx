/* eslint-disable @next/next/no-img-element */
import React from "react";
import clsx from "clsx";
import { Axios } from "../../../core/axios";

import { Button } from "../../Button";
import { WhiteBlock } from "../../WhiteBlock";
import { StepInfo } from "../../StepInfo";
import { Avatar } from "../../Avatar";
import { MainContext } from "../../../pages";

import styles from "./ChooseAvatarStep.module.scss";

const uploadFile = async (file: File): Promise<{url: string}> => {
  const formData = new FormData();

  formData.append("photo", file);

  const { data } = await Axios({
    method: "POST",
    url: "/upload",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const ChooseAvatarStep: React.FC = () => {
  const { onNextStep, setFieldValue, userData } = React.useContext(MainContext);
  const avatarLetters = userData.fullname.split(" ").map(s => s[0]).join("")
  const [avatarUrl, setAvatarUrl] = React.useState<string>(userData.avatarUrl);
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChangeImage = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
      const data = await uploadFile(file);
      setAvatarUrl(data.url);
      setFieldValue('avatarUrl',data.url)
    }
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
        title={`Okay, ${userData.fullname}!`}
        description="How is this photo?"
      />
      <WhiteBlock className={clsx("m-auto mt-40", styles.whiteBlock)}>
        <div className={styles.avatar}>
          <Avatar letters={avatarLetters} width="120px" height="120px" src={avatarUrl} />
        </div>
        <div className="mb-30">
          <label htmlFor="image" className="link cup">
            Choose a different photo
          </label>
        </div>
        <input id="image" ref={inputFileRef} type="file" hidden />
        <Button onClick={onNextStep}>
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
