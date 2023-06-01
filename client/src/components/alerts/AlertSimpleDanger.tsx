import React from "react"

interface AlertSimpleDangerProps {
  message: string
}

const AlertSimpleDanger: React.FC<AlertSimpleDangerProps> = ({message}) => {
  return (
    <>
      {/*<!-- Component: Simple Danger Alert --> */}
      <div
        className="w-full px-4 py-3 text-sm text-pink-500 border border-pink-100 rounded bg-pink-50"
        role="alert"
      >
        <p>{message}</p>
      </div>
      {/*<!-- End Simple Danger Alert --> */}
    </>
  )
}

export default AlertSimpleDanger;