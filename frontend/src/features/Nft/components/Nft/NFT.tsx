import { HexString } from '@polkadot/util/types';
import { useAccount } from '@gear-js/react-hooks';
import { createSearchParams, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { cx, getIpfsAddress } from '@/utils';
import { useNodeAddress } from '@/features/NodeSwitch/hooks';
import { ReactComponent as SearchSVG } from '../../assets/images/search.svg';
import { ReactComponent as BackArrowSVG } from '../../assets/images/back-arrow.svg';
import { getImageUrl } from '../../utils';
import styles from './NFT.module.scss';
import { TransferNFTModal } from '../TransferNftModal';

type Params = {
  programId: HexString;
  id: string;
};

function NFT() {
  const { programId, id } = useParams() as Params;
  const { account } = useAccount();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { isTestnet } = useNodeAddress();
  const nfts: any = [];
  const nft = nfts.find((item: any) => item.programId === programId && item.id === id);
  const { name, collection, description, owner, attribUrl } = nft || {};
  const [details, setDetails] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!attribUrl) return;

    const isIPFSHash = !Array.isArray(attribUrl);

    if (isIPFSHash) {
      const url = getIpfsAddress(attribUrl);

      fetch(url)
        .then((response) => response.json())
        .then((result) => setDetails(result));
    } else {
      setDetails(attribUrl);
    }
  }, [attribUrl]);

  useEffect(() => {
    setSearchQuery('');
  }, [pathname]);

  const getDetails = () =>
    details
      .filter((detail) => {
        const lowerCaseDetail = detail.toLocaleLowerCase();
        const lowerCaseQuery = searchQuery.toLocaleLowerCase();

        return lowerCaseDetail.includes(lowerCaseQuery);
      })
      .map((detail) => (
        <li key={detail} className={styles.detail}>
          <p>{detail}</p>
        </li>
      ));

  const handleSearchInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => setSearchQuery(target.value);

  const handleOwnerButtonClick = () =>
    navigate({ pathname: '/list', search: createSearchParams({ query: owner || '' }).toString() });

  const handleBackButtonClick = () => navigate(-1);

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const openTransferModal = () => setIsTransferModalOpen(true);
  const closeTransferModal = () => setIsTransferModalOpen(false);

  return (
    <>
      <div className={cx(styles.cont, styles.container)}>
        {nft ? (
          <>
            <div className={styles.innerContainer}>
              <div className={styles.imageWrapper}>
                <img src={getImageUrl(nft.mediaUrl)} alt="" />
              </div>

              <div className={styles.footerWrapper}>
                <footer className={styles.footer}>
                  <p className={styles.owner}>
                    <span className={styles.ownerHeading}>Owner:</span>
                    <span className={styles.ownerText}>{owner}</span>
                  </p>

                  <button type="button" className={styles.ownerButton} onClick={handleOwnerButtonClick}>
                    View NFTs
                  </button>
                </footer>
              </div>
            </div>

            <div className={styles.innerContainer}>
              <h2 className={styles.name}>{name}</h2>
              <p className={styles.collection}>{collection}</p>
              <p className={styles.description}>{description}</p>

              {attribUrl && (
                <div>
                  <header className={styles.header}>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="search" className={styles.label}>
                      NFT Details:
                    </label>

                    <div className={styles.inputWrapper}>
                      <SearchSVG />
                      <input
                        type="text"
                        placeholder="Search"
                        id="search"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                      />
                    </div>
                  </header>

                  <ul className={styles.details}>{getDetails()}</ul>
                </div>
              )}

              <div className={styles.buttons}>
                <button type="button" className={styles.backButton} onClick={handleBackButtonClick}>
                  <BackArrowSVG />
                  <span>Back</span>
                </button>

                {!isTestnet && account?.decodedAddress === owner && (
                  <button type="button" className={styles.transferButton} onClick={openTransferModal}>
                    Transfer
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>
            NFT with id {id} in {programId} contract not found.
          </p>
        )}
      </div>

      {isTransferModalOpen && <TransferNFTModal onClose={closeTransferModal} />}
    </>
  );
}

export { NFT };
