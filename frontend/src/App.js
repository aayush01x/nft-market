// App.js
import React from 'react';
import Tabs from './components/Tabs';
import Home from './pages/Home';
import UploadNFT from './pages/UploadNFT';
import BrowseNFT from './pages/BrowseNFT';
import SellNFT from './pages/SellNFT';
import ConnectWallet from './components/ConnectWallet'; // Add this import

const App = () => {
  const tabs = ['Home', 'Upload NFT', 'Browse NFT', 'Sell NFT'];
  const [activeTab, setActiveTab] = React.useState('Home');

  const handleWalletConnect = (connectedAccount) => {
    // Handle the connected wallet in your app logic
    console.log('Connected account:', connectedAccount);
    // You may want to update state or perform other actions
  };

  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'Home' && <Home />}
      {activeTab === 'Upload NFT' && <UploadNFT />}
      {activeTab === 'Browse NFT' && <BrowseNFT />}
      {activeTab === 'Sell NFT' && <SellNFT />}
      <ConnectWallet onConnect={handleWalletConnect} /> {/* Add ConnectWallet here */}
    </div>
  );
};

export default App;
