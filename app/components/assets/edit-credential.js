import { useEffect, useState } from "react";
import { addCredential, getCredential } from "../../lib/crud";
import { 
  Select,
  Typography,
  Option,
  Button,
  Input,
  Textarea,
  Tooltip
} from "@material-tailwind/react"
import { CustomAlert } from "../alert";

export default function EditCredential({ web5, recordId }) {
  const [isFormReady, setIsFormReady] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ open: false })
  const [credentialInfo, setCredentialInfo] = useState()

  useEffect(() => {
    if(!web5) return;
    const fetchData = async () => {
      try {
        const credentialData = await getCredential(web5, recordId);
        setCredentialInfo(credentialData);
        setIsFormReady(true);
      } catch (error) {
        setAlertInfo({
          open: true,
          color: 'orange',
          content: error
        })
      }
    };
    fetchData();
  }, [web5, recordId]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const vcData = {
        type: credentialType,
        subject: credentialBeneficiary,
        title: credentialTitle,
        credentialContent: credentialContent
      }
      // const record = await editCredential(web5, vcData)

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
            disabled={true}
            value={credentialInfo.type}
          >
            <Option value='Will'>Will</Option>
            <Option value='Legal Document'>Legal Document</Option>
            <Option value='Special Message'>Special Message</Option>
          </Select>
        </div>
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
              value={credentialInfo.claim.subject.name || 'SELF'}
              // onChange={(e) => setCredentialType(e)}
            >
              <Option value="self">SELF</Option>
              {beneficiaries && beneficiaries.length > 0 ? (
                beneficiaries.map((data, index) => {
                  <Option key={index} value={data.recordId}>
                    {data.benName}
                  </Option>
                })
              ) : <Option disabled>No beneficiaries added</Option>}
            </Select>
          </div>
        </Tooltip>
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
            // value={credentialTitle}
            // onChange={(e) => setCredentialTitle(e.target.value)}
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
            // value={credentialTitle}
            // onChange={(e) => setCredentialTitle(e.target.value)}
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
}
