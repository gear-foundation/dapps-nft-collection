import { GalleryCollection } from '@/features/Collection/components/GalleryCollection';
import { NftPreview } from '@/features/Nft/components/NftPreview';

function YourSpacePage() {
  return (
    <GalleryCollection
      title="Your Space"
      data={[<NftPreview />, <NftPreview />, <NftPreview />, <NftPreview />, <NftPreview />]}
    />
  );
}

export { YourSpacePage };
