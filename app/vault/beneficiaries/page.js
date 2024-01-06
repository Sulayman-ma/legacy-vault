'use client'

import { 
  Typography,
  Dialog,
  Button,
  Input,
  Select,
  Option,
  IconButton,
} from "@material-tailwind/react"
import { useContext, useEffect, useState } from "react"
import { Web5Context } from "@/app/lib/contexts"
import { addBeneficiary, getBeneficiaries } from "@/app/lib/crud"
import ListBeneficiaries from "@/app/components/beneficiaries/list-beneficiaries"
import CustomAlert from "@/app/components/alert"
import { DidIonMethod } from "@web5/dids"
import { UserPlusIcon } from "@heroicons/react/24/solid"

export default function Page() {
  // WEB5 CONTEXT
  const { web5 } = useContext(Web5Context)

  // COMPONENT STATES
  const [benName, setBenName] = useState('');
  const [benDid, setBenDid] = useState('');
  const [benRelationship, setBenRelationship] = useState('');
  const [isFormReady, setIsFormReady] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([])
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    color: '',
    content: '',
  });

  // FETCH BENEFICIARIES TO RENDER
  useEffect(() => {
    if(!web5) return;
    const fetchData = async () => {
      const beneficiariesData = await getBeneficiaries(web5);
      setBeneficiaries(beneficiariesData);
    }

    fetchData()
  }, [web5, beneficiaries])

  // ENABLING FORM ONLY WHEN IT'S FILLED
  useEffect(() => {
    if(!web5) return
    setIsFormReady((web5 !== null) && benName.length > 0 && benDid.length > 0);
  }, [web5, benName, benDid])

  // FOR DEVELOPMENT, REMOVE DURING PRODUCTION MAYBE
  // SETS A DUMMY DID WHILE FILLING THE FORM
  useEffect(() => {
    if(!web5) return
    setDummyDid()
  }, [web5]);

  // RANDOM ACTIONS HANDLERS AND STUFF
  const setDummyDid = async () => {
    const dummyDid = await DidIonMethod.create()
    setBenDid(dummyDid.document.id)
  }

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
      // await setDummyDid()

      setOpenDialog(false)
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

  // BENEFICIARIES PAGE SHOULD ONLY RENDER ALL SAVED BENEFICIARIES AND THE FORM TO ADD A NEW BENEFICIARY IS GOING TO BE A DIALOG FORM FROM MATERIAL TAILWIND
  return(
    <div>
      {/* ADD NEW BENEFICIARY */}
      <div className="flex justify-center items-center">
        <IconButton
          onClick={() => {setOpenDialog(!openDialog)}}
        >
          {/* <PlusCircleIcon className="w-5 h-5" /> */}
          <UserPlusIcon className="w-5 h-5" />
        </IconButton>
      </div>

      {/* SHARED ALERT FOR BOTH COMPONENTS */}
      <div className="w-[80%] md:w-[50%] lg:w-[40%] m-auto my-5 flex justify-center items-center">
        {
          alertInfo.open 
          && 
          <CustomAlert alertInfo={alertInfo} />
        }
      </div>

      {/* BENEFICIARIES TABLE */}
      <ListBeneficiaries
        beneficiaries={beneficiaries}
        setAlertInfo={setAlertInfo}
      />

      {/* ADD BENEFICIARY DIALOG FORM */}
      <Dialog 
        size="xs"
        open={openDialog}
        handler={() => {setOpenDialog(!openDialog)}}
        className="bg-gray-900 p-10"
      >
        <form 
          className="mt-8 mb-2 mx-auto w-full min-w-[15rem] max-w-[24rem]"
          onSubmit={handleSubmit}
        >
          <Typography variant="h3" color="white" className="mb-3">
            Add a new beneficiary
          </Typography>
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
            <Select
              label="Relationship"
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
      </Dialog>
    </div>
  )
}
