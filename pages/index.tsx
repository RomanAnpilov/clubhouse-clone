import Head from 'next/head'
import Image from 'next/image'
import React from "react";

import {WelcomeStep} from "../components/steps/WelcomeStep"
import {EnterNameStep} from '../components/steps/EnterNameStep'
import {TwitterStep} from "../components/steps/TwitterStep"
import {ChooseAvatarStep} from "../components/steps/ChooseAvatarStep"
import { EnterPhoneStep } from '../components/steps/EnterPhoneStep'


const StepsComponent = {
  0: WelcomeStep,
  1: EnterNameStep,
  2: TwitterStep,
  3: ChooseAvatarStep,
}

export default function Home() {
  const [step, setStep] = React.useState<number>(3);

  const Step = StepsComponent[step];

  return (
    <div >
      <Step />
    </div>
  )
}
