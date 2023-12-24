import { VerifiableCredential } from "@web5/credentials";
import { DidDhtMethod } from "@web5/dids";
import { useEffect, useState } from "react";

export default function CreateVc({
  web5,
  myDid
}) {

  const [credentialType, setCredentialType] = useState('');
  const [credentialSubject, setCredentialSubject] = useState('');
  const [credentialTitle, setCredentialTitle] = useState('');
  const [credentialContent, setCredentialContent] = useState('');
  const [isFormReady, setIsFormReady] = useState(false);

  useEffect(() => {
    // web5 must be available to enable submit
    setIsFormReady((web5 !== null));
  }, [web5]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vcData = {
      type: credentialType,
      subject: credentialSubject,
      title: credentialTitle,
      credentialContent: credentialContent
    }
    const response = await writeVc(vcData)
    alert('Saved credential successfully')
    setCredentialSubject('')
    setCredentialTitle('')
    setCredentialType('')
    setCredentialContent('')
  };

  const writeVc = async (vcData) => {
    try {
      // create portable DID for signing
      const portableDid = await DidDhtMethod.create()
      console.info('DID created for signing', portableDid.document.id)
      const { type, subject, ...rest } = vcData
      // create VC object
      const vc = await VerifiableCredential.create({
        type: vcData.type,
        issuer: myDid,
        subject: vcData.subject || myDid,
        data: rest
      });

      // sign VC with portable DID
      const signedVcJwt = await vc.sign({ did: portableDid })

      // create record for signed VC and store here
      const { record } = await web5.dwn.records.create({
        data: signedVcJwt,
        message: {
          protocol: "https://legacy-vault/protocol",
          protocolPath: "credential",
          schema: "https://legacy-vault/credential",
          dataFormat: 'text/plain'
        }
      })
      return record
    } catch (error) {
      alert('Failed to create credential')
      return
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-black text-white rounded-md">
      <h2 className="text-xl font-bold mb-4">Create Credential</h2>
      <div className="mb-4">
        <label htmlFor="credentialType" className="block mb-1">Type:</label>
        <select
          id="credentialType"
          value={credentialType}
          onChange={(e) => setCredentialType(e.target.value)}
          className="w-full py-2 px-3 bg-gray-200 border border-gray-400 rounded-md focus:outline-none text-black"
        >
          <option value="">Select Type</option>
          <option value="will">Will</option>
          <option value="instruction">Special Instructions</option>
          <option value="sentimentalMessage">Sentimental Message</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="subject" className="block mb-1">Subject:</label>
        <input
          type="text"
          id="subject"
          value={credentialSubject}
          onChange={(e) => setCredentialSubject(e.target.value)}
          placeholder="Optional"
          className="w-full py-2 px-3 bg-gray-200 border border-gray-400 rounded-md focus:outline-none focus:bg-white text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1">Title:</label>
        <input
          type="text"
          id="title"
          value={credentialTitle}
          onChange={(e) => setCredentialTitle(e.target.value)}
          className="w-full py-2 px-3 bg-gray-200 border border-gray-400 rounded-md focus:outline-none focus:bg-white text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block mb-1">Content:</label>
        <textarea
          id="content"
          value={credentialContent}
          onChange={(e) => setCredentialContent(e.target.value)}
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
}
