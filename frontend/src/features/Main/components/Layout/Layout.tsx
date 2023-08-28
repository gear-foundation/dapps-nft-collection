import { useAtomValue } from 'jotai';
import { Link } from '@ui';
import styles from './Layout.module.scss';
import { cx } from '@/utils';
import images from '../../assets/images/nft-main.png';
import { Button } from '@/ui';
import { NftPreview } from '@/features/Nft/components/NftPreview';
import { CollectionPreview } from '@/features/Collection/components/CollectionPreview';
import { Swiper } from '@/components/Swiper';
import { COLLECTION, CREATE_COLLECTION } from '@/routes';
import { COLLECTIONS } from '@/features/Collection/atoms';

function Layout() {
  const collections = useAtomValue(COLLECTIONS);

  console.log(collections);

  return (
    <div className={cx(styles.container)}>
      <div className={cx(styles.content)}>
        <img src={images} alt="nft main" className={cx(styles['nft-main-image'])} />
        <div className={cx(styles.presentation)}>
          <h1 className={cx(styles.title)}>Vara NFT</h1>
          <span className={cx(styles.text)}>Discover Vara NFT Marketplace - Create, Connect, Collect!</span>
          <span className={cx(styles.text)}>
            Your hub for creating and exploring NFTs. Unleash your creativity, connect with fellow creators, and own
            digital assets like never before.
          </span>
          <div className={cx(styles.buttons)}>
            <Link to={CREATE_COLLECTION}>
              <Button label="Create Collection" variant="primary" />
            </Link>
            <Button label="Explore" variant="primary" />
          </div>
        </div>
      </div>
      <div className={cx(styles.collections)}>
        <Swiper
          title="Featured Collections"
          data={Object.keys(collections).map((id) => {
            const collection = collections[id];

            return (
              <Link to={`${COLLECTION}/${id}`}>
                <CollectionPreview collection={collection} tokens={collection.tokens} />
              </Link>
            ); //TODO pass and sort by creation date
          })}
          wrapperClass={cx(styles['with-padding'])}
          withNavigation
        />
        <Swiper
          title="Recently Created Collections"
          data={Object.keys(collections).map((id) => {
            const collection = collections[id];

            return (
              <Link to={`${COLLECTION}/${id}`}>
                <CollectionPreview collection={collection} tokens={collection.tokens} />
              </Link>
            ); //TODO pass and sort by creation date
          })}
          wrapperClass={cx(styles['with-padding'])}
          withNavigation
        />
        <Swiper
          title="Recently Minted NFTs"
          data={Object.keys(collections).map((id) => {
            const collection = collections[id];

            return (
              <Link to={`${COLLECTION}/${id}`}>
                <CollectionPreview collection={collection} tokens={collection.tokens} />
              </Link>
            ); //TODO pass and sort by creation date
          })}
          wrapperClass={cx(styles['with-padding'])}
          withNavigation
        />
      </div>
    </div>
  );
}

export { Layout };
