import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import WtfPage from './components/WtfPage';
import QueuePage from './components/QueuePage';
import Footer from './components/Footer';
import { WagmiConfig, createClient, chain } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { Buffer } from "buffer";
import { Route, Routes } from 'react-router-dom';

const alchemyId = process.env.ALCHEMY_ID;

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
  return (

    <WagmiConfig client={client}>
      <ConnectKitProvider theme="midnight">
        <div className="App">
          <Header />
          <br /><br /><br />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="wtf" element={<WtfPage />} />
            <Route path="queue" element={<QueuePage />} />
          </Routes>
          <Footer />
        </div >
      </ConnectKitProvider>
    </WagmiConfig >




  );
}

export default App;
