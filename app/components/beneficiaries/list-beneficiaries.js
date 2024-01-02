import { deleteRecord } from "@/app/lib/crud";
import { Button, Card, Typography } from "@material-tailwind/react";
import CustomAlert from "../alert";
import { useState } from "react";

export default function ListBeneficiaries({ web5, beneficiaries }) {
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    color: '',
    content: '',
  })

  const handleRemove = async (benName, recordId) => {
    const confirmed = window.confirm(`Remove ${benName} from beneficiaries?`);
    if (confirmed) {
      // Perform deletion logic here based on itemId
      await deleteRecord(web5, recordId)
      setAlertInfo({
        open: true,
        color: 'green',
        content: 'Beneficiary removed'
      })
    }
  };

  const TABLE_HEAD = ['Name', 'DID', 'Relationship', '']

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
          {beneficiaries.map(({ recordId, name, relationship, did }) => {
            const classes = "p-4 border-b border-white-50";
 
            return (
              <tr key={recordId}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal"
                  >
                    {did ? (did.substring(0, 20) + '...') : 'No DID'}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal"
                  >
                    {relationship}
                  </Typography>
                </td>
                <td className={classes}>
                  <Button
                    variant="small"
                    color="red"
                    className="font-medium"
                    onClick={() => {handleRemove(name, recordId)}}
                  >
                    Remove
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
