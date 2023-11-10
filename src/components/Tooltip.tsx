import { ReactElement } from 'react';
import { styled } from 'styled-components';

import qColor from '@/lib/qColor';
import { Dir, Quality } from '@/model/type';

interface TooltipProps {
  ChildComponent: ReactElement;
  dir: Dir;
  quality: Quality | undefined;
}

interface QualityProps {
  quality: Quality | undefined;
}

interface ITooltipContainer extends QualityProps {
  dir: Dir;
}

const TooltipContainer = styled.div<ITooltipContainer>`
  display: flex;
  position: relative;
  width: 300px;
  height: auto;
  background-color: #080d21;
  left: 60px;
  outline: 2px solid ${(props) => qColor(props.quality)};
  border-radius: 5px;
  flex-flow: column;
  padding: 5px;
  z-index: 100;
  @media (max-width: 768px) {
    width: 150px;
    left: ${(props) => (props.dir === Dir.LEFT ? '-160px' : '60px')};
  }
`;

export default function Tooltip({
  ChildComponent,
  dir,
  quality,
}: TooltipProps) {
  return (
    <TooltipContainer dir={dir} className="max-sm:w-[150px]" quality={quality}>
      {ChildComponent}
    </TooltipContainer>
  );
}
