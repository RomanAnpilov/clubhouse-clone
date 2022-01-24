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
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setFieldValue: (field: keyof UserData, value: string) => void;
  step: number;
  userData: UserData;
};

export type UserData = {
  id: string;
  fullname: string;
  avatarUrl: string;
  isActive: number;
  username: string;
  phone: string;
  token?: string;
};

export const MainContext = React.createContext<MainContextProps>(
  {} as MainContextProps
);

const getUserData = (): UserData | null => {
  try {
    return JSON.parse(window.localStorage.getItem("userData"));
  } catch (error) {
    return null;
  }
};

const getFormStep = (): number => {
  const json = getUserData();
  if (json) {
    if (json.phone) {
      return 5;
    } else {
      return 4;
    }
  }
  return 0;
};

export default function Home() {
  const [step, setStep] = React.useState<number>(0);
  const [userData, setUserData] = React.useState<UserData>();

  const Step = StepsComponent[step];

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const setFieldValue = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const json = getUserData();
      if (json) {
        setUserData(json);
        setStep(getFormStep());
      }
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(
      "userData",
      userData ? JSON.stringify(userData) : ""
    );
  }, [userData]);

  return (
    <MainContext.Provider
      value={{ step, onNextStep, userData, setUserData, setFieldValue }}
    >
      <Step />
    </MainContext.Provider>
  );
}
