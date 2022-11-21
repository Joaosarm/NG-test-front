import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IonIcon from '@reacticons/ionicons';

import Input from "../components/Input";

import { UserContext } from "../context/UserContext";

export default function NewTransaction(){
    const { token } = useContext(UserContext);
    const [value, setValue] = useState('');
    const [creditedAccount, setCreditedAccount] = useState('');
    const navigate = useNavigate();

    function postTransaction(){
        axios.post("http://localhost:5000/transactions", {creditedAccount, value: parseFloat(value)},{
            headers: { Authorization: `Bearer ${token}` }
        }).then(()=>{
            alert("Transferência postada com sucesso");
            navigate('/main-page');
        }).catch((e)=>{
            alert('Erro ao enviar Transferência');
        });
    }
    return(
        <Container>
            <Title>Nova Transferência</Title>
            <p>Usuário a ser transferido:</p>
            <Input type="text" value={creditedAccount} onChange={(e) => setCreditedAccount(e.target.value)} placeholder="username" />
            <p>Valor a ser transferido:</p>
            <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Valor" />
            <Button onClick={postTransaction}>
                Realizar Transferência
            </Button>
            <ReturnButton onClick={() => navigate('/main-page')}>
            <IonIcon name="caret-back-outline"/>Voltar
            </ReturnButton>
        </Container>
    )
}

const Container = styled.div`
    min-height: 100vh;
    min-width: 100%;
    background-color: black;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: #FFFFFF;
    p{
        text-align: left;
        width: 300px;
        padding-bottom: 5px;
    }
    button{
        cursor: pointer;
        background: white;
        border: none;
        border-radius: 5px;
        font-size: 17px;
        font-family: 'Raleway', cursive;
        font-weight: 700;
        color: black;
    }
`;

const Title = styled.h3`
    color: #FFFFFF;
    font-weigth: 700;
    font-size: 26px;
    text-align: center;
    width: 320px;
    margin-bottom: 40px;
`

const Button = styled.button`
    height: 60px;
    width: 155px;
    padding: 10px;
    margin: 5px;   
`

const ReturnButton = styled.button`
    text-align: center;
    display: flex;
    align-items: center;
    height: 40px;
    width: 100px;
    padding: 10px;
    margin: 5px;   
    position: absolute;
    left: 20px;
    top: 20px;
`