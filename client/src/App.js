import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { Buffer } from "buffer";

const alchemyId = process.env.ALCHEMY_ID;

if (!window.Buffer) window.Buffer = Buffer;

const client = createClient(
  getDefaultClient({
    appName: "PleazeNftMe",
    alchemyId,
  }),
);

function App() {
  return (

    <WagmiConfig client={client}>
      <ConnectKitProvider theme="midnight">
        <div className="App">
          <Header />
          <br /><br /><br />
          <HomePage />
          <Footer />
        </div >
      </ConnectKitProvider>
    </WagmiConfig >




  );
}

export default App;
