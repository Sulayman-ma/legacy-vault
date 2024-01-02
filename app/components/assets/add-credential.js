import { useEffect, useState } from "react";
import { addCredential, getBeneficiaries } from "../../lib/crud";
import { 
  Select,
  Typography,
  Option,
  Button,
  Input,
  Textarea,
  Tooltip
} from "@material-tailwind/react"
import CustomAlert from '@/app/components/alert';

export default function AddCredential({ web5 }) {
  const [credentialType, setCredentialType] = useState('')
  const [credentialTitle, setCredentialTitle] = useState('')
  const [credentialContent, setCredentialContent] = useState('')
  const [credentialTarget, setCredentialTarget] = useState('')
  const [isFormReady, setIsFormReady] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    color: '',
    content: '',
  })

  useEffect(() => {
    if(!web5) return;
    const fetchData = async () => {
      try {
        const beneficiariesData = await getBeneficiaries(web5);
        setBeneficiaries(beneficiariesData);
        setIsFormReady(true);
      } catch (error) {
        console.error(error)
      }
    };
  
    fetchData();
  }, [web5, beneficiaries]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const vcData = {
        type: credentialType,
        subject: credentialTarget,
        title: credentialTitle,
        credentialContent: credentialContent
      }
      console.info('VC data', vcData)
      const response = await addCredential(web5, vcData)
      console.info('Saved credential', response)
      setAlertInfo({
        open: true,
        color: 'green',
        content: 'Credential saved'
      })
    } catch (error) {
      setAlertInfo({
        open: true,
        color: 'red',
        content: error
      })
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* custom dismissable alert */}
      {
        alertInfo.open
        && 
        <CustomAlert alertInfo={alertInfo} />
      }
      <div className="mb-1 gap-6 grid lg:grid-cols-2">
        <div>
          <Typography variant="h6" color="white" className="mb-3">
            Credential Type
          </Typography>
          <Select
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
        <div>
          <Tooltip content='Credential for yourself or for a beneficiary?'>
            <div>
              <Typography variant="h6" color="white" className="mb-3">
                Target
              </Typography>
              <Select
                size='lg'
                color='orange'
                className='text-white'
                variant="static"
                onChange={(e) => setCredentialTarget(e)}
                value={credentialTarget}
              >
                <Option value="self">SELF</Option>
                {beneficiaries ? (
                  beneficiaries.length > 0 ? (
                    beneficiaries.map((data) => (
                      <Option value={data.did} key={data.did}>
                        {data.name}
                      </Option>
                    ))
                  ) : (
                    <Option disabled value="#">
                      No beneficiaries saved
                    </Option>
                  )
                ) : ('Loading...')}
              </Select>
            </div>
          </Tooltip>
        </div>
        <div>
          <Typography variant="h6" color="white" className="mb-3">
            Title
          </Typography>
          <Input
            size="lg"
            placeholder="Title of credential"
            type="text"
            required
            className="!border-white focus:!border-orange-400 text-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={credentialTitle}
            onChange={(e) => setCredentialTitle(e.target.value)}
          />
        </div>
        <div>
          <Typography variant="h6" color="white" className="mb-3">
            Content (optional)
          </Typography>
          <Textarea
            size="lg"
            placeholder="Content of the credential or any additional description to be included"
            className="!border-white focus:!border-orange-400 text-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={credentialContent}
            onChange={(e) => setCredentialContent(e.target.value)}
          />
        </div>
        <div>
          <Typography variant="h6" color="white" className="mb-3">
            Attachment (optional)
          </Typography>
          <Input
            size="lg"
            placeholder="Subject of credential"
            type="file"
            className="border-none text-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            // value={credentialTitle}
            // onChange={(e) => setCredentialTitle(e.target.value)}
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <Button 
          className="w-1/4 mt-6 bg-black hover:bg-gray-800"
          fullWidth
          disabled={!isFormReady}
          type='submit'
        >
          add
        </Button>
      </div>
    </form>
  );
}
