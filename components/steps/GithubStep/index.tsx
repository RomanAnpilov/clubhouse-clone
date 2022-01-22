/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import React from "react";

import { Button } from "../../Button";
import { WhiteBlock } from "../../WhiteBlock";
import { StepInfo } from "../../StepInfo";
import { MainContext } from "../../../pages";

import styles from "./GithubStep.module.scss";

export const GithubStep: React.FC = () => {
  const { onNextStep, setUserData } = React.useContext(MainContext);

  const onClickAuth = () => {
    const win = window.open(
      "http://localhost:3002/auth/github/",
      "Auth",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=400, height=500"
    );
  };

  React.useEffect(() => {
    window.addEventListener("message", ({data}) => {
      const user: string = data;

      if (typeof user === "string" && user.includes("avatarUrl")) {
        const json = JSON.parse(user);
        setUserData(json)
      }
      onNextStep();
    });
  });

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/plug.png"
        title="Do you want import info from GitHub?"
      />
      <WhiteBlock className={clsx("m-auto mt-40", styles.whiteBlock)}>
        <div className={styles.avatar}>
          <b>RA</b>
        </div>
        <h2 className="mb-40">Roman Anpilov</h2>
        <div>
          <Button className={styles.button} onClick={onClickAuth}>
            Import from GitHub
            <img
              height={12}
              className="d-ib ml-10"
              src="/static/arrow.png"
              alt="arrow"
            />
          </Button>
        </div>
        <div className="link mt-20 cup d-ib">Enter my info manually</div>
      </WhiteBlock>
    </div>
  );
};
