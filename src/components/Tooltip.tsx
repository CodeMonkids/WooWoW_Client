import { ReactElement } from 'react';
import { styled } from 'styled-components';

interface TooltipProps {
  ChildComponent: ReactElement;
  dir: 'right' | 'left' | 'top' | 'bottom';
  quality: '일반' | '고급' | '희귀' | '영웅' | undefined;
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

interface QualityProps {
  quality: `일반` | `고급` | `희귀` | `영웅` | undefined;
}

interface ITooltipContainer extends QualityProps {
  dir: 'right' | 'left' | 'top' | 'bottom';
}

const TooltipContainer = styled.div<ITooltipContainer>`
  display: flex;
  position: relative;
  width: 300px;
  height: auto;
  background-color: #080d21;
  left: 60px;

  top: -120px;
  outline: 2px solid ${(props) => qColor(props.quality)};
  border-radius: 5px;
  flex-flow: column;
  padding: 5px;
  z-index: 100;
  @media (max-width: 768px) {
    width: 150px;
    left: ${(props) => (props.dir === 'left' ? '-160px' : '60px')};
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
