import {
  SecretMini,
  WillMini,
  LegalDocumentMini,
  MessageMini,
  NewAssetMini
} from "@/app/components/assets/mini-cards"
import {
  WillCard,
  SecretCard,
  MessageCard,
  LegalDocumentCard,
  NewAssetCard,
} from '@/app/components/assets/detailed-cards'
import { Typography, CardBody } from "@material-tailwind/react";

export const renderMiniCard = (group, cardInfo, setActiveAsset) => {
  switch (group) {
    case 'Will':
      return (
        <WillMini 
          setAsActive={setActiveAsset} 
          cardInfo={cardInfo}
        />
      );
    case 'Secret':
      return (
        <SecretMini 
          setAsActive={setActiveAsset} 
          cardInfo={cardInfo}
        />
      );
    case 'Legal Document':
      return (
        <LegalDocumentMini 
          setAsActive={setActiveAsset} 
          cardInfo={cardInfo}
        />
      );
    case 'Special Message':
      return (
        <MessageMini 
          setAsActive={setActiveAsset} 
          cardInfo={cardInfo}
        />
      );
    // default:
    //   return null;
  }
}

export const renderDetailedCard = (stuff) => {
  switch (stuff.group) {
    case 'Will':
      return (
        <WillCard cardInfo={stuff.cardInfo}  />
      );
    case 'Secret':
      return (
        <SecretCard cardInfo={stuff.cardInfo}  />
      );
    case 'Legal Document':
      return (
        <LegalDocumentCard cardInfo={stuff.cardInfo}  />
      );
    case 'Special Message':
      return (
        <MessageCard cardInfo={stuff.cardInfo}  />
      );
    case 'new_asset':
      return <NewAssetCard />;
    default:
      return (
        <CardBody className="flex justify-center">
          <Typography 
            color="white"
            className="text-center"
            variant="h3"
          >
            Hi there
          </Typography>
        </CardBody> 
      );
  }
}
