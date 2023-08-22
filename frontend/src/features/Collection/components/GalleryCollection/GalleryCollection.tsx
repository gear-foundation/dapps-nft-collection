import { GalleryCollectionProps } from './GalleryCollection.interfaces';
import styles from './GalleryCollection.module.scss';
import { cx } from '@/utils';
import 'swiper/css';
import 'swiper/css/navigation';
import { Gallery } from '@/components/Gallery';
import { MultiSwitch } from '@/components/MultiSwitch/MultiSwitch';
import { Dropdown } from '@/ui';

function GalleryCollection({ title, data }: GalleryCollectionProps) {
  const switchOptions = [
    {
      name: 'NFTs',
      value: 'nfts',
    },
    {
      name: 'Collections',
      value: 'collections',
    },
  ];

  return (
    <div className={cx(styles.container)}>
      <div className={cx(styles.header)}>
        <div className={cx(styles.heading)}>
          {title && <h4 className={cx(styles.title)}>{title}</h4>}
          <div className={cx(styles.preferences)}>
            <MultiSwitch options={switchOptions} />
            <Dropdown
              label="Available to Mint"
              menu={{
                'Available to Mint': {
                  label: 'Available to Mint',
                  value: 'availableToMint',
                },
              }}
              onItemClick={() => null}
            />
          </div>
        </div>
        <span className={cx(styles.results)}>{data.length} results</span>
      </div>
      <div className={cx(styles['gallery-wrapper'])}>
        <Gallery data={data} />
      </div>
    </div>
  );
}

export { GalleryCollection };
