import { ReactElement } from 'react';

export type NodeSwitchProps = {
  children: ReactElement;
  onChainChange: (newChain: string) => void;
};
