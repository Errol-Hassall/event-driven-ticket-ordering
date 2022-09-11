import CheckBox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSeats, Seat } from "./getSeats.server";

type LoaderData = {
  seats: Awaited<ReturnType<typeof getSeats>>;
};

export const loader = async () => {
  return json<LoaderData>({
    seats: await getSeats(),
  });
};

export default function BuyTickets() {
  const { seats } = useLoaderData<LoaderData>();
  console.log(seats);

  const renderSeats = () => {
    return seats.map((seat: Seat, index: number) => {
      return (
        <div key={index.toString()}>
          <Typography variant="button">{seat.seatNumber}</Typography>
          <CheckBox
            value={seat.seatNumber}
            disabled={!seat.availability}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              // handleChange(event, seat)
              console.log(event)
            }
          />
        </div>
      );
    });
  };

  return (
    <main>
      <h1>Buy Tickets</h1>
      <div>{renderSeats()}</div>
    </main>
  );
}
