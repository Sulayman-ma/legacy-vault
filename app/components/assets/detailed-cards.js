'use client'

import {
  Typography,
  Card,
  CardBody,
  ListItem,
  ListItemSuffix,
  Select,
  Option,
  Input,
  Button,
  Textarea,
  ButtonGroup,
} from "@material-tailwind/react"
import { useContext, useEffect, useState } from "react"
import { Web5Context } from "@/app/lib/contexts"
import AddCredential from "./add-credential"
import AddSecret from "./add-secret"

export function WillCard({ cardInfo }) {
  return (
    <CardBody className="w-full text-white">
      <Typography variant="h4" color="white">
        Will
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Title: {cardInfo.claim.title}
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Content: {cardInfo.claim.credentialContent}
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Target: {cardInfo.claim.id.slice(0, 20)}...
      </Typography>
    </CardBody>
  )
}

export function SecretCard({ cardInfo }) {
  return (
    <CardBody className="w-full text-white">
      <Typography variant="h4" color="white">
        Stored Secret
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Platform Name: {cardInfo.platform}
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Account Username: @{cardInfo.account_name}
      </Typography>
    </CardBody>
  )
}

export function MessageCard({ cardInfo }) {
  return (
    <>Message card details</>
  )
}

export function LegalDocumentCard({ cardInfo }) {
  return (
    <>Legal doc card details</>
  )
}

export function NewAssetCard() {
  const { web5 } = useContext(Web5Context)
  const [showCredential, setShowCredential] = useState(true);

  const swapForm = (formNum) => {
    if (formNum === 1) {
      setShowCredential(true);
    } else {
      setShowCredential(false);
    }
  }

  return (
    <CardBody className="w-full text-white">
      <div className="flex justify-between">
        <Typography variant="h4" color="white">
          Create new asset
        </Typography>
        <ButtonGroup 
          size="sm" 
          variant="filled"
        >
          <Button
            className="text-white bg-black"
            onClick={() => swapForm(1)}
          >
            CREDENTIAL
          </Button>
          <Button
            className="text-white bg-black"
            onClick={() => swapForm(2)}
          >
            SECRET
          </Button>
        </ButtonGroup>
      </div>
      <Typography color="gray" className="mt-1 font-normal">
        Securely store valuable documents such as your will, legal documents, secrets and messages for beneficiaries
      </Typography>

      {/* swap between both forms */}
      <div className="mt-6">
        {showCredential ? 
          <AddCredential web5={web5} />
          // 'Credential form'
          :
          <AddSecret web5={web5} />
        }
      </div>  
    </CardBody>
  )
}
