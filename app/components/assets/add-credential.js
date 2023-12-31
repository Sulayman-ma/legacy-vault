'use client'

import { 
  Select,
  Typography,
  Option,
  Button,
  Input,
  Textarea,
  Alert,
  Dialog,
  DialogBody,
  Spinner,
} from "@material-tailwind/react"
import CustomAlert from '@/app/components/alert';
import { useContext, useEffect, useState } from "react";
import { addCredential, convertToBase64, getBeneficiaries } from "../../lib/crud";
import { Web5Context } from "@/app/lib/contexts";

export default function AddCredential() {
  // WEB5 CONTEXT
  const { web5 } = useContext(Web5Context)

  // COMPONENT STATES
  const [loading, setLoading] = useState(false);
  const [credentialType, setCredentialType] = useState('')
  const [credentialTitle, setCredentialTitle] = useState('')
  const [credentialContent, setCredentialContent] = useState('')
  const [credentialTarget, setCredentialTarget] = useState('')
  const [attachment, setAttachment] = useState(null)
  const [isFormReady, setIsFormReady] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    color: '',
    content: '',
  })

  // FETCH BENEFICIARIES FOR FORM AND ENABLE SUBMIT AFTER FUNCTION RETURNS
  useEffect(() => {
    if(!web5) return;
    const fetchData = async () => {
      try {
        const beneficiariesData = await getBeneficiaries(web5);
        setBeneficiaries(beneficiariesData)
        setIsFormReady(true);
      } catch (error) {
        console.error(error)
      }
    };
  
    fetchData();
  }, [web5]);

  // CLICK ACTION HANDLERS
  const catchTarget = (e) => {
    setCredentialTarget(e)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // start loading animation
    setLoading(true);
    try {
      let base64String = null

      // HANDLE FILE CONVERSION
      if (attachment) {
        // convert any file attachments accordingly
        base64String = await convertToBase64(attachment)
      }

      const vcData = {
        type: credentialType,
        subject: credentialTarget,
        title: credentialTitle,
        credentialContent: credentialContent,
        attachment: base64String,
      }

      const code = await addCredential(web5, vcData)

      setAlertInfo({
        open: true,
        color: `${code === 202 ? 'green' : 'red'}`,
        content: `${code === 202 ? 'Asset saved' : 'Failed to save asset'}`
      })
    } catch (error) {
      console.info('Error: ', error)
      setAlertInfo({
        open: true,
        color: 'red',
        content: 'Failed to save asset'
      })
    }
    // end loading animation
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ALERT OR SOMETHING, I'VE COMMENTED THIS EVERYWHERE AND I'M STARTING TO GET TIRED HONESTLY BUT I WON'T STOP */}
      <Alert 
        open={alertInfo.open}
        onClose={() => {setAlertInfo({ open: false })}}
        color={alertInfo.color}
        className="my-5"
      >
        {alertInfo.content}
      </Alert>
      <div className="mb-1 gap-10 grid lg:grid-cols-2">
        {/* ASSET TYPE (GROUP) */}
        <div>
          <Select
            label="Credential Type"
            size='lg'
            color='orange'
            className='text-white'
            variant="static"
            value={credentialType}
            onChange={(e) => setCredentialType(e)}
          >
            <Option value='Will'>Will</Option>
            <Option value='Legal Document'>Legal Document</Option>
            <Option value='Special Message'>Special Message</Option>
          </Select>
        </div>
         {/* TARGET BENEFICIARY OR PERSONAL ASSET */}
        <div>
          <Select
            label="Target beneficiary"
            size='lg'
            color='orange'
            className='text-white'
            variant="static"
            value={credentialTarget}
            onChange={catchTarget}
            required
          >
            <Option value="personal">PERSONAL</Option>
            {beneficiaries.map(data => (
              <Option key={data.did} value={data.did}>
                {data.name}
              </Option>
            ))}
          </Select>
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-px h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            Personal asset or for a beneficiary?
          </Typography>
        </div>
        {/* ASSET TITLE */}
        <div>
          <Input
            size="lg"
            placeholder="Title of credential"
            label="Title"
            type="text"
            required
            className="!border-white !focus:border-orange-400 text-white"
            variant="static"
            color="orange"
            value={credentialTitle}
            onChange={(e) => setCredentialTitle(e.target.value)}
          />
        </div>
        {/* ADDITIONAL CONTENT */}
        <div>
          <Textarea
            size="lg"
            placeholder="Content of the credential or any additional description to be included"
            label="Content (optional)"
            className="!border-white !focus:border-orange-400 text-white"
            variant="static"
            color="orange"
            labelProps={{
              className: "text-white",
            }}
            value={credentialContent}
            onChange={(e) => setCredentialContent(e.target.value)}
          />
        </div>
        {/* ATTACHMENT */}
        <div>
          <Input
            size="lg"
            variant="static"
            label="Attachment (optional)"
            type="file"
            className="border-none text-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            accept="image/jpeg, image/jpg, image/png, text/plain, application/pdf"
            onChange={(e) => setAttachment(e.target.files[0])}
          />
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-px h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            {
              attachment ? 
                attachment.size > 1 * 1024 * 1024 ? 
                  'File size exceeds the limit of 1MB.'
                : 'File size limit is 1MB.'
                : 'File size limit is 1MB.'
            }
          </Typography>
        </div>
      </div>
      {/* SUBMIT BUTTON */}
      <div className='flex flex-row justify-center'>
        <Button 
          className="w-2/5 md:w-1/3 lg:w-1/3 mt-6 bg-black hover:bg-gray-800"
          fullWidth
          disabled={!isFormReady}
          type='submit'
        >
          add
        </Button>
        {/* <div className="flex justify-center items-center"> */}
          {loading && (
            <Spinner color="orange" />
          )}
        {/* </div> */}
      </div>
    </form>
  );
}
