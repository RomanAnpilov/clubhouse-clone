import Head from 'next/head'
import Image from 'next/image'
import {WelcomeStep} from "../components/steps/WelcomeStep"

export default function Home() {
  return (
    <div >
      <WelcomeStep />
    </div>
  )
}
