<script>
  let buyTicketsResponse = false;

  let tickets = [
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

  let selectedTickets = [];

  const handleChange = (event, ticket) => {
    if (event.target.checked) {
      selectedTickets.push(ticket);
    } else {
      selectedTickets.pop(ticket);
    }
  };

  const buyTickets = async () => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    const result = await fetch(apiUrl + "/order-tickets", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tickets: { seats: selectedTickets },
        email: "errol.hassall99@gmail.com",
      }),
    });

    const details = await result.text();

    if (details === "published") {
      buyTicketsResponse = true;
    } else {
      throw new Error();
    }
  };
</script>

<div class="buy-tickets">
  <ul>
    {#each tickets as ticket}
      <div class="input-container">
        <input
          type="checkbox"
          on:input={(event) => handleChange(event, ticket)}
          value={ticket.seatNumber}
          name={ticket.seatNumber}
          id={ticket.seatId}
        />
        <label for={ticket.seatId}>{ticket.seatNumber}</label>
      </div>
    {/each}
  </ul>

  <button class="buy" on:click={() => buyTickets()}>Buy</button>

  <div class:hidden={!buyTicketsResponse}>
    <p>Success</p>
  </div>
</div>

<style>
  .hidden {
    content-visibility: hidden;
  }
</style>
