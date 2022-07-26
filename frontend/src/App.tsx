import Typography from "@mui/material/Typography";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import "./App.css";
import BuyTicketsButton from "./components/BuyTicketButton";
import SeatSelect, { Seats } from "./components/SeatSelect";

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
