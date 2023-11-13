import { styled } from 'styled-components';

import qColor from '@/lib/qColor';
import Item from '@/model/Item';
import { Quality } from '@/model/type';

interface Props {
  item: Item;
}

interface ContainerProps {
  quality: Quality | undefined;
}

const ItemName = styled.span<ContainerProps>`
  color: ${(props) => qColor(props.quality)};
  font-size: small;
  @media (max-width: 400px) {
    font-size: 11px;
  }
`;

const Description = styled.p`
  margin: 0;
  font-size: smaller;
  @media (max-width: 400px) {
    font-size: 8px;
  }
`;

export default function ItemDescription({ item }: Props) {
  return (
    <>
      <ItemName quality={item.quality.name} className="flex">
        {item?.name}
      </ItemName>
      <span className="text-white">
        <Description>{item.binding?.name}</Description>

        <div className="flex justify-between">
          <Description>{item.inventory_type?.name}</Description>
          <Description className="mr-[20px]">
            {item.item_subclass?.name}
          </Description>
        </div>

        <Description>{item.armor?.display.display_string}</Description>

        {item.stats?.map((stat, idx) => (
          <Description key={idx}>{stat.display.display_string}</Description>
        ))}

        {item.durability && (
          <Description>{item.durability.display_string}</Description>
        )}

        {item.weapon && (
          <>
            <div className="flex justify-between">
              <Description>{item.weapon.damage.display_string}</Description>
              <Description>
                {item.weapon.attack_speed.display_string}
              </Description>
            </div>
            <Description>{item.weapon.dps.display_string}</Description>
          </>
        )}

        {item.requirements && (
          <Description>{item.requirements.level?.display_string}</Description>
        )}

        {item.requirements && (
          <Description>
            {`아이템레벨 ${
              Number(
                item.requirements.level?.display_string.split(' ')[
                  item.requirements.level.display_string.split(' ').length - 1
                ],
              ) + 5
            }`}
          </Description>
        )}

        {item.spells?.map((spell, idx) => {
          return (
            <Description className="text-green-500" key={idx}>
              {spell.description}
            </Description>
          );
        })}
      </span>
    </>
  );
}
