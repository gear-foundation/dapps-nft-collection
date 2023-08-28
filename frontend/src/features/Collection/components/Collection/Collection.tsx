import { CollectionProps } from './Collection.interfaces';
import styles from './Collection.module.scss';
import { cx, shortenString } from '@/utils';
import 'swiper/css';
import 'swiper/css/navigation';
import { Gallery } from '@/components/Gallery';
import { getNotMintedTokens, getTimeFormatFromStateDate } from '../../utils';
import { ReactComponent as IcImage } from '../../assets/images/ic-image-24.svg';
import { ReactComponent as Clocks } from '../../assets/images/watch-later-24px.svg';
import { ReactComponent as UserPlus } from '../../assets/images/user-plus.svg';
import { DescriptionItem } from '@/components';
import { Button } from '@/ui';
import { NftPreview } from '@/features/Nft/components/NftPreview';

function Collection({ data }: CollectionProps) {
  const { collection, tokens, owner, timeCreation } = data;
  const nftMaxCount = 10;

  return (
    <div className={cx(styles.container)}>
      <div className={cx(styles.header)}>
        <div className={cx(styles.title)}>{collection.name}</div>
        <div className={cx(styles.info)}>
          <DescriptionItem
            icon={<IcImage className={cx(styles['svg-image'])} />}
            text={`Minted images: ${`${getNotMintedTokens(tokens).length}/${nftMaxCount}`}`}
          />
          <DescriptionItem
            icon={<Clocks className={cx(styles['svg-image'])} />}
            text={`Created: ${getTimeFormatFromStateDate(timeCreation)}`}
          />
          <DescriptionItem
            icon={<UserPlus className={cx(styles['svg-image'])} />}
            text={`Created by: ${shortenString(owner, 5)}`}
          />
        </div>
        <div className={cx(styles.buttons)}>
          <Button variant="primary" className={cx(styles.button)} label="Mint NFT" />
          <Button variant="primary" className={cx(styles.button, styles['button-grey'])} label="Creator Space" />
        </div>
      </div>
      <div className={cx(styles['gallery-wrapper'])}>
        <Gallery
          data={tokens.map((token) => ({
            component: (
              <NftPreview
                url={token.medium}
                name={token.name}
                collectionName={token.collectionName}
                owner={token.owner}
                timeMinted={token.timeMinted || timeCreation}
              />
            ),
            id: `${token.timeMinted}-${token.medium}-${token.owner}`,
          }))}
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
