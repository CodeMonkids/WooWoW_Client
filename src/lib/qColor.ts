import { Quality } from '@/model/type';

export default function qColor(quality: Quality | undefined) {
  const formatQuality = {
    [Quality.COMMON]: 'white',
    [Quality.UNIQUE]: '#00ff00',
    [Quality.RARE]: '#0070dd',
    [Quality.EPIC]: '#9535e1',
    [Quality.DEFAULT]: 'gray',
  };
  if (quality === undefined) return formatQuality[Quality.DEFAULT];
  return formatQuality[quality] || formatQuality[Quality.DEFAULT];
}
