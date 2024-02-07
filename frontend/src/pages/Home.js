// Home.js
import React from 'react';
import { useWallet } from 'useink';


const Home = () => {
    const { account } = useWallet();
  
    return (
      <div>
        <h1>Welcome to NFT Marketplace</h1>
        {account && <p>Connected as {account?.name || account.address}</p>}
        {/* Rest of the Home component */}
      </div>
    );
  };
  
  export default Home;