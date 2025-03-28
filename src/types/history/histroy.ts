//차량 구분
export const CarType = {
  ALL: "전체",
  REGULAR: "정기차량", // 정기차량
  RESERVED: "예약차량", // 예약차량
  VISIT: "방문차량",
} as const;

export type CarUnionType = (typeof CarType)[keyof typeof CarType];

//차량 상태
export const ParkingState = {
  ALL: "전체",
  IN: "입차",
  OUT: "출차",
} as const;

export type ParkingStateUnionType =
  (typeof ParkingState)[keyof typeof ParkingState];

//보기 수
export const ViewSize = {
  10: 10,
  20: 20,
  50: 50,
  100: 100,
} as const;

export type ViewSizeUnionType = (typeof ViewSize)[keyof typeof ViewSize];

export const PageActionState = {
  FirstPage: "First",
  PrevPage: "Prev",
  NextPage: "Next",
  LastPage: "Last",
};

export type PageActionUnionType =
  (typeof PageActionState)[keyof typeof PageActionState];
