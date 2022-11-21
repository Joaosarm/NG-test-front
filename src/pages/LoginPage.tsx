import {useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import {UserContext} from "../context/UserContext";

import Button from "../components/Button";
import Input from "../components/Input";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setToken, setUser, setId} = useContext(UserContext);

  const navigator = useNavigate();

  async function log() {
    try {
      const response = await axios.post("http://localhost:5000/sign-in", {username,password});
      setToken(response.data.token);
      setUser(response.data.username);
      setId(response.data.id);
      navigator("/main-page");
    } catch (error){
      console.log(error);
      alert("Username ou senha errado!");
    }
  }

  return (
    <Container>
        <Title>NG.Cash</Title>
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
        <Button onClick={log}>Entrar</Button>
        <StyledLink to="/sign-up">Não possui uma conta? Cadastre-se</StyledLink>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: black;
`;

const Title = styled.h1`
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    color: #FFFFFF;
    padding: 24px;
`

const StyledLink = styled(Link)`
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    margin-top: 36px;
`;