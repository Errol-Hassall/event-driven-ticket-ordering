export type Seat = {
  seatId: string;
  seatNumber: string;
  availability: boolean;
};

export type Seats = Seat[];

export async function getSeats(): Promise<Array<Seat>> {
  return [
    {
      seatId: "1234",
      seatNumber: "A1",
      availability: true,
    },
    {
      seatId: "42532",
      seatNumber: "A2",
      availability: true,
    },
    {
      seatId: "4354235",
      seatNumber: "A3",
      availability: true,
    },
  ];
}
