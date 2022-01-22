/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import React from "react";
import {Axios} from "../../../core/axios";

import { useRouter } from "next/router";

import { Button } from "../../Button";
import { WhiteBlock } from "../../WhiteBlock";
import { StepInfo } from "../../StepInfo";

import styles from "./EnterCodeStep.module.scss";

export const EnterCodeStep: React.FC  = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [codes, setCodes] = React.useState([]);
  const nextDisabled = codes.some((v) => !v) || codes.length < 4;

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(event.target.getAttribute("id")) - 1;
    const value = event.target.value;
    setCodes((prev) => {
      const newArr = [...prev];
      newArr[id] = value;
      return newArr;
    });
    if (event.target.nextSibling) {
      (event.target.nextSibling as HTMLInputElement).focus();
    }
  };

  const onSubmit = async () => {
    try {
      await Axios.get("/todos");
      setIsLoading(true);
      router.push('/rooms')
    } catch (err) {
      alert("ERROR!")
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.block}>
      {!isLoading ? (
        <>
          {" "}
          <StepInfo icon="/static/code.png" title="Enter your activate code" />
          <WhiteBlock className={clsx("m-auto mt-30", styles.whiteBlock)}>
            <div className={clsx("mb-30", styles.codeInput)}>
              <input
                type="tel"
                placeholder="X"
                maxLength={1}
                id="1"
                onChange={handleChangeInput}
                value={codes[0] || ""}
              />
              <input
                type="tel"
                placeholder="X"
                maxLength={1}
                id="2"
                onChange={handleChangeInput}
                value={codes[1] || ""}
              />
              <input
                type="tel"
                placeholder="X"
                maxLength={1}
                id="3"
                onChange={handleChangeInput}
                value={codes[2] || ""}
              />
              <input
                type="tel"
                placeholder="X"
                maxLength={1}
                id="4"
                onChange={handleChangeInput}
                value={codes[3] || ""}
              />
            </div>

            <p className={clsx(styles.policyText, "mt-30")}>
              By entering your number, you are agreeing to our Terms of service
              and Privacy Policy. Thanks!
            </p>
            <Button onClick={onSubmit} disabled={nextDisabled}>
              Next
              <img
                height={12}
                className="d-ib ml-10"
                src="/static/arrow.png"
                alt="arrow"
              />
            </Button>
          </WhiteBlock>{" "}
        </>
      ) : (
        <div className="text-center">
          <div className="loader"></div>
          <h3 className="mt-5">Activation in progress ...</h3>
        </div>
      )}
    </div>
  );
};
