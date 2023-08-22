import { useMemo } from 'react';
import { useSendMessage } from '@gear-js/react-hooks';
import { useMetadata } from '@/hooks';
import { ADDRESS } from '@/consts';
import factoryMetaTxt from '@/assets/meta/collection_factory.meta.txt';

function useFactoryMetadata() {
  const meta = useMetadata(factoryMetaTxt);

  const memoizedMeta = useMemo(() => meta, [meta]);

  return memoizedMeta;
}

function useFactoryMessage() {
  const meta = useFactoryMetadata();

  const message = useSendMessage(ADDRESS.CONTRACT, meta);

  return { meta, message };
}

export { useFactoryMessage };
