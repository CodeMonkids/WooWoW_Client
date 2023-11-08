'use client';

import axios from 'axios';
import { FormEvent, useEffect, useRef, useState } from 'react';

import stringJson from '@/asset/json/strings.json';
import WoWCharacterProfile from '@/model/WoWCharacterProfile ';

import Spacing from '../styledComponents';
import LevelStep from './LevelStep.client';
import Loading from './Loading';

const defaultNames = [
  `줄건줘`,
  `지존아이네`,
  `드워프주르르`,
  `부가땅`,
  `뽀짝쿵야`,
];

export default function ProfileArea() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [characterData, setCharacterData] = useState<WoWCharacterProfile[]>([]);
  async function getCharacterData(name: string) {
    try {
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_SERVER_URL
        }/api/character?charactername=${encodeURIComponent(name)}`,
      );
      if (response.status === 501) {
        alert(`네트워크에러발생`);
        return;
      }
      const character = response.data;
      setCharacterData((data) => {
        const isReduplicate = data.findIndex((el) => el.id === character.id);
        if (isReduplicate < 0) return [...data, character];
        return data;
      });
    } catch (err) {
      alert(`${name} 캐릭터를 찾을 수 없습니다.`);
      console.error(err);
    }
  }

  useEffect(() => {
    defaultNames.map((name) => getCharacterData(name));
    console.log(stringJson.messiImageText);
  }, []);

  function sortLevel(characters: WoWCharacterProfile[]) {
    return characters.sort((a, b) => b.level - a.level);
  }

  function groupByConsecutiveNumbers(
    formatData: WoWCharacterProfile[],
  ): WoWCharacterProfile[][] {
    // 캐릭터 Level 별로 배열 나누기
    return formatData.reduce((acc, cur) => {
      const index = acc.findIndex((el) => el[0].level === cur.level);
      if (index < 0) acc.push([cur]);
      else acc[index].push(cur);
      return acc;
    }, [] as WoWCharacterProfile[][]);
  }

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputRef.current || inputRef.current.value === '') return;
    getCharacterData(inputRef.current.value);
  }

  return (
    <>
      <form onSubmit={submitForm} name="search-character">
        <input
          ref={inputRef}
          type="text"
          placeholder="캐릭터 이름을 검색하세요"
          className="p-[5px] rounded-md shadow-gray-900 shadow-md text-black"
        />
      </form>
      <Spacing height={20} />

      {!characterData && <Loading />}
      {characterData &&
        groupByConsecutiveNumbers(sortLevel(characterData)).map(
          (sameLevelcharcters: WoWCharacterProfile[]) => (
            <LevelStep
              characterDatas={sameLevelcharcters}
              key={sameLevelcharcters[0].level}
            />
          ),
        )}
    </>
  );
}
