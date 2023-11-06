'use client';

import Item from '@/model/Item';
import { styled } from 'styled-components';
import React, { useRef, useState } from 'react';

import Tooltip from './Tooltip';
import ItemDiscription from './ItemDiscriptcion';

interface ItemComponentProps {
  item: Item | undefined;
  dir: 'right' | 'left' | 'top' | 'bottom';
}

interface Quality {
  quality: `일반` | `고급` | `희귀` | `영웅` | undefined;
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

const Container = styled.div<Quality>`
  width: 50px;
  height: 50px;
  background-color: #282828;
  outline: 2px solid ${(props) => qColor(props.quality)};
  border-radius: 9px;
`;

export default function IconComponent({ item, dir }: ItemComponentProps) {
  const [isMouseEnter, setMouseEnter] = useState<boolean>();
  const containerRef = useRef<any>();

  function ContainerMouseenter() {
    setMouseEnter(true);
  }

  function ContainerMouseLeave() {
    setMouseEnter(false);
  }

  return (
    <div>
      <Container
        ref={containerRef}
        quality={item?.quality.name}
        onMouseEnter={() => {
          ContainerMouseenter();
        }}
        onMouseLeave={() => {
          ContainerMouseLeave();
        }}
      >
        {item && (
          <img src={item.media.url} alt="" className="w-[100%] h-[100%]" />
        )}
        {isMouseEnter && item && (
          <Tooltip
            dir={dir}
            quality={item.quality.name}
            ChildComponent={<ItemDiscription item={item} />}
          />
        )}
      </Container>
    </div>
  );
}
