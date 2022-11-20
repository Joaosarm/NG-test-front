import {createContext} from "react" ;

export type UserData = {
    token: string
    user: string
    id: number
    setToken:(c: string) => void
    setUser:(c: string) => void
    setId:(c: number) => void
  }

export const UserContext = createContext<UserData>({
    token: '', 
    user: '',
    id: 0,
    setToken: () => {},
    setUser: () => {},
    setId: () => {}
});
