'use client';

import Image from 'next/image';
import { useState } from 'react';
import { styled } from 'styled-components';

import { CharacterClass } from '@/model/type';
import WoWCharacterProfile from '@/model/WoWCharacterProfile ';

import tomb from '../img/coffin.png';
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

interface ContainerProps {
  isghost: 'true' | 'false';
}

const Container = styled.div<ContainerProps>`
  cursor: pointer;
  display: flex;
  flex-flow: column;
  align-items: center;
  outline: black solid 1px;
  width: 100px;
  height: auto;
  margin: 10px;
  background-color: ${(props) => (props.isghost === 'true' ? `gray` : 'white')};
  border-radius: 10px;
  box-shadow: 0 0 10px 0 #575757;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: auto;
  height: auto;
  margin: 0;
`;

const PlayerName = styled.span`
  font-size: 14px;
`;

const Info = styled.div`
  display: flex;
  justify-content: start;
  outline: 1px black solid;
  width: 100%;
  border-radius: 0 0 10px 10px;
`;

export interface CharacterProps {
  characterData: WoWCharacterProfile;
}

function Profile({ characterData }: CharacterProps) {
  //
  const [isModal, setIsModal] = useState<boolean>(false);

  function getClassIcon(className: string) {
    const formatClassIcon: { [key: string]: string } = {
      [CharacterClass.BANDIT]: BANDIT_ICON,
      [CharacterClass.WIZARD]: WIZARD_ICON,
      [CharacterClass.PALADIN]: PALADIN_ICON,
      [CharacterClass.PRIEST]: PRIEST_ICON,
      [CharacterClass.DARK_WIZARD]: DARK_WIZARD_ICON,
      [CharacterClass.HUNTER]: HUNTER_ICON,
      [CharacterClass.DRUID]: DRUID_ICON,
      [CharacterClass.WARRIOR]: WARRIOR_ICON,
      default:
        'https://i.namu.wiki/i/8Uvmcr2FAPyGoA_61zzO5VaAntOi_Rz2lUB1QU3xjq3bplgWOVNYXSKWgHba1eZz2WyXng3wIESlK1gE0qMjlA.webp',
    };
    return formatClassIcon[className] || formatClassIcon.default;
  }

  function onClickContainer() {
    setIsModal(true);
  }
  function onCloseModal() {
    setIsModal(false);
  }

  return (
    <div>
      <Container
        onClick={() => {
          onClickContainer();
        }}
        isghost={characterData.is_ghost.toString() as 'true' | 'false'}
      >
        <ProfileContainer>
          <Image
            className="h-[100px] rounded-tl-[10px] rounded-tr-[10px]"
            src={wak}
            width={100}
            height={100}
            alt=""
          />
          {characterData.is_ghost && (
            <Image className="h-[100px] w-[100px] absolute" src={tomb} alt="" />
          )}

          <PlayerName className="text-black">{characterData.name}</PlayerName>
        </ProfileContainer>
        <Info>
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
        </Info>
      </Container>
      {isModal && (
        <Modal closeFunction={onCloseModal} characterData={characterData} />
      )}
    </div>
  );
}

export default Profile;
