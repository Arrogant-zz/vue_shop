import colors from '@/data/colors';

export default function getColorsByIds(colorIds) {
  return colors.filter((color) => colorIds.includes(color.id));
}
