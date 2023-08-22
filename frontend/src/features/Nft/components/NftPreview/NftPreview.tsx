import styles from './NftPreview.module.scss';
import { cx, shortenString } from '@/utils';
import dummyNft from './dummy-nft-preview.png';
import { ReactComponent as IcUserStar } from '../../assets/images/ic-user-star-16.svg';
import { ReactComponent as Clocks } from '../../assets/images/watch-later-24px.svg';
import { NftPreviewProps } from './NftPreview.interfaces';
import { DescriptionItem } from '@/components';

function NftPreview(props: NftPreviewProps) {
  return (
    <div className={cx(styles.card)}>
      <div className={cx(styles['image-wrapper'])}>
        <div className={cx(styles.dummy)} />
        <img src={dummyNft} alt="" className={cx(styles.image)} />
      </div>
      <div className={cx(styles.content)}>
        <h4 className={cx(styles.title)}>#2 BOB NFT Collection</h4>
        <p className={cx(styles.collection)}>BOB NFT Collection</p>
        <div className={cx(styles.info)}>
          <DescriptionItem icon={<IcUserStar />} text={shortenString('0x2...8cd', 3)} />
          <DescriptionItem icon={<Clocks />} text="2 hour ago" />
        </div>
      </div>
    </div>
  );
}

export { NftPreview };
