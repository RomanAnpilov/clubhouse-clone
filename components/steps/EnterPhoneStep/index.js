/* eslint-disable @next/next/no-img-element */
import React from "react";
import clsx from "clsx";
import NumberFormat from "react-number-format";

import { Button } from "../../Button";
import { WhiteBlock } from "../../WhiteBlock";
import { StepInfo } from "../../StepInfo";

import styles from "./EnterPhoneStep.module.scss";

export const EnterPhoneStep = () => {
  const [inputValue, setInputValue] = React.useState({});

  const nextDisabled =
    !inputValue.formattedValue || inputValue.formattedValue.includes("_");

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/phone.png"
        title="Enter your phone #"
        description="We will send you a confirmation code"
      />
      <WhiteBlock className={clsx("m-auto mt-30", styles.whiteBlock)}>
        <div className={clsx("mb-30", styles.input)}>
          <img src="/static/russian-flag.png" alt="flag" width={24} />
          <NumberFormat
            className="field"
            format="+# (###) ###-##-##"
            mask="_"
            placeholder="+7 (999) 123-45-67"
            value={inputValue.value}
            onValueChange={(values) => setInputValue(values)}
          />
        </div>
        <Button disabled={nextDisabled}>
          Next
          <img
            height={12}
            className="d-ib ml-10"
            src="/static/arrow.png"
            alt="arrow"
          />
        </Button>
        <p className={clsx(styles.policyText, "mt-30")}>
          By entering your number, you are agreeing to our Terms of service and
          Privacy Policy. Thanks!
        </p>
      </WhiteBlock>
    </div>
  );
};
