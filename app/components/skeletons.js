const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function RecordTableSkeleton() {
  return (
    <div className={`relative overflow-hidden rounded-md p-2 shadow-sm`}>
      <table className="w-full border-collapse border rounded-md overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Loading...</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border">
              <div className={`${shimmer} bg-gray-200 animate-pulse`}>&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border">
              <div className={`${shimmer} bg-gray-200 animate-pulse`}>&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border">
              <div className={`${shimmer} bg-gray-200 animate-pulse`}>&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border">
              <div className={`${shimmer} bg-gray-200 animate-pulse`}>&nbsp;</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export function CredentialsSkeleton() {}
