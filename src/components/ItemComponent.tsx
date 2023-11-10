'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

import qColor from '@/lib/qColor';
import Item from '@/model/Item';
import { Dir } from '@/model/type';

import ItemDescription from './ItemDescriptcion';
import Tooltip from './Tooltip';

interface Props {
  item: Item | undefined;
  dir: Dir;
}

export default function IconComponent({ item, dir }: Props) {
  const [isMouseEnter, setMouseEnter] = useState<boolean>();
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseEnter = () => setMouseEnter(true);
  const onMouseLeave = () => setMouseEnter(false);

  return (
    <div>
      <div
        className="relative w-[50px] h-[50px] bg-[#282828] rounded-lg"
        style={{ outline: `2px ${qColor(item?.quality.name)} solid` }}
        ref={containerRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {item?.media.url && (
          <Image
            src={item.media.url}
            className="rounded-lg"
            alt="item-image"
            fill
            sizes="100%"
          />
        )}
        {isMouseEnter && item && (
          <Tooltip
            dir={dir}
            quality={item.quality.name}
            ChildComponent={<ItemDescription item={item} />}
          />
        )}
      </div>
    </div>
  );
}
