import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SecurityRoute from "./Components/SecurityRoute";
import Auth from "./Pages/Auth";
import PublicRoute from "./Components/PublicRoute";
import Chat from "./Pages/Chat";


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute/>}>
            <Route path="/auth" element={<Auth/>}/>
          </Route>
          <Route element={<SecurityRoute />}>
            <Route path="/" element={<Chat/>} />
          </Route>

          <Route path="*" element={<Navigate to={"/"}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
