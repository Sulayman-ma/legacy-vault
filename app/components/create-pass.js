'use client'

import React, { useState, useEffect } from 'react';
import { redirect } from "next/navigation"

export default function CreatePass({
  web5
}) {

  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [platform, setPlatform] = useState('');
  const [isFormReady, setIsFormReady] = useState(false);

  useEffect(() => {
    // web5 must be available to enable submit
    setIsFormReady((web5 !== null) && accountName.length > 0 && password.length > 0);
  }, [web5, accountName, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accountName.trim()) {
      alert('Please enter an account name');
      return;
    }

    const recordData = {
      account_name: accountName,
      phrase: password,
      platform: platform
    }

    console.info("Record data", recordData);
    const record = await writePass(recordData);
    // const { status } = await record.send();
    alert('Saved passphrase successfully')
    setAccountName("");
    setPassword("");
    setPlatform("");
  };

  const writePass = async (recordData) => {
    try {
      const { record } = await web5.dwn.records.create({
        data: recordData,
        message: {
          protocol: "https://legacy-vault/protocol",
          protocolPath: "pass",
          schema: "https://legacy-vault/pass-phrase",
          dataFormat: 'application/json'
        }
      })
      return record
    } catch (error) {
      alert('Failed to create record', error)
      return
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-black text-white rounded-md">
      <div className="mb-4">
        <label htmlFor="platform" className="block mb-1">Platform:</label>
        <input
          type="text"
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full py-2 px-3 bg-gray-200 border border-gray-400 rounded-md focus:outline-none focus:bg-white text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="accountName" className="block mb-1">Account Name:</label>
        <input
          type="text"
          id="accountName"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          className="w-full py-2 px-3 bg-gray-200 border border-gray-400 rounded-md focus:outline-none focus:bg-white text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-2 px-3 bg-gray-200 border border-gray-400 rounded-md focus:outline-none focus:bg-white text-black"
        />
      </div>
      <button
        type="submit"
        disabled={!isFormReady}
        className={`w-full py-2 px-4 rounded-md ${isFormReady ? 'bg-gray-800 text-white cursor-pointer' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
      >
        Submit
      </button>
    </form>
  );
};
