import { GalleryCollection } from '@/features/Collection/components/GalleryCollection';
import { NftPreview } from '@/features/Nft/components/NftPreview';

function ExplorePage() {
  return (
    <GalleryCollection
      title="Explore NFTs & Collections"
      data={[<NftPreview />, <NftPreview />, <NftPreview />, <NftPreview />, <NftPreview />]}
    />
  );
}

export { ExplorePage };
