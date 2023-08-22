import styles from './Layout.module.scss';
import { cx } from '@/utils';
import images from '../../assets/images/nft-main.png';
import { Button } from '@/ui';
import { NftPreview } from '@/features/Nft/components/NftPreview';
import { CollectionPreview } from '@/features/Collection/components/CollectionPreview';
import { Swiper } from '@/components/Swiper';

function Layout() {
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
            <Button label="Create Collection" variant="primary" />
            <Button label="Explore" variant="primary" />
          </div>
        </div>
      </div>
      <div className={cx(styles.collections)}>
        <Swiper
          title="Featured Collections"
          data={[
            <CollectionPreview />,
            <CollectionPreview />,
            <CollectionPreview />,
            <CollectionPreview />,
            <CollectionPreview />,
          ]}
          wrapperClass={cx(styles['with-padding'])}
          withNavigation
        />
        <Swiper
          title="Recently Created Collections"
          data={[
            <CollectionPreview />,
            <CollectionPreview />,
            <CollectionPreview />,
            <CollectionPreview />,
            <CollectionPreview />,
          ]}
          wrapperClass={cx(styles['with-padding'])}
          withNavigation
        />
        <Swiper
          title="Recently Minted NFTs"
          data={[<NftPreview />, <NftPreview />, <NftPreview />, <NftPreview />, <NftPreview />]}
          wrapperClass={cx(styles['with-padding'])}
          withNavigation
        />
      </div>
    </div>
  );
}

export { Layout };
