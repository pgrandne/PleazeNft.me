import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import WtfPage from './pages/WtfPage';
import QueuePage from './pages/QueuePage';
import Account from './pages/Account';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import { WagmiConfig, createClient, chain } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { Buffer } from "buffer";
import { Route, Routes } from 'react-router-dom';

const alchemyId = process.env.REACT_APP_ALCHEMY_ID;

const chains = [chain.polygonMumbai];

if (!window.Buffer) window.Buffer = Buffer;

const client = createClient(
  getDefaultClient({
    appName: "PleazeNftMe",
    alchemyId,
    chains,
  }),
);

const App = () => {
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="midnight">
        <div className="App">
          <Header />
          <br /><br /><br />
          {isMobile() && <p>Mobile device is not supported, please use desktop device</p>}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="wtf" element={<WtfPage />} />
            <Route path="queue" element={<QueuePage />} />
            <Route path="account" element={<Account />} />
            <Route path="admin" element={<Admin />} />
          </Routes>
          <Footer />
        </div>
      </ConnectKitProvider>
    </WagmiConfig >
  );
}

export default App;
