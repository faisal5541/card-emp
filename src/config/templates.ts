import { CardTemplate } from '../types';

export const TEMPLATES: CardTemplate[] = [
  {
    id: "national-day-01",
    title: "التصميم 1",
    image: "/templates/national-day-01.jpg",
    aspectRatio: 1441 / 2560,
    nameArea: {
      x: 50.0,
      y: 68.8,
      width: 48.0,
      height: 6.4,
      fontFamily: "Tajawal",
      fontSize: 56,
      minFontSize: 32,
      maxFontSize: 76,
      color: "#11392B",
      fontWeight: 700,
      textAlign: "center",
      verticalAlign: "middle",
      maxLines: 1
    }
  },
  {
    id: "national-day-02",
    title: "التصميم 2",
    image: "/templates/national-day-02.jpg",
    aspectRatio: 1440 / 2560,
    nameArea: {
      x: 50.0,
      y: 74.25,
      width: 48.0,
      height: 4.2,
      fontFamily: "Tajawal",
      fontSize: 52,
      minFontSize: 30,
      maxFontSize: 72,
      color: "#FFFFFF",
      fontWeight: 700,
      textAlign: "center",
      verticalAlign: "middle",
      maxLines: 1
    }
  },
  {
    id: "national-day-03",
    title: "التصميم 3",
    image: "/templates/national-day-03.jpg",
    aspectRatio: 1440 / 2560,
    nameArea: {
      x: 49.7,
      y: 72.1,
      width: 48.0,
      height: 5.5,
      fontFamily: "Tajawal",
      fontSize: 52,
      minFontSize: 30,
      maxFontSize: 72,
      color: "#FFFFFF",
      fontWeight: 700,
      textAlign: "center",
      verticalAlign: "middle",
      maxLines: 1
    }
  }
];

export const DEFAULT_TEMPLATE = TEMPLATES[0];

export function getTemplateById(id: string | null | undefined): CardTemplate {
  if (!id) return DEFAULT_TEMPLATE;
  const found = TEMPLATES.find(t => t.id === id);
  return found || DEFAULT_TEMPLATE;
}
