import "./App.css";
import Typography from "@mui/material/Typography";
import BuyTicketsButton from "./components/BuyTicketButton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SeatSelect, { Seat, Seats } from "./components/SeatSelect";
import { useState, useCallback } from "react";

const queryClient = new QueryClient();

function App() {
  const [selectedSeats, setSelectedSeats] = useState<Seats>([]);

  const setSeatSelection = useCallback(
    (seats: Seats) => {
      setSelectedSeats(seats);
    },
    [setSelectedSeats]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <Typography variant="h2" gutterBottom>
            Buy tickets now
          </Typography>
          <SeatSelect
            setSelectedSeats={setSeatSelection}
            selectedSeats={selectedSeats}
          />
          <BuyTicketsButton tickets={selectedSeats} />
        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
