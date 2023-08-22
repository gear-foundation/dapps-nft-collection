import { CollectionProps } from './Collection.interfaces';
import styles from './Collection.module.scss';
import { cx } from '@/utils';
import 'swiper/css';
import 'swiper/css/navigation';
import { Gallery } from '@/components/Gallery';
import { ReactComponent as IcImage } from '../../assets/images/ic-image-24.svg';
import { ReactComponent as Clocks } from '../../assets/images/watch-later-24px.svg';
import { ReactComponent as UserPlus } from '../../assets/images/user-plus.svg';
import { DescriptionItem } from '@/components';
import { Button } from '@/ui';

function Collection({ data }: CollectionProps) {
  return (
    <div className={cx(styles.container)}>
      <div className={cx(styles.header)}>
        <div className={cx(styles.title)}>Alice NFT collection</div>
        <div className={cx(styles.info)}>
          <DescriptionItem icon={<IcImage className={cx(styles['svg-image'])} />} text="Minted images: 4/10" />
          <DescriptionItem icon={<Clocks className={cx(styles['svg-image'])} />} text="Created: 1 min ago" />
          <DescriptionItem icon={<UserPlus className={cx(styles['svg-image'])} />} text="Created by: 0x256...Uhs" />
        </div>
        <div className={cx(styles.buttons)}>
          <Button variant="primary" className={cx(styles.button)} label="Mint NFT" />
          <Button variant="primary" className={cx(styles.button, styles['button-grey'])} label="Creator Space" />
        </div>
      </div>
      <div className={cx(styles['gallery-wrapper'])}>
        <Gallery
          data={data}
          emptyText={
            <>
              <span>There are no NFTs here yet.</span>
              <span>Mint your first NFT, and it will be displayed here.</span>
            </>
          }
        />
      </div>
    </div>
  );
}

export { Collection };
