import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { COLLECTIONS } from '@/features/Collection/atoms';
import { CollectionPreview } from '@/features/Collection/components/CollectionPreview';
import { GalleryCollection } from '@/features/Collection/components/GalleryCollection';
import { Link } from '@/ui';
import { COLLECTION, NFT } from '@/routes';
import { AllData } from '@/features/Collection/types';
import { ACCOUNT_ATOM } from '@/atoms';
import { NftPreview } from '@/features/Nft/components/NftPreview';

function ExplorePage() {
  const collections = useAtomValue(COLLECTIONS);
  const [allData, setAllData] = useState<AllData>({
    collections: [],
    nfts: [],
  });
  const [chosenData, setChosenData] = useState<'nfts' | 'collections'>('collections');
  const account = useAtomValue(ACCOUNT_ATOM);

  const handleChooseData = (option: 'nfts' | 'collections') => {
    setChosenData(option);
  };

  const filterOptions = {
    'Available to Mint': {
      label: 'Available to Mint',
      value: 'availableToMint',
    },
  };

  const switchOptions = [
    {
      name: 'NFTs',
      value: 'nfts',
      onSelect: () => handleChooseData('nfts'),
    },
    {
      name: 'Collections',
      value: 'collections',
      onSelect: () => handleChooseData('collections'),
      activeByDefault: true,
    },
  ];

  useEffect(() => {
    if (collections) {
      const collectionKeys = Object.keys(collections);

      setAllData(() => ({
        collections: collectionKeys
          .map((key) => collections[key])
          .map((collection) => ({
            component: (
              <Link to={`${COLLECTION}/${collection.id}`}>
                <CollectionPreview collection={collection} tokens={collection.tokens} />
              </Link>
            ),
            id: collection.id,
          })),
        nfts: [...collectionKeys.map((key) => collections[key].tokens.map((token) => token))].flat().map((token) => ({
          component: (
            <Link to={`${NFT}`}>
              <NftPreview
                url={token.medium}
                name={token.name}
                collectionName={token.collectionName}
                owner={token.owner}
                timeMinted={token.timeMinted}
              />
            </Link>
          ),
          id: `${token.timeMinted}-${token.medium}-${token.owner}`,
        })),
      }));
    }
  }, [account?.decodedAddress, collections]);

  return (
    <GalleryCollection
      title="Explore NFTs & Collections"
      switchMenu={switchOptions}
      filterOptions={filterOptions}
      data={allData[chosenData]}
    />
  );
}

export { ExplorePage };
