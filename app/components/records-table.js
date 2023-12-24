import { RecordTableSkeleton } from "./skeletons";

export default function RecordsTable({ phrases, credentials }) {

  return(
    <div className="max-w-2xl mx-auto mt-8 flex space-x-8">
      {phrases && phrases.length > 0 ? (
        // First table with data if phrases has records after coming alive
        <table className="flex-1 border-collapse border rounded-md overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Passwords</th>
            </tr>
          </thead>
          <tbody>
            {phrases.map((record, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border text-center">
                  • {record[0] || 'Unknown'}: {record[1]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Display the skeleton for the first table if phrases has no records after coming alive
        <RecordTableSkeleton />
      )}

      {credentials && credentials.length > 0 ? (
        // Second table with data if phrases has records after coming alive
        <table className="flex-1 border-collapse border rounded-md overflow-hidden">
         <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Credentials</th>
            </tr>
          </thead>
          <tbody>
            {credentials.map((credential, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border text-center">
                  • {credential[0] || 'Unknown'}: {credential[1]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Display the skeleton for the second table if phrases has no records after coming alive
        <RecordTableSkeleton />
      )}
    </div>
  )
}
