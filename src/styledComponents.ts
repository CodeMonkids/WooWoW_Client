import { styled } from 'styled-components';

interface SpacingProps {
  width?: number;
  height?: number;
}
const Spacing = styled.div<SpacingProps>`
  display: block;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
`;

export default Spacing;
