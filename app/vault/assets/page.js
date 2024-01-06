'use client'

import { 
  Card,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
  Drawer,
  ListItem,
  IconButton,
  ListItemSuffix
} from "@material-tailwind/react"
import { renderMiniCard, renderDetailedCard } from "@/app/lib/render-cards";
import { NewAssetMini } from "@/app/components/assets/mini-cards";
import { Fragment, useContext, useEffect, useState } from "react"
import { Web5Context } from "@/app/lib/contexts"
import { getAssets } from "@/app/lib/crud";
import { MiniCardSkeleton } from "@/app/components/skeletons";
import { PlusCircleIcon, Square3Stack3DIcon } from "@heroicons/react/24/solid";

export default function Page() {
  // WEB5 CONTEXT AND WHATNOT
  const { web5 } = useContext(Web5Context)

  // COMPONENT STATES
  const [open, setOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [renderData, setRenderData] = useState(null)
  const [activeCard, setActiveCard] = useState({
    group: 'welcome',
    assetData: {},
  })

  // ASSET NAVIGATION: ACCORDIONS AND RIGHT DRAWER
  const handleOpen = (value) => setOpen(open === value ? -1 : value);
  const drawerHandler = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    if(!web5) return;
    const fetchData = async () => {
      const fetchedData = await getAssets(web5)
      setRenderData(fetchedData)
    }

    fetchData()
  }, [web5, renderData])

  return (
    <div className="flex flex-col md:flex-row pr-6 pl-6 bg-black">
      {/* ASSET NAVIGATION FOR MEDIUM TO LARGE SCREENS */}
      <div>
        <Card className="hidden md:flex md:flex-col overflow-auto lg:w-full md:w-[85%] overscroll-none bg-black lg:px-2 lg:mr-2 lg:ml-2 md:max-h-[27rem]">
          {/* RENDER MINI CARDS ACCORDING TO THEIR ASSET TYPE */}
          {
            // streaming while fetching data
            !renderData ? (
              <>
                <MiniCardSkeleton />
                <MiniCardSkeleton />
              </>
            ) 
            : 
            // data retrieved and list empty
            renderData && renderData.length === 0 ? (
              <div className="text-center flex justify-center">
                <Typography variant="h6" color="white">
                  No assets
                </Typography>
              </div>
            ) 
            :
            // data retrieved with populated list
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
            ))
          }
          {/* MINI CARD TO ADD NEW ASSET */}
          <NewAssetMini setAsActive={setActiveCard} />
        </Card>
      </div>

      {/* ASSET NAVIGATION FOR MOBILE AND SMALLER SCREENS */}
      <Fragment>
        {/* OPEN DRAWER BUTTON AND ADD ASSET BUTTOIN */}
        <div className="md:hidden flex flex-row gap-10 justify-between mb-3">
          <ListItem
            className="bg-gray-900 shadow-none hover:shadow-none rounded-lg text-orange-400"
            onClick={drawerHandler}
          >
            SHOW ASSETS
            <ListItemSuffix>
              <Square3Stack3DIcon className="w-5 h-5" />
            </ListItemSuffix>
          </ListItem>
          <IconButton
            onClick={() => {
              setActiveCard({
                group: 'new_asset'
              })
            }}
          >
            <PlusCircleIcon className="w-5 h-5" />
          </IconButton>
        </div>
        <Drawer
          placement="right"
          onClose={drawerHandler}
          open={drawerOpen}
          className="bg-gray-900 p-5 overflow-y-auto"
        >
          {/* DRAWER CLOSE BUTTON */}
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={drawerHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
          <Typography
            variant="h3"
            color="white"
            className="text-center"
          >
            Asset Groups
          </Typography>
          {/* RENDER MINI CARDS ACCORDING TO THEIR ASSET TYPE */}
          {
            // streaming while fetching data
            !renderData ? (
              <>
                <MiniCardSkeleton />
                <MiniCardSkeleton />
              </>
            ) 
            : 
            // data retrieved and list empty
            renderData && renderData.length === 0 ? (
              <div className="text-center flex justify-center">
                <Typography variant="h6" color="white">
                  No assets
                </Typography>
              </div>
            ) 
            :
            // data retrieved with populated list
            renderData.map(({ group, records }, index) => (
              // <Accordion open={open === index} key={index}>
              //   <AccordionHeader 
              //     onClick={() => handleOpen(index)}
              //     className="text-white hover:text-gray-800"
              //   >
              //     {group.toUpperCase()}
              //   </AccordionHeader>

              //   <AccordionBody className="text-white">
                  <>
                  {records.map((record, index) => (
                    <div key={index}>
                      {renderMiniCard(group, record, setActiveCard)}
                    </div>
                  ))}
                  </>
                  
              //   </AccordionBody>
              // </Accordion>
            ))
          }
        </Drawer>
      </Fragment>

      {/* DISPLAYS DETAILED ASSET INFORMATION */}
      <div className="flex-1">
        <Card
          shadow={false}
          className="w-full lg:ml-5 bg-gray-900 text-white min-h-[17rem]"
        >
          {renderDetailedCard(activeCard)}
        </Card>
      </div>
    </div>
  )
}
