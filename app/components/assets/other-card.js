'use client'

import {
  Typography,
  CardBody,
  Button,
  CardHeader,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  ListItem,
  ListItemSuffix,

} from "@material-tailwind/react"
import {
  ArrowDownIcon,
  PencilIcon, 
  TrashIcon 
} from "@heroicons/react/24/solid"
import { useContext, useEffect, useState } from "react"
import { Web5Context } from "@/app/lib/contexts"
import { 
  convertBase64ToFile,
  deleteRecord, 
  getBenByDid, 
  getFileInfo 
} from "@/app/lib/crud"
import CustomAlert from "../alert"
import Link from "next/link"

export default function OtherCard({ assetData }) {
  // WEB5 CONTEXT AND ASSET GROUP
  const { web5 } = useContext(Web5Context)
  const group = assetData.group

  // COMPONENT STATES
  // const [fileName, setFileName] = useState(null)
  const [benName, setBenName] = useState(null)
  const [openDialog, setOpenDialog] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    color: '',
    content: '',
  });

  // GET BENEFICIARY NAME FOR AESTHETICS
  useEffect(() => {
    if (!web5) return;
    // GETTING NAME DEPENDS ON CLAIM FIELD IN CARD INFO OBJECT
    if (!assetData) return;
    if (!assetData.claim) return;
    const getBenName = async () => {
      const beneficiary = await getBenByDid(web5, assetData.claim.id)
      setBenName(beneficiary.name)
    }
    getBenName()
  }, [web5, assetData])

  const downloadFile = async () => {
    const base64String = assetData.claim.attachment

    const file = await convertBase64ToFile(base64String, assetData.claim.title)

    // console.info('Creating the file download URL...')
    const temp = window.URL.createObjectURL(file)

    // creating download anchor
    const anchor = document.createElement('a');
    anchor.href = temp;
    anchor.download = file.name;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);

    // simulating click to download
    anchor.click();

    // remove anchor
    document.body.removeChild(anchor);
    // console.info('Download complete!')
    return
  }

  // SWAP DISPLAY TO ASSET EDITING
  const swapDisplay = () => { return }

  // DELETE ASSET
  const deleteAsset = async () => {
    try {
      const response = await deleteRecord(web5, assetData.recordId)
      setOpenDialog(false);
      if (response.status.code == 202) {
        setAlertInfo({
          open: true,
          color: 'green',
          content: 'Asset deleted'
        })
      } else {
        setAlertInfo({
          open: true,
          color: 'red',
          content: 'Failed to delete asset'
        })
      }
    } catch (error) {
      setAlertInfo({
        open: true,
        color: 'red',
        content: error
      })
    }
  }

  return (
    <>
      {/* CARD HEADER */}
      <CardHeader
        className="flex flex-row justify-between bg-transparent my-auto py-0 px-3 mt-3" 
        shadow={false}
        color="white"
      >
        {/* HEADER TITLE */}
        <Typography variant="h3">
          {group}
        </Typography>

        {/* EDIT AND DELETE ICONS */}
        <div className="flex flex-row gap-3">
          <IconButton onClick={swapDisplay}>
            <PencilIcon className="w-8 h-8" />
          </IconButton>
          <IconButton onClick={() => {setOpenDialog(true)}}>
            <TrashIcon className="w-8 h-8" />
          </IconButton>
        </div>
      </CardHeader> 
      
      {/* CARD BODY */}
      <CardBody className="relative w-full text-white">
        {/* ALERT COMPONENT */}
        <div className="md:w-[60%] lg:w-[50%] m-auto my-5 flex justify-center items-center">
          {
            alertInfo.open 
            && 
            <CustomAlert alertInfo={alertInfo} />
          }
        </div>
        
        {/* CARD BODY CONTENT */}
        <Typography variant="h6" color="gray" className="mt-1 font-semibold">
          TITLE : {assetData.claim.title}
        </Typography>
        <Typography variant="h6" color="gray" className="mt-1 font-semibold">
          CONTENT : {assetData.claim.credentialContent}
        </Typography>
        <Typography variant="h6" color="gray" className="mt-1 font-semibold">
          TARGET : {
            !benName ? 
            <div className="animate pulse w-30 h-2 bg-gray-900">
              &nbsp;
            </div> : benName
          }
        </Typography>
        {
          assetData.claim.attachment ? (
          <IconButton
            color="transparent"
            ripple={true}
            className="mt-1 text-center"
            onClick={downloadFile}
          >
            <ArrowDownIcon className="w-6 h-6" />
          </IconButton>
          ) : ''
        }
      </CardBody>

      {/* dialog for action confirmation */}
      <Dialog open={openDialog} handler={() => setOpenDialog(!openDialog)}>
        <DialogHeader color="red">Delete Asset</DialogHeader>
        <DialogBody>
          Are you sure you want to delete this asset?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={() => setOpenDialog(false)}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={deleteAsset}
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
