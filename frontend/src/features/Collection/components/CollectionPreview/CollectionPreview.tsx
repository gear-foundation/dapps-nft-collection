import styles from './CollectionPreview.module.scss';
import { cx } from '@/utils';
import dummyNft from './dummy-nft-preview.png';
import { ReactComponent as IcImage } from '../../assets/images/ic-image-24.svg';
import { ReactComponent as Clocks } from '../../assets/images/watch-later-24px.svg';
import { CollectionPreviewProps } from './CollectionPreview.interfaces';
import { DescriptionItem } from '@/components';
import { Button } from '@/ui';
import { getNotMintedTokens, getTimeFormatFromStateDate } from '../../utils';

function CollectionPreview({ collection, tokens }: CollectionPreviewProps) {
  const {
    collection: { name },
    timeCreation,
  } = collection;
  const nftMaxCount = 10;

  return (
    <div className={cx(styles.card)}>
      <div className={cx(styles['image-wrapper'])}>
        <div className={cx(styles.dummy)} />
        <img src={tokens[0].medium} alt="" className={cx(styles.image)} />
        {getNotMintedTokens(tokens).length > 0 && (
          <Button
            label="Available to Mint!"
            variant="primary"
            size="small"
            className={cx(styles['available-to-mint-button'])}
          />
        )}
      </div>
      <div className={cx(styles.content)}>
        <h4 className={cx(styles.title)}>{name}</h4>
        <div className={cx(styles.info)}>
          <DescriptionItem icon={<IcImage />} text={`${tokens.length}/${nftMaxCount}`} />
          <DescriptionItem icon={<Clocks />} text={`${getTimeFormatFromStateDate(timeCreation)}`} />
        </div>
      </div>
    </div>
  );
}

export { CollectionPreview };
