interface Props {
  width?: number;
  height?: number;
}

export default function Spacing({ width = 0, height = 0 }: Props) {
  const style = {
    display: 'block',
    width: `${width}px`,
    height: `${height}px`,
  };
  return <div style={style} />;
}
