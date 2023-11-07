'use client';

import Image from 'next/image';

import ProfileArea from '@/components/ProfileArea';

import GameInfos from '../components/GameInfos';
import wowHardcoreLogo from '../img/WOW_Classic_Hardcore_Logo_enUS.png';

export default function Home(): JSX.Element {
  console.log('env:', process.env.NEXT_PUBLIC_SERVER_URL);
  return (
    <main className="min-w-full flex flex-col items-center justify-center">
      <div className="flex w-[100vw]">
        <GameInfos />
      </div>
      <Image src={wowHardcoreLogo} alt="" />
      <ProfileArea />
    </main>
  );
}
