import { styled } from 'styled-components';

import Item from '@/model/Item';

interface ItemDiscriptionProps {
  item: Item;
}

function qColor(quality: string | undefined) {
  switch (quality) {
    case '일반':
      return 'white';
    case '고급':
      return '#00ff00';
    case '희귀':
      return '#0070dd';
    case '영웅':
      return '#9535e1';
    default:
      return 'gray';
  }
}

interface ContainerProps {
  quality: `일반` | `고급` | `희귀` | `영웅` | undefined;
}

const ItemName = styled.span<ContainerProps>`
  color: ${(props) => qColor(props.quality)};
  font-size: small;
  @media (max-width: 400px) {
    font-size: 11px;
  }
`;

const Dioscription = styled.p`
  margin: 0;
  font-size: smaller;
  @media (max-width: 400px) {
    font-size: 8px;
  }
`;

export default function ItemDiscription({ item }: ItemDiscriptionProps) {
  return (
    <>
      <ItemName quality={item.quality.name} className="flex">
        {item?.name}
      </ItemName>
      <span className="text-white">
        <Dioscription>{item.binding?.name}</Dioscription>

        <div className="flex justify-between">
          <Dioscription>{item.inventory_type?.name}</Dioscription>
          <Dioscription className="mr-[20px]">
            {item.item_subclass?.name}
          </Dioscription>
        </div>

        <Dioscription>{item.armor?.display.display_string}</Dioscription>

        {item.stats?.map((stat, idx) => (
          <Dioscription key={idx}>{stat.display.display_string}</Dioscription>
        ))}

        {item.durability && (
          <Dioscription>{item.durability.display_string}</Dioscription>
        )}

        {item.weapon && (
          <>
            <div className="flex justify-between">
              <Dioscription>{item.weapon.damage.display_string}</Dioscription>
              <Dioscription>
                {item.weapon.attack_speed.display_string}
              </Dioscription>
            </div>
            <Dioscription>{item.weapon.dps.display_string}</Dioscription>
          </>
        )}

        {item.requirements && (
          <Dioscription>{item.requirements.level?.display_string}</Dioscription>
        )}

        {item.requirements && (
          <Dioscription>
            {`아이템레벨 ${
              Number(
                item.requirements.level?.display_string.split(' ')[
                  item.requirements.level.display_string.split(' ').length - 1
                ],
              ) + 5
            }`}
          </Dioscription>
        )}

        {item.spells?.map((spell, idx) => {
          return (
            <Dioscription className="text-green-500" key={idx}>
              {spell.description}
            </Dioscription>
          );
        })}
      </span>
    </>
  );
}
