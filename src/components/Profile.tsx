'use client';

import Image, { StaticImageData } from 'next/image';
import { ReactNode, useState } from 'react';

import { CharacterClass } from '@/model/type';
import WoWCharacterProfile from '@/model/WoWCharacterProfile ';

import Tomb_IMAGE from '../img/coffin.png';
import DRUID_ICON from '../img/druidIcon.webp';
import HUNTER_ICON from '../img/hunterIcon.webp';
import WARRIOR_ICON from '../img/knightIcon.webp';
import WIZARD_ICON from '../img/magicionIcon.webp';
import PALADIN_ICON from '../img/paladinIcon.webp';
import PRIEST_ICON from '../img/priestIcon.webp';
import BANDIT_ICON from '../img/thifeIcon.webp';
import wak from '../img/wak.jpg';
import DARK_WIZARD_ICON from '../img/warlockIcon.webp';
import Modal from './Modal';

interface FormatClassIcon {
  [key: string]: StaticImageData;
}

interface ContainerProps {
  children: ReactNode;
  isGhost: boolean;
  onClick: () => void;
}

function Container({ children, isGhost, onClick }: ContainerProps) {
  return (
    <div
      onClick={onClick}
      className={`w-[100px] h-auto flex flex-col items-center m-[10px] ${
        isGhost ? 'bg-gray-400' : 'bg-white'
      } rounded-xl shadow-[0_0_10px_0] shadow-gray-500 outline outline-black outline-1 cursor-pointer`}
    >
      {children}
    </div>
  );
}

export interface CharacterProps {
  characterData: WoWCharacterProfile;
}

function Profile({ characterData }: CharacterProps) {
  const [isModal, setIsModal] = useState<boolean>(false);

  function getClassIcon(className: string) {
    const formatClassIcon: FormatClassIcon = {
      [CharacterClass.BANDIT]: BANDIT_ICON,
      [CharacterClass.WIZARD]: WIZARD_ICON,
      [CharacterClass.PALADIN]: PALADIN_ICON,
      [CharacterClass.PRIEST]: PRIEST_ICON,
      [CharacterClass.DARK_WIZARD]: DARK_WIZARD_ICON,
      [CharacterClass.HUNTER]: HUNTER_ICON,
      [CharacterClass.DRUID]: DRUID_ICON,
      [CharacterClass.WARRIOR]: WARRIOR_ICON,
    };
    return formatClassIcon[className];
  }

  function onClickContainer() {
    setIsModal(true);
  }
  function onCloseModal() {
    setIsModal(false);
  }

  return (
    <div>
      <Container onClick={onClickContainer} isGhost={characterData.is_ghost}>
        <div className="w-auto h-auto flex flex-col items-center m-0 ">
          <Image
            className="h-[100px] rounded-tl-[10px] rounded-tr-[10px]"
            src={wak}
            width={100}
            height={100}
            alt=""
          />
          {characterData.is_ghost && (
            <Image
              className="h-[100px] w-[100px] absolute"
              src={Tomb_IMAGE}
              alt=""
            />
          )}

          <div className="text-black text-sm ">{characterData.name}</div>
        </div>
        <div className="w-full flex justify-start rounded-b-xl outline outline-black outline-1">
          <Image
            className="rounded-bl-[10px] "
            src={getClassIcon(characterData.character_class.name)}
            width={30}
            height={30}
            alt=""
          />
          <span className="pointer-events-none text-black h-[100%] max-sm:text-[23px]">
            {characterData.level}레벨
          </span>
        </div>
      </Container>
      {isModal && (
        <Modal closeFunction={onCloseModal} characterData={characterData} />
      )}
    </div>
  );
}

export default Profile;
