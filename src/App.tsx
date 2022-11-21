import {BrowserRouter,Routes,Route} from "react-router-dom";
import {useState} from "react";
  
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import MyStatement from "./pages/MyStatement";
import NewTransaction from "./pages/NewTransaction";

  
import { UserContext } from "./context/UserContext";

  
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
            </Routes>
        </BrowserRouter>
        </UserContext.Provider>
    );
}
  
export default App;