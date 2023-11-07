import WoWCharacterProfile from '@/model/WoWCharacterProfile ';

import Profile from './Profile';

interface LevelStepProps {
  characterDatas: WoWCharacterProfile[];
}

export default function LevelStep({ characterDatas }: LevelStepProps) {
  return (
    <div className="outline-1 border-black-100 border-solid flex">
      {characterDatas.map((characterData: WoWCharacterProfile, idx) => (
        <Profile characterData={characterData} key={idx} />
      ))}
    </div>
  );
}
