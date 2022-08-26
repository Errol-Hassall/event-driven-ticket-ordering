import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPlaceOrderForTickets } from "../api/postPlaceOrderForTickets";
import { Seat, Seats } from "./SeatSelect";

export type ButtonProps = {
  tickets: Seats;
};

const BuyTicketsButton = (props: ButtonProps) => {
  const seatsToBook = props.tickets.map((ticket: Seat) => {
    return ticket.seatNumber;
  });
  const queryClient = useQueryClient();

  const placeOrderForTickets = useMutation(postPlaceOrderForTickets, {
    onSuccess: () => {
      queryClient.invalidateQueries(["order-tickets"]);
    },
  });

  return (
    <Button
      variant="text"
      onClick={() => placeOrderForTickets.mutate({ seats: seatsToBook })}
    >
      Buy Tickets
    </Button>
  );
};

export default BuyTicketsButton;
