import * as React from "react";
import {useState} from 'react';


const Stake = () => {
  const [amount, setAmount] = useState('');

  const handleSubmit = event => {
    event.preventDefault(); 

    contract.stake({amount:amount})

    setAmount('');
    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label>Staking amount: </label>
        <input
          id="Amount"
          name="Amount"
          type="text"
          onChange={event => setAmount(event.target.value)}
          value={amount}
        />
        <button type="submit">Stake</button>
      </form>
    </div>
  );
};

export default Stake;