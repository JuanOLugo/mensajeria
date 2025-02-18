import React from "react";

function ErrorMessage({ ErrorMessage }: { ErrorMessage: string | null}) {
  return !ErrorMessage ? null : (
    <div>
      <h1 className="text-red-500">{ErrorMessage}</h1>
    </div>
  );
}

export default ErrorMessage;
