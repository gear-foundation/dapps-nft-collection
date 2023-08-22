import styles from './CollectionPreview.module.scss';
import { cx } from '@/utils';
import dummyNft from './dummy-nft-preview.png';
import { ReactComponent as IcImage } from '../../assets/images/ic-image-24.svg';
import { ReactComponent as Clocks } from '../../assets/images/watch-later-24px.svg';
import { CollectionPreviewProps } from './CollectionPreview.interfaces';
import { DescriptionItem } from '@/components';

function CollectionPreview(props: CollectionPreviewProps) {
  return (
    <div className={cx(styles.card)}>
      <div className={cx(styles['image-wrapper'])}>
        <div className={cx(styles.dummy)} />
        <img src={dummyNft} alt="" className={cx(styles.image)} />
      </div>
      <div className={cx(styles.content)}>
        <h4 className={cx(styles.title)}>Alex NFT Collection</h4>
        <div className={cx(styles.info)}>
          <DescriptionItem icon={<IcImage />} text="4/10" />
          <DescriptionItem icon={<Clocks />} text="2 hour ago" />
        </div>
      </div>
    </div>
  );
}

export { CollectionPreview };
