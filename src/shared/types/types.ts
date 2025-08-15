export const placeTypes = ['MEETING_ROOM', 'WORKSPACE'] as const;

type PlaceType = (typeof placeTypes)[number];

type Place = {
  id: string;
  x: number;
  y: number;
  placeType: PlaceType;
};

export type { Place, PlaceType };
