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
} from "@material-tailwind/react"
import { 
  PaperClipIcon,
  LockClosedIcon,
  KeyIcon,
  DocumentIcon,
  DocumentTextIcon,
  PlusCircleIcon
} from "@heroicons/react/24/solid"
import Link from "next/link"

export function WillMini({ setAsActive, cardInfo }) {
  return (
    <Link 
      onClick={() => {setAsActive({
        group: 'Will',
        cardInfo: cardInfo
      })}} 
      href=""
    >
      <Card className="w-auto max-w-[25rem] mr-2 mb-3 p-0 text-white bg-orange-700">
        <CardBody>
          <ListItem 
            className="w-auto m-0" 
            ripple={false}
            disabled
          >
            WILL
            <ListItemSuffix>
              <LockClosedIcon className="w-5 h-5 m-auto" />
            </ListItemSuffix>
          </ListItem>
        </CardBody>
      </Card>
    </Link>
  )
}

export function SecretMini({ setAsActive, cardInfo }) {
  return (
    <Link 
      onClick={() => {setAsActive({
        group: 'Secret',
        cardInfo: cardInfo
      })}} 
      href=""
    >
      <Card className="w-auto max-w-[25rem] mr-2 mb-3 p-0 bg-gray-900 text-white hover:bg-gray-800">
        <CardBody>
          <ListItem 
            className="w-auto ml-0 p-0" 
            color="transparent" 
            ripple={false}
            disabled
          >
            SECRET
            <ListItemSuffix>
              <KeyIcon className="w-5 h-5 m-auto" />
            </ListItemSuffix>
          </ListItem>
          <Typography className="text-gray-500" variant="h6">
            {cardInfo.platform}
          </Typography>
          { cardInfo.isAttachment ? (
            <ListItem 
              color="transparent" 
              ripple={false}
              disabled
            >
              Includes attachment
              <ListItemSuffix>
                <PaperClipIcon className="w-7 h-7" />
              </ListItemSuffix>
            </ListItem>
          ) : '' }
        </CardBody>
      </Card>
    </Link>
  )
}

export function MessageMini({ setAsActive, cardInfo }) {
  return (
    <Link 
      onClick={() => {setAsActive({
        group: 'Special Message',
        cardInfo: cardInfo
      })}} 
      href=""
    >
      <Card className="w-auto max-w-[25rem] mr-2 mb-3 p-0 bg-gray-900 text-white hover:bg-gray-800">
        <CardBody>
        <ListItem 
            className="w-auto m-0" 
            color="transparent" 
            ripple={false}
            disabled
          >
            MESSAGE
            <ListItemSuffix>
              <DocumentTextIcon className="w-5 h-5 m-auto" />
            </ListItemSuffix>
          </ListItem>
        </CardBody>
      </Card>
    </Link>
  )
}

export function LegalDocumentMini({ setAsActive, cardInfo }) {
  return (
    <Link 
      onClick={() => {setAsActive({
        group: 'Legal Document',
        cardInfo: cardInfo
      })}} 
      href=""
    >
      <Card className="w-auto max-w-[25rem] mr-2 mb-3 p-0 bg-gray-900 text-white hover:bg-gray-800">
        <CardBody>
        <ListItem 
            className="w-auto m-0" 
            color="transparent" 
            ripple={false}
            disabled
          >
            LEGAL DOCUMENT
            <ListItemSuffix>
              <DocumentIcon className="w-5 h-5 m-auto" />
            </ListItemSuffix>
          </ListItem>
          <ListItem 
              color="transparent" 
              ripple={false}
              disabled
            >
              Includes attachment
              <ListItemSuffix>
                <PaperClipIcon className="w-7 h-7" />
              </ListItemSuffix>
            </ListItem>
        </CardBody>
      </Card>
    </Link>
  )
} 

export function NewAssetMini({ setAsActive }) {
  return (
    <Link 
      onClick={() => {setAsActive({
        group: 'new_asset',
      })}} 
      href=""
    >
      <Card className="w-auto max-w-[25rem] mr-2 mb-3 mt-5 p-0 text-white bg-gray-900 hover:bg-gray-800">
        <CardBody>
        <ListItem 
          className="w-auto m-0" 
          color="transparent" 
          ripple={false}
          disabled
        >
          NEW ASSET 
          <ListItemSuffix>
            <PlusCircleIcon className="w-5 h-5" />
          </ListItemSuffix>
        </ListItem>
        </CardBody>
      </Card>
    </Link>
  )
}
