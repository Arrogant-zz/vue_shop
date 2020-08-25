import colors from '@/data/colors';

export default function getColorsByIds(colorIds) {
  console.log('getColorsByIds');
  return colors.filter((color) => colorIds.includes(color.id));
}
