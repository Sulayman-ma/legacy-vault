'use client'

import { useState, useEffect } from 'react';
import { addSecret } from '../../lib/crud';
import {
  Typography,
  Button,
  Input
} from "@material-tailwind/react"
import CustomAlert from '@/app/components/alert';

export default function AddSecret({ web5 }) {

  const [accountName, setAccountName] = useState('');
  const [phrase, setPhrase] = useState('');
  const [platform, setPlatform] = useState('');
  const [isFormReady, setIsFormReady] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    color: '',
    content: '',
  })

  useEffect(() => {
    // web5 must be available to enable submit
    setIsFormReady((web5 !== null) && accountName.length > 0 && phrase.length > 0);
  }, [web5, accountName, phrase]);

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
          className="w-1/4 mt-6 bg-black"
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
