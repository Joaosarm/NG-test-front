import {BrowserRouter,Routes,Route} from "react-router-dom";
import {useState} from "react";
  
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import SignUpPage from "./SignUpPage";
// import NewEntry from "./NewEntry";
import MyStatement from "./MyStatement";
import Coisa from "./Coisa";

  
import { UserContext } from "../context/UserContext";
import NewTransaction from "./NewTransaction";

  
function App() {
    const [user, setUser] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [id, setId] = useState<number>(0);

    return (
        <UserContext.Provider value= {{ user, token, id, setUser, setToken, setId }}>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/main-page" element={<MainPage />} />
            <Route path="/my-statement" element={<MyStatement />} />
            <Route path="/new-transaction" element={<NewTransaction />} />
            <Route path="/coisa" element={<Coisa />} />
            </Routes>
        </BrowserRouter>
        </UserContext.Provider>
    );
}
  
export default App;