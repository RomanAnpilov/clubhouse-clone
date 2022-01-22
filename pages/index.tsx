import Head from "next/head";
import Image from "next/image";
import React from "react";

import { WelcomeStep } from "../components/steps/WelcomeStep";
import { EnterNameStep } from "../components/steps/EnterNameStep";
import { GithubStep } from "../components/steps/GithubStep";
import { ChooseAvatarStep } from "../components/steps/ChooseAvatarStep";
import { EnterPhoneStep } from "../components/steps/EnterPhoneStep";
import { EnterCodeStep } from "../components/steps/EnterCodeStep";

const StepsComponent = {
  0: WelcomeStep,
  1: GithubStep,
  2: EnterNameStep,
  3: ChooseAvatarStep,
  4: EnterPhoneStep,
  5: EnterCodeStep,
};

type MainContextProps = {
  onNextStep: () => void;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
  setFieldValue: (field: keyof User, value: string) => void;
  step: number;
  userData: User;
};

type User = {
  id: string;
  fullname: string;
  avatarUrl: string;
  isActive: number;
  username: string;
  phone: string;
};

export const MainContext = React.createContext<MainContextProps>(
  {} as MainContextProps
);

export default function Home() {
  const [step, setStep] = React.useState<number>(3);
  const [userData, setUserData] = React.useState<User>();

  const Step = StepsComponent[step];

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const setFieldValue = (field: keyof User, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field] : value
    }))
  }

  console.log(userData)

  return (
    <MainContext.Provider value={{ step, onNextStep, userData, setUserData, setFieldValue }}>
      <Step />
    </MainContext.Provider>
  );
}
