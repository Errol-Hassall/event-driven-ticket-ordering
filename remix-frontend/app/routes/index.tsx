import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="mx-auto mt-16 max-w-7xl text-center">
          <Link to="/buy-tickets" className="text-xl text-blue-600 underline">
            Buy Tickets
          </Link>
        </div>
      </header>
    </div>
  );
}
