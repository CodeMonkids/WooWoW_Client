import axios from 'axios';
import Link from 'next/link';
import { ReactNode, useEffect, useRef, useState } from 'react';

import Item from '@/model/Item';
import Statistics from '@/model/Statistics';
import { StatList } from '@/model/type';
import WoWCharacterProfile from '@/model/WoWCharacterProfile ';

import IconComponent from './ItemComponent';
import Loading from './Loading';
import Spacing from './styledComponents';

interface Props {
  characterData: WoWCharacterProfile;
  closeFunction: () => void;
}

const leftParts = ['머리', '목', '어깨', '등', '가슴', '속옷', '겉옷', '손목'];
const rightParts = ['손', '허리', '다리', '발', '반지 1', '반지 2', '장신구 1'];
const bottomParts = ['주장비', '보조장비', '원거리 장비'];

function ItemList({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div id={id} className="flex flex-col p-[5px]">
      {children}
    </div>
  );
}

export default function Modal({ characterData, closeFunction }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [characterDataInfo, setCharacterDataInfo] =
    useState<WoWCharacterProfile | null>(null);
  const [stasticData, setStasticData] = useState<Statistics | null>(null);
  const [parts, setParts] = useState<{ [key: string]: Item }>({});

  const statList: StatList = {
    left: [
      {
        name: '힘',
        effective: stasticData?.strength.effective,
      },
      {
        name: '민첩성',
        effective: stasticData?.agility.effective,
      },
      {
        name: '체력',
        effective: stasticData?.stamina.effective,
      },
      {
        name: '지능',
        effective: stasticData?.intellect.effective,
      },
      {
        name: '정신력',
        effective: stasticData?.spirit.effective,
      },
      {
        name: '방어도',
        effective: stasticData?.armor.effective,
      },
    ],
    right: [
      { name: '전투력', effective: stasticData?.attack_power },
      {
        name: '공격력',
        effective: `${Math.round(
          stasticData?.main_hand_damage_min ?? 0,
        )}-${Math.round(stasticData?.main_hand_damage_max ?? 0)}`,
      },
      {
        name: '초당공격력',
        effective: Math.round(stasticData?.main_hand_dps ?? 0),
      },
      {
        name: '최대체력',
        effective: Math.round(stasticData?.health ?? 0),
      },
      {
        name: '최대마나',
        effective: Math.round(stasticData?.power ?? 0),
      },
      {
        name: '데미지감소',
        effective: `${Math.round(
          ((stasticData?.armor.effective ?? 0) /
            ((stasticData?.armor.effective ?? 0) +
              85 * characterData.level +
              400)) *
            100,
        )}%`,
      },
    ],
  };

  async function getCharacterData(characterName: string) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/characterinfo`,
        {
          params: { charactername: characterName },
        },
      );
      setCharacterDataInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    modalRef.current?.close();
    modalRef.current?.showModal();
  }, []);

  useEffect(() => {
    getCharacterData(characterData.name);
  }, [characterData.name]);

  useEffect(() => {
    if (characterDataInfo) {
      const { items } = characterDataInfo.equipment;
      items.forEach((item: Item) => {
        setParts((state) => {
          return { ...state, [item.slot.name]: item };
        });
      });
      setStasticData(characterDataInfo.statistics.data);
    }
  }, [characterDataInfo]);
  return (
    <div>
      <dialog
        id="modal"
        ref={modalRef}
        className="modal rounded-md overflow-visible max-sm:w-[90vw] "
      >
        <div
          id="container"
          className="modal-content w-[470px] h-auto flex flex-col bg-stone-900 rounded-lg max-sm:w-[100%]"
        >
          <div
            id="header"
            className="flex bg-stone-700 justify-between rounded-tr-lg rounded-tl-lg"
          >
            <p
              id="캐릭터이름"
              className=" relative left-[135px] text-white text-[23px] w-[200px] justify-center flex max-sm:left-[20vw]"
            >
              {characterData?.name}
            </p>
            <button
              type="button"
              id="닫기버튼"
              onClick={closeFunction}
              className="w-[50px] h-[35px] bg-red-800 justify-center items-center justify-self-end flex text-amber-300 cursor-pointer rounded-tr-lg"
            >
              X
            </button>
          </div>
          <div
            id="서브타이틀"
            className="flex flex-col justify-center w-[100%]"
          >
            <p className=" flex justify-center text-xs text-amber-300 ">
              레벨{characterData?.level} {characterData?.race.name}{' '}
              {characterData?.character_class.name}
            </p>
          </div>
          {!characterDataInfo && <Loading />}
          {characterDataInfo && (
            <div id="메인배열" className="flex ">
              <ItemList id="왼쪽아이템창">
                {leftParts.map((name) => {
                  const slot = parts[name];
                  return (
                    <div key={name}>
                      <IconComponent item={slot} dir="right" />
                      <Spacing height={5} />
                    </div>
                  );
                })}
              </ItemList>
              <div
                id="캐릭터렌더,스텟"
                className=" w-[100%] h-[500px] mt-[10px]"
              >
                <div
                  id="캐릭터렌더링"
                  className="w-[100%] h-[51%] bg-neutral-900 ring-gray-500 ring-[2px] rounded-lg flex justify-end"
                >
                  <p className="text-gray-50 absolute left-[100px] text-2xl top-[160px] max-sm:w-[100%] max-sm:left-[100px] max-sm:text-xs">
                    WOOWOW_0.2.2
                  </p>

                  <div className="flex flex-col">
                    <div className="w-[30px] h-[30px] rounded-sm bg-gray-400 m-[3px] ring-[2px] ring-gray-500">
                      <p className="text-white">
                        {stasticData?.holy_resistance.effective}
                      </p>
                    </div>

                    <div className="w-[30px] h-[30px] rounded-sm bg-red-800 m-[3px] ring-[2px] ring-gray-500">
                      <p className="text-white">
                        {' '}
                        {stasticData?.fire_resistance.effective}
                      </p>
                    </div>
                    <div className="w-[30px] h-[30px] rounded-sm bg-green-800 m-[3px] ring-[2px] ring-gray-500">
                      <p className="text-white">
                        {stasticData?.nature_resistance.effective}
                      </p>{' '}
                    </div>
                    <div className="w-[30px] h-[30px] rounded-sm bg-blue-800 m-[3px] ring-[2px] ring-gray-500">
                      <p className="text-white">
                        {stasticData?.arcane_resistance.effective}
                      </p>{' '}
                    </div>
                    <div className="w-[30px] h-[30px] rounded-sm bg-purple-800 m-[3px] ring-[2px] ring-gray-500">
                      <p className="text-white">
                        {stasticData?.shadow_resistance.effective}
                      </p>{' '}
                    </div>
                  </div>
                </div>
                <div
                  id="캐릭터스텟"
                  className="w-[100%] h-[auto] mt-[10px]  rounded-lg outline-gray-500 flex justify-evenly"
                >
                  <div
                    id="캐릭터 코어스텟"
                    className="w-[40%] h-[auto] bg-stone-950 flex flex-col justify-start ring-zinc-400 ring-2 rounded-lg p-[2px] mr-1"
                  >
                    {statList.left.map((stat) => {
                      return (
                        <div key={stat.name}>
                          <div className="flex justify-between m-[0]">
                            <p className="text-sm text-yellow-500 max-sm:text-xs">
                              {stat.name}
                            </p>
                            <p className="text-sm text-[#00ff00] max-sm:text-xs">
                              {stat.effective}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div
                    id="캐릭터 코어스텟"
                    className="w-[50%] h-[auto] bg-stone-950 flex flex-col justify-start ring-zinc-400 ring-2 rounded-lg p-[2px]"
                  >
                    {statList.right.map((stat) => {
                      return (
                        <div key={stat.name}>
                          <div className="flex justify-between m-[0]">
                            <p className="text-sm text-yellow-500 max-sm:text-xs">
                              {stat.name}{' '}
                            </p>
                            <p className="text-sm text-[#00ff00] max-sm:text-xs">
                              {stat.effective}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Spacing height={5} />
                <div id="하단아이템배열" className="flex justify-center">
                  {bottomParts.map((name) => {
                    const slot = parts[name];
                    return (
                      <div key={name}>
                        <Spacing width={3} />
                        <IconComponent item={slot} dir="left" />
                        <Spacing width={3} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <ItemList id="오른쪽아이템배열">
                {rightParts.map((name) => {
                  const slot = parts[name];
                  return (
                    <div key={name}>
                      <IconComponent item={slot} dir="left" />
                      <Spacing height={5} />
                    </div>
                  );
                })}
              </ItemList>

              <Link
                href="/moreinfo"
                className="p-[10px] bg-slate-300 absolute translate-x-[340px] max-sm:translate-x-[110px] max-sm:translate-y-[470px] translate-y-[48vh] text-[00ff00] rounded-md "
              >
                자세히보기
              </Link>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
