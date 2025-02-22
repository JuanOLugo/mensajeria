interface ErrorMessageProps {
  errorMessage: string | null
}

function ErrorMessage({ errorMessage }: ErrorMessageProps) {
  if (!errorMessage) return null

  return (
    <div className="rounded-md bg-red-50 p-4 mt-4 animate-fadeIn border border-red-200">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <div className="mt-1 text-sm text-red-700">
            <p>{errorMessage}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage
