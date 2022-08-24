import CheckBox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

export type Seat = {
  seatId: string;
  seatNumber: string;
  availability: boolean;
};

export type Seats = Seat[];

const availableSeats: Seats = [
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

type Props = {
  setSelectedSeats: (seats: Seats) => void;
  selectedSeats: Seats;
};

export default function SeatSelect({ setSelectedSeats, selectedSeats }: Props) {
  const fetchedSeats = availableSeats;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    seat: Seat
  ) => {
    if (event.target.checked) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      const newSeats = selectedSeats.filter((s) => {
        return s.seatId !== seat.seatId;
      });

      setSelectedSeats(newSeats);
    }
  };

  const renderSeats = () => {
    return fetchedSeats.map((seat: Seat, index) => {
      return (
        <div key={index.toString()}>
          <Typography variant="button">{seat.seatNumber}</Typography>
          <CheckBox
            value={seat.seatNumber}
            disabled={!seat.availability}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(event, seat)
            }
          />
        </div>
      );
    });
  };

  return <div>{renderSeats()}</div>;
}
