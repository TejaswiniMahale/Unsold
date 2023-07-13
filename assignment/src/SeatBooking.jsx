import React, { useState } from 'react'

const SeatBooking = () => {
    const numSeatsPerRow = [7, 7, 7, 7, 7, 7, 7, 3]; 
  const [coach, setCoach] = useState(
    numSeatsPerRow.map(() => Array(7).fill('O'))
  );

  const displayCoach = () => {
    return (
      <div>
        <h3>Coach Layout:</h3>
        {coach.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((seat, seatIndex) => (
              <span
                key={seatIndex}
                style={{
                  display: 'inline-block',
                  width: '30px',
                  height: '30px',
                  margin: '2px',
                  backgroundColor: seat === 'O' ? 'green' : 'red',
                }}
              >
                {`${rowIndex + 1}${String.fromCharCode(65 + seatIndex)}`}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const reserveSeats = (numSeats) => {
    let reservedSeats = [];

    for (let i = 0; i < coach.length; i++) {
      const row = coach[i];
      const availableSeats = row.join('').split('X');
      const consecutiveSeats = availableSeats.filter((group) => group.length >= numSeats);

      if (consecutiveSeats.length > 0) {
        const selectedSeats = consecutiveSeats[0].slice(0, numSeats);
        reservedSeats = [...reservedSeats, ...selectedSeats.split('').map((seat, index) => `${i + 1}${String.fromCharCode(65 + row.indexOf(seat) + index)}`)];
        break;
      }
    }

    if (reservedSeats.length > 0) {
      const updatedCoach = [...coach];
      reservedSeats.forEach((seat) => {
        const rowIndex = parseInt(seat.charAt(0)) - 1;
        const seatIndex = seat.charCodeAt(1) - 65;
        updatedCoach[rowIndex][seatIndex] = 'X';
      });
      setCoach(updatedCoach);
      console.log(`Successfully reserved ${numSeats} seat(s).`);
      console.log('Reserved seats:', reservedSeats);
    } else {
      console.log(`No available seats for ${numSeats}.`);
    }
  };

  const handleReservation = (e) => {
    e.preventDefault();
    const numSeats = parseInt(e.target.numSeats.value);
    reserveSeats(numSeats);
  };

  return (
    <div>
      <h2>Welcome to the Seat Reservation System!</h2>
      {displayCoach()}
      <form onSubmit={handleReservation}>
        <label htmlFor="numSeats">Enter the number of seats to reserve:</label>
        <input type="number" id="numSeats" name="numSeats" min="1" max="7" required />
        <button type="submit">Reserve Seats</button>
      </form>
    </div>
  );
}

export default SeatBooking