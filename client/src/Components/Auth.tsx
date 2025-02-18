import React, { useState } from "react";
import FormAuth from "./AuthComponents/FormAuth";


export type AuthThings = "register" | "login";

function Auth() {
  const [AuthThing, setAuthThings] = useState<AuthThings>("login");
  return (
    <div className="flex ">
      <article>
        <h1>{AuthThing == "login" ? "Inicia sesion" : "Registrate"}</h1>
        <FormAuth AuthThings={AuthThing}/>
      </article>
    </div>
  );
}

export default Auth;
