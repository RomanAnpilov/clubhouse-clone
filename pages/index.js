import Head from 'next/head'
import Image from 'next/image'
import {WelcomeStep} from "../components/steps/WelcomeStep"
import {TwitterStep} from "../components/steps/TwitterStep"
import { EnterPhoneStep } from '../components/steps/EnterPhoneStep'
import {EnterNameStep} from '../components/steps/EnterNameStep'

export default function Home() {
  return (
    <div >
      <EnterNameStep />
    </div>
  )
}
