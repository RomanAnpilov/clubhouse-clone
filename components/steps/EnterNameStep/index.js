import clsx from "clsx";

import { Button } from "../../Button";
import { WhiteBlock } from "../../WhiteBlock";
import { StepInfo } from "../../StepInfo";

import styles from "./EnterNameStep.module.scss";

export const EnterNameStep = () => {
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
