'use client'

import { 
  Card,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography
} from "@material-tailwind/react"
import { renderMiniCard, renderDetailedCard } from "@/app/lib/render-cards";
import { NewAssetMini } from "@/app/components/assets/mini-cards";
import { useContext, useEffect, useState } from "react"
import { Web5Context } from "@/app/lib/contexts"
import { getAssets } from "@/app/lib/crud";
import { MiniCardSkeleton } from "@/app/components/skeletons";

export default function Page() {
  const { web5 } = useContext(Web5Context)
  const [renderData, setRenderData] = useState()
  const [activeCard, setActiveCard] = useState({})

  useEffect(() => {
    if(!web5) return;
    const fetchData = async () => {
      const fetchedData = await getAssets(web5)
      // console.log('Fetched assets:', fetchedData)
      setRenderData(fetchedData)
    }

    fetchData()
  }, [web5, renderData])

  // managing accordions
  const [open, setOpen] = useState(-1);
  const handleOpen = (value) => setOpen(open === value ? -1 : value);

  return (
    <div className="flex flex-row pr-6 pl-6 bg-black">
      <div className="flex">
        <Card className="overflow-y-auto overscroll-none bg-black mr-2 ml-2 max-h-[27rem]">
          {!renderData ? (
            <MiniCardSkeleton />
          ) : renderData && renderData.length === 0 ? (
            <div className="text-center flex justify-center">
              <Typography variant="h6" color="white">
                No assets
              </Typography>
            </div>
          ) 
          :
          renderData.map(({ group, records }, index) => (
            <Accordion open={open === index} key={index}>
              <AccordionHeader 
                onClick={() => handleOpen(index)}
                className="text-white hover:text-gray-800"
              >
                {group.toUpperCase()}
              </AccordionHeader>

              <AccordionBody className="text-white">
                {records.map((record, index) => (
                  <div key={index}>
                    {renderMiniCard(group, record, setActiveCard)}
                  </div>
                ))}
              </AccordionBody>
            </Accordion>
          ))}
          <NewAssetMini setAsActive={setActiveCard} />
        </Card>
      </div>
      <div className="flex-1">
        <Card
          shadow={false}
          className="w-full ml-5 bg-gray-900 text-white min-h-[20rem]"
        >
          {renderDetailedCard(activeCard)}
        </Card>
      </div>
    </div>
  )
}
