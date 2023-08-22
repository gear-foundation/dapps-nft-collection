import { GalleryProps } from './Gallery.interface';
import styles from './Gallery.module.scss';
import { cx } from '@/utils';
import 'swiper/css';
import 'swiper/css/navigation';
import { Button } from '@/ui';

function Gallery({ data, emptyText }: GalleryProps) {
  return (
    <>
      {data.length ? (
        <div className={cx(styles['gallery-wrapper'])}>{data.map((item) => item)}</div>
      ) : (
        <div className={cx(styles['empty-wrapper'])}>
          {new Array(4).fill(0).map(() => (
            <div className={cx(styles['empty-item'])} />
          ))}
          <div className={cx(styles['empty-text-wrapper'])}>
            <h5 className={cx(styles['empty-text-heading'])}>Nothing here yet</h5>
            <div className={cx(styles['empty-text-main'])}>
              {emptyText || (
                <>
                  <span>Create a new collection</span>
                  <span>or suggest to specify custom contract address, switch to another network</span>
                  <Button label="Create Collection" variant="primary" />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { Gallery };
