import { BrowserRouter, Route, Routes } from "react-router-dom";
import SecurityRoute from "./Components/SecurityRoute";
import Auth from "./Components/Auth";
import PublicRoute from "./Components/PublicRoute";


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute/>}>
            <Route path="/auth" element={<Auth/>}/>
          </Route>
          <Route element={<SecurityRoute />}>
            <Route path="/" element={<h1 className="cursor-pointer" onClick={() => {
              localStorage.removeItem("user")
              window.location.href = "/auth"
            }}>chao!</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
