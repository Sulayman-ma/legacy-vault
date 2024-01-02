import { deleteRecord } from "@/app/lib/crud";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { CustomAlert } from "../alert";
import { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";

export default function ListPasses({ web5, passes }) {
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    color: '',
    content: '',
  })

  const revealSecret = async (secret) => {
    
  };

  const TABLE_HEAD = ['Platform', 'Account Name', 'Secret', '']

  return (
    <Card color="transparent" className="h-full overflow-y-auto">
      {
        alertInfo.open 
        && 
        <CustomAlert alertInfo={alertInfo} />
      }
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-white-100 bg-white-50 p-4"
              >
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {passes.map(({ recordId, platform, account_name, secret }) => {
            const classes = "p-4 border-b border-white-50";
 
            return (
              <tr key={recordId}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal"
                  >
                    {platform}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal"
                  >
                    {account_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Input
                    variant="small"
                    readOnly
                    defaultValue='********'
                    className={classes}
                  />
                </td>
                <td className={classes}>
                  <Button
                    variant="small"
                    color="red"
                    className="font-medium"
                    onClick={() => {revealSecret(secret)}}
                  >
                    Reveal <EyeIcon />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  )
}
