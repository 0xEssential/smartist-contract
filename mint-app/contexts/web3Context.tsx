import { Web3Provider } from '@ethersproject/providers';
import React, {
  createContext,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

import { initNotify, initOnboard } from '../utils/connect';

const defaultValue: {
  onboard: any;
  address: string;
  provider: Web3Provider;
  notify: { hash: (txHash: string) => void };
  network: undefined;
} = {
  onboard: undefined,
  address: undefined,
  provider: undefined,
  notify: undefined,
  network: undefined,
};

const Web3Context = createContext(defaultValue);

const Web3ContextProvider = ({ children }: any): ReactElement => {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const [network, setNetwork] = useState(null);
  const [onboard, setOnboard] = useState(null);
  const [notify, setNotify] = useState(null);
  const [wallet, setWallet] = useState({});
  const addressRef = useRef();

  useEffect(() => {
    const onboard = initOnboard({
      address: setAddress,
      network: (network) => {
        setNetwork(network);
      },
      wallet: (wallet) => {
        if (wallet.provider) {
          setWallet(wallet);

          const provider = new Web3Provider(wallet.provider, 'any');

          provider.on('network', (newNetwork, oldNetwork) => {
            console.warn(newNetwork);
            // When a Provider makes its initial connection, it emits a "network"
            // event with a null oldNetwork along with the newNetwork. So, if the
            // oldNetwork exists, it represents a changing network
            if (
              oldNetwork &&
              newNetwork.chainId !== parseInt(process.env.CHAIN_ID, 10)
            ) {
              // signOut();
            }
          });

          setProvider(provider);
          window.localStorage.setItem('selectedWallet', wallet.name);
        } else {
          setProvider(null);
          setWallet({});
        }
      },
    });

    setOnboard(onboard);
    setNotify(initNotify());
  }, []);

  useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem(
      'selectedWallet',
    );

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
    }
  }, [onboard]);

  useEffect(() => {
    if (!addressRef.current) {
      addressRef.current = address;
      return;
    }

    addressRef.current = address;
    signOut();
  }, [address]);

  const value = {
    onboard,
    address,
    wallet,
    provider,
    notify,
    network,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export default Web3ContextProvider;
export { Web3Context };
