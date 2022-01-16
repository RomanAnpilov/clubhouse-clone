import clsx from "clsx";
import { Button } from "../../Button";
import { WhiteBlock } from "../../WhiteBlock";
import {StepInfo} from "../../StepInfo"

import styles from "./TwitterStep.module.scss";

export const TwitterStep = () => {
  return (
    <div className={styles.block}>
      {/* <StepInfo
        icon="/static/connect.png"
        title="Do you want import info from Twitter?"
      /> */}
      <WhiteBlock className={clsx("m-auto mt-40", styles.whiteBlock)}>
        <div className={styles.avatar}>
          <b>AD</b>
        </div>
        <h2 className="mb-40">Roman Anpilov</h2>
        <div>
          <Button>
            <img
              height={12}
              className="d-ib ml-10"
              src="/static/twitter-logo.png"
              alt="twitter"
            />
            Import from Twitter
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
