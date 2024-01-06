'use client'

import {
  Typography,
  Button,
  Input
} from "@material-tailwind/react"
import CustomAlert from '@/app/components/alert';
import { useState, useEffect, useContext } from 'react';
import { addSecret } from '../../lib/crud';
import { Web5Context } from '@/app/lib/contexts';

export default function AddSecret() {
  // WEB5 CONTEXT
  const { web5 } = useContext(Web5Context)

  // COMPONENT STATES
  const [accountName, setAccountName] = useState('');
  const [phrase, setPhrase] = useState('');
  const [platform, setPlatform] = useState('');
  const [isFormReady, setIsFormReady] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    color: '',
    content: '',
  })
  
  // DISABLE SUBMIT IF WEB5 IS UNAVAILABLE AND ANY FIELD IS EMPTY
  useEffect(() => {
    setIsFormReady((
      web5 !== null) && 
      accountName.length > 0 && 
      phrase.length > 0
    );
  }, [web5, accountName, phrase]);

  // CLICK ACTION HANDLERS
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const recordData = {
        account_name: accountName,
        phrase: phrase,
        platform: platform
      }
      const record = await addSecret(web5, recordData);
      setAlertInfo({
        open: true,
        color: 'green',
        content: 'Secret saved'
      })
      setAccountName("");
      setPhrase("");
      setPlatform("");
    } catch (error) {
      setAlertInfo({
        open: true,
        color: 'red',
        content: error
      })
    }
  };

  return (    
    <form 
      onSubmit={handleSubmit} 
      className='lg:w-1/2 m-auto'
    >
      {
        alertInfo.open 
        && 
        <CustomAlert alertInfo={alertInfo} />
      }
      <div className="mb-1 grid gap-6">
        <Typography variant="h6" color="white" className="mb-3">
          Platform
        </Typography>
        <Input
          size="lg"
          placeholder="Platform of secret"
          type='text'
          className="!border-white focus:!border-orange-400 text-white"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        />
        <Typography variant="h6" color="white" className="mb-3">
          Account Name
        </Typography>
        <Input
          size="lg"
          placeholder="Account name"
          type='text'
          className="!border-white focus:!border-orange-400 text-white"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
        <Typography variant="h6" color="white" className="mb-3">
          Secret Phrase
        </Typography>
        <Input
          size="lg"
          placeholder="********"
          type='password'
          className="!border-white focus:!border-orange-400 text-white"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
        />
      </div>
      <div className='flex justify-center'>
        <Button 
          className="w-2/5 md:w-1/3 lg:w-1/3 mt-6 bg-black hover:bg-gray-800"
          fullWidth
          disabled={!isFormReady}
          type='submit'
        >
          add
        </Button>
      </div>
    </form>
  );
};
