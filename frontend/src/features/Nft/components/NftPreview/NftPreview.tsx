import styles from './NftPreview.module.scss';
import { cx, shortenString } from '@/utils';
import { ReactComponent as IcUserStar } from '../../assets/images/ic-user-star-16.svg';
import { ReactComponent as Clocks } from '../../assets/images/watch-later-24px.svg';
import { NftPreviewProps } from './NftPreview.interfaces';
import { DescriptionItem } from '@/components';
import { getTimeFormatFromStateDate } from '@/features/Collection/utils';

function NftPreview({ url, name, collectionName, owner, timeMinted }: NftPreviewProps) {
  return (
    <div className={cx(styles.card)}>
      <div className={cx(styles['image-wrapper'])}>
        <div className={cx(styles.dummy)} />
        <img src={url} alt="" className={cx(styles.image)} />
      </div>
      <div className={cx(styles.content)}>
        <h4 className={cx(styles.title)}>{name}</h4>
        <p className={cx(styles.collection)}>{collectionName}</p>
        <div className={cx(styles.info)}>
          <DescriptionItem icon={<IcUserStar />} text={shortenString(owner || '', 3)} />
          <DescriptionItem icon={<Clocks />} text={getTimeFormatFromStateDate(timeMinted)} />
        </div>
      </div>
    </div>
  );
}

export { NftPreview };
