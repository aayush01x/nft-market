// UploadNFT.js
import React from 'react';
import Button from '../components/Button';
import { useWallet } from 'useink';

const UploadNFT = () => {
  return (
    <div>
      <h1>Upload NFT</h1>
      <Button>Choose File</Button>
      <Button>Upload</Button>
    </div>
  );
};

export default UploadNFT;
