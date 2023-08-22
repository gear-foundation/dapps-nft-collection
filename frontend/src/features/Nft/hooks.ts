/* eslint-disable arrow-body-style */
import { useAtom } from 'jotai';

export const useNFTs = () => {
  // const [NFTs] = useAtom(NFTS_ATOM);
  // const [NFTContracts] = useAtom(NFT_CONTRACTS_ATOM);

  return { nfts: [], NFTContracts: [] };
};
