/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import React from "react";

import { Button } from "../../Button";
import { WhiteBlock } from "../../WhiteBlock";
import { StepInfo } from "../../StepInfo";
import { MainContext } from "../../../pages";

import styles from "./EnterNameStep.module.scss";


export const EnterNameStep: React.FC = () => {
  const {onNextStep, userData, setFieldValue} = React.useContext(MainContext)

  const [inputValue, setInputValue] = React.useState<string>(userData.fullname)

  const nextDisabled = !inputValue;

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onClickNextStep = () => {
    //TODO: заебенить сюда сохранение значений для бэка
    setFieldValue("fullname", inputValue)
    onNextStep();
  }

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/man.png"
        title="What is your full name?"
        description="People use real names on Clubhouse"
      />
      <WhiteBlock className={clsx("m-auto", styles.whiteBlock)}>
        <div className="mb-30">
          <input onChange={handleChangeInput} value={inputValue} className="field" placeholder="Enter fullname" />
        </div>
        <Button disabled={nextDisabled} onClick={onClickNextStep}>
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
