// SellNFT.js
import React from 'react';
import Button from '../components/Button';
import { useWallet } from 'useink';

const SellNFT = () => {
  return (
    <div>
      <h1>Sell NFT</h1>
      <Button>Create NFT</Button>
      <Button>Sell NFT</Button>
    </div>
  );
};

export default SellNFT;
