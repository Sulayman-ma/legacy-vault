'use client'

import AddBeneficiary from "@/app/components/beneficiaries/add-beneficiary"
import { useContext, useEffect, useState } from "react"
import { Web5Context } from "@/app/lib/contexts"
import { getBeneficiaries } from "@/app/lib/crud"
import ListBeneficiaries from "@/app/components/beneficiaries/list-beneficiaries"
import { Button, ButtonGroup } from "@material-tailwind/react"

export default function Page() {

  const { web5 } = useContext(Web5Context)
  const [showCompOne, setShowCompOne] = useState(true);
  const [beneficiaries, setBeneficiaries] = useState([])

  useEffect(() => {
    if(!web5) return;
    const fetchData = async () => {
      const beneficiariesData = await getBeneficiaries(web5);
      setBeneficiaries(beneficiariesData);
    }

    fetchData()
  }, [web5, beneficiaries])

  const handleShowComponent = (compNumber) => {
    if (compNumber === 1) {
      setShowCompOne(true);
    } else {
      setShowCompOne(false);
    }
  };

  return(
    <>
      <div className="flex justify-center mb-5 border-t-black-200">
        <ButtonGroup 
          size="md" 
          variant="outlined" 
        >
          <Button
            className="text-white"
            onClick={() => handleShowComponent(1)}
          >
            Add Beneficiary
          </Button>
          <Button
            className="text-white"
            onClick={() => handleShowComponent(2)}
          >
            Saved Benficiaries
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex justify-center">
        {showCompOne ? 
          <AddBeneficiary 
            web5={web5}
          /> 
          :
          <ListBeneficiaries
            web5={web5}
            beneficiaries={beneficiaries}
          />
        }
      </div>
    </>
  )
}
