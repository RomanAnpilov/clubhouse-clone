/* eslint-disable @next/next/no-img-element */
import React from "react";
import clsx from "clsx";
import NumberFormat from "react-number-format";

import { Button } from "../../Button";
import { WhiteBlock } from "../../WhiteBlock";
import { StepInfo } from "../../StepInfo";
import { MainContext } from "../../../pages";

import styles from "./EnterPhoneStep.module.scss";


type InputValueState = {
  formattedValue: string;
  value: string;
}

export const EnterPhoneStep: React.FC  = () => {
  const {onNextStep} = React.useContext(MainContext)

  const [values, setValues] = React.useState<InputValueState>({} as InputValueState);

  const nextDisabled =
    !values.formattedValue || values.formattedValue.includes("_");

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/phone.png"
        title="Enter your phone #"
        description="We will send you a confirmation code"
      />
      <WhiteBlock className={clsx("m-auto mt-30", styles.whiteBlock)}>
        <div className={clsx("mb-30", styles.input)}>
          
          <NumberFormat
            className="field"
            format="+# (###) ###-##-##"
            mask="_"
            placeholder="+7 (999) 123-45-67"
            value={values.value}
            onValueChange={({formattedValue, value}) => setValues({formattedValue, value})}
          />
        </div>
        <Button disabled={nextDisabled} onClick={onNextStep}>
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
