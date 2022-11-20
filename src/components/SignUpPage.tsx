import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Button from "./Button";
import Input from "./Input";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function register() {
    try {
      await axios.post("http://localhost:5000/sign-up", {username,password});
      alert("Cadastro feito com sucesso!");
      navigate("/");
    } catch(error) {
      alert("Ops, ocorreu um erro!");
      console.error("o erro foi..",  error);
    }
  }

  return (
    <Container>
        <Title>Realizar Cadastro</Title>
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
        {/* <Input type="password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} placeholder="Confirme a Senha" /> */}
        <Button onClick={register}>Cadastrar</Button>
        <StyledLink to="/">Já possui uma conta? Faça login</StyledLink>
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
    width: 170px;
`

const StyledLink = styled(Link)`
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    margin-top: 36px;
`;