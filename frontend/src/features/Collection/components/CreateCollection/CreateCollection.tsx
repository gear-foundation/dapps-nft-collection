import { useCallback, useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { useAtomValue, useSetAtom } from 'jotai';
import { Button, DropzoneUploader } from '@/ui';
import { ContractFormValues, CreateCollectionProps } from './CreateCollection.interfaces';
import styles from './CreateCollection.module.scss';
import { cx } from '@/utils';
import icCloud from '../../assets/images/ic-cloud-upload-24.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import { ACCOUNT_ATOM } from '@/atoms';
import { useFactoryMessage } from '../../hooks';
import { NftCreationSuccessModal } from '../NftCreationSuccessModal';

const collectionName = 'NFT on Vara Incentivized Testnet - 1';
const collectionDescription = `This one-of-a-kind NFT is more than just collectible; this is a token of ownership, enabling you to hold a
piece of this dynamic digital tapestry and become part of its legacy. Through smart contracts on Vara
Incentivized Testnet, weve ensured that each transaction is transparent, secure, and eco-friendly.`;

function CreateCollection(props: CreateCollectionProps) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(true);
  const [newCollectionId, setNewCollectionId] = useState<string | null>('1111');
  const account = useAtomValue(ACCOUNT_ATOM);
  const { message } = useFactoryMessage();

  const form = useForm<ContractFormValues>({
    initialValues: {
      name: `${account?.meta.name} ${collectionName}`,
      description: collectionDescription,
      medias: [],
    },
    validate: {},
  });

  const { onSubmit, setFieldValue, reset } = form;

  const handleDropFile = useCallback(
    (previews: string[]) => {
      setFieldValue('medias', previews);
    },
    [setFieldValue],
  );

  const handleCreateCollection = ({ name, description, medias }: ContractFormValues) => {
    const payload = {
      CreateCollection: {
        name,
        description,
        medias,
        nft: account?.decodedAddress,
      },
    };

    message(payload);
    //onSuccess -> replies
  };

  const handleContinue = () => {
    reset();
    setIsSuccessModalOpen(false);
    setNewCollectionId(null);
  };

  useEffect(() => {
    if (account) {
      setFieldValue('name', `${account?.meta.name} ${collectionName}`);
    }
  }, [account, setFieldValue]);

  return (
    <>
      <form onSubmit={onSubmit(handleCreateCollection)} className={cx(styles.container)}>
        <h1 className={cx(styles.title)}>New Collection</h1>
        <div className={cx(styles.block)}>
          <div className={cx(styles.content)}>
            <span className={cx(styles['block-title'])}>Name</span>
            <span className={cx(styles['block-name'])}>
              {account?.meta.name} {collectionName}
            </span>
          </div>
          <div className={cx(styles.content)}>
            <span className={cx(styles['block-title'])}>Description</span>
            <span className={cx(styles['block-description'])}>{collectionDescription}</span>
          </div>
          <div className={cx(styles.uploader)}>
            <div className={cx(styles.content)}>
              <span className={cx(styles['block-name'])}>Upload images (10 of 10)</span>
              <span className={cx(styles['block-title'])}>You can upload .jpg, .jpeg, .png, .gif files here</span>
            </div>
            <DropzoneUploader
              multi
              onDropFile={handleDropFile}
              content={
                <div className={cx(styles['dropzone-content'])}>
                  <img src={icCloud} alt="ff" className={cx(styles['dropzone-content-image'])} />
                  <div className={cx(styles['dropzone-content-choose'])}>Choose File</div>
                  <span className={cx(styles['dropzone-content-text'])}>Or drag and drop your files here</span>
                </div>
              }
            />
          </div>
          <div className={cx(styles.buttons)}>
            <Button variant="primary" className={cx(styles.button)} label="Create collection" type="submit" />
            <Button variant="primary" className={cx(styles.button, styles['button-grey'])} label="Cancel" />
          </div>
        </div>
      </form>
      {isSuccessModalOpen && <NftCreationSuccessModal collectionId={newCollectionId} onClose={handleContinue} />}
    </>
  );
}

export { CreateCollection };
