'use client'

import React, { useState, useEffect } from 'react';
import { addBeneficiary } from '../../lib/crud';
import { DidIonMethod } from '@web5/dids';
import {
  Card,
  Typography,
  Input,
  Button,
  Select,
  Option
} from "@material-tailwind/react"
import CustomAlert from '@/app/components/alert';

export default function AddBeneficiary({ web5 }) {

  const [benName, setBenName] = useState('');
  const [benDid, setBenDid] = useState('');
  const [benRelationship, setBenRelationship] = useState('');
  const [isFormReady, setIsFormReady] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    color: '',
    content: '',
  })

  const setDummyDid = async () => {
    const dummyDid = await DidIonMethod.create()
    setBenDid(dummyDid.document.id)
  }

  // setting a dummy DID for developement
  useEffect(() => {
    if(!web5) return
    setDummyDid()
  }, [web5]);

  // disable submit button until fields are filled in
  useEffect(() => {
    if(!web5) return
    setIsFormReady((web5 !== null) && benName.length > 0 && benDid.length > 0);
  }, [web5, benName, benDid])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!benName.trim()) {
        setAlertInfo({
          open: true,
          color: 'orange',
          content: 'Please enter a beneficiary name'
        })
        return;
      }

      let recordData = {
        benName: benName,
        benDid: benDid,
        benRelationship: benRelationship
      }

      const status = await addBeneficiary(web5, recordData);
      // remove when deploying
      await setDummyDid()
      setAlertInfo({
        open: true,
        color: 'green',
        content: 'Beneficiary added'
      })
    } catch (error) {
      console.error(error)
      setAlertInfo({
        open: true,
        color: 'red',
        content: error
      })
    }
  };

  return (
    <Card 
      shadow={false}
      className='bg-gray-900 p-10 mb-10'
    >
      {
        alertInfo.open 
        && 
        <CustomAlert alertInfo={alertInfo} />
      }
      <Typography variant="h4" color="white">
        Add Beneficiary
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        New beneficiary to transfer or issue credentials to
      </Typography>
      <br />
      <hr />
      <form 
        className="mt-8 mb-2 w-80 max-w-screen sm:w-96"
        onSubmit={handleSubmit}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="white" className="-mb-3">
            Beneficiary Name
          </Typography>
          <Input
            size="lg"
            placeholder="John Trabajo Joe"
            type='text'
            className="!border-white focus:!border-orange-400 text-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e) => setBenName(e.target.value)}
          />
          <Typography variant="h6" color="white" className="-mb-3">
            Beneficiary DID
          </Typography>
          <Input
            size="lg"
            placeholder="did:ion:12sd34as..."
            type='text'
            readOnly
            className="!border-white focus:!border-orange-400 text-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={benDid}
            onChange={(e) => setBenDid(e.target.value)}
          />
          <Typography variant="h6" color="white" className="-mb-3">
            Relationship
          </Typography>
          <Select
            size='lg'
            color='orange'
            className='text-white'
            variant="static"
            onChange={(e) => setBenRelationship(e)}
          >
            <Option value='Spouse'>Spouse</Option>
            <Option value='Sibling'>Sibling</Option>
            <Option value='Friend'>Friend</Option>
            <Option value='Parent'>Parent</Option>
          </Select>
        </div>
        <div className='flex justify-center'>
          <Button 
            className="mt-6 bg-black" 
            fullWidth
            disabled={!isFormReady}
            type='submit'
          >
            add
          </Button>
        </div>
      </form>
    </Card>
  );
};
