import clsx from "clsx";
import React from "react";

import { Button } from "../../Button";
import { WhiteBlock } from "../../WhiteBlock";
import { StepInfo } from "../../StepInfo";

import styles from "./EnterCodeStep.module.scss";

export const EnterCodeStep = () => {
    const [codes, setCodes] = React.useState([]);

    const nextDisabled = codes.some((v) = !v) || codes.length <4;

    const handleChangeInput = () => {
        const id = Number(e.target.getAttribute("id")) - 1;
        const value = e.target.value;
        setCodes((prev) => {
            const newArr = [...prev];
            newArr[id] = value;
            return newArr;
        })
        if (e.target.nextSibling) {
            e.target.nextSibling.focus();
        }
    }

    return (
      <div className={styles.block}>
        {/* <StepInfo
          icon="/static/man.png"
          title="What is your full name?"
          description="People use real names on Clubhouse"
        /> */}
        <WhiteBlock className={clsx("m-auto", styles.whiteBlock)}>
          <div className="mb-30">
            <input className="field" placeholder="Enter fullname" />
          </div>
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