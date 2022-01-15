import { Button } from "../../Button";
import { WhiteBlock } from "../../WhiteBlock";

import styles from "./WelcomeStep.module.scss";

export const WelcomeStep = () => {
  return (
    <WhiteBlock className={styles.block}>
      <h3 className={styles.title}>
        <img
          className={styles.handWaveImg}
          src="/static/hand-wave.svg"
          alt="Celebration!"
        />{" "}
        Welcome to Clubhouse!
      </h3>
      <p>
        We're working hard to get Clubhouse ready for everyone! While we wrap up
        the finishing youches, we're adding people gradually to make sure
        nothing breaks :)
      </p>
      <div>
        <Button>
            Get your username
          <img height={12} className='d-ib ml-10' src="/static/arrow.png"/>
        </Button>
      </div>
      <div className="link mt-15 cup d-ib">Have an invite text? Sign in</div>
    </WhiteBlock>
  );
};
