import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IonIcon from '@reacticons/ionicons';

import { UserContext } from "../context/UserContext";

export type TransactionData = {
    id: number
    debitedAccountId: number
    creditedAccountId: number
    value: number
    createdAt: string
}

interface Props {
    type: string;
}

interface Centered {
    centered: string;
}

export default function MyStatement() {

    const { token } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const { id } = useContext(UserContext);
    const [balance, setBalance] = useState(0);
    const [hidePassword, setHidePassword] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            try {
                axios.get("http://localhost:5000/balance", {
                    headers: { Authorization: `Bearer ${token}` }
                }).then((response) => setBalance(response.data.balance));

                axios.get("http://localhost:5000/transactions", { headers: { Authorization: `Bearer ${token}` } })
                    .then((response) => {
                        setTransactions(response.data);
                    }).catch(e => console.log(e));
            } catch (e) {
                alert("Erro ao receber saldo!");
            }
        })();
    }, [token])

    function showTransaction(transaction: TransactionData) {
        return transaction.creditedAccountId === id ? (
            <div className="transaction" key={transaction.id}><Date>{transaction.createdAt.slice(0, 10)}</Date><div><Description>{transaction.debitedAccountId}</Description> <Value type='deposit'>{transaction.value.toFixed(2).replace(".", ",")}</Value></div></div>
        ) : (
            <div className="transaction" key={transaction.id}><Date>{transaction.createdAt.slice(0, 10)}</Date><div><Description>{transaction.creditedAccountId}</Description> <Value type='withdraw'>{transaction.value.toFixed(2).replace(".", ",")}</Value></div></div>
        )
    }

    function getDebitedTransactions() {
        axios.get("http://localhost:5000/debited-transactions", { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                setTransactions(response.data);
            })
    }
    
    function getCreditedTransactions() {
        axios.get("http://localhost:5000/credited-transactions", { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                setTransactions(response.data);
            })
    }
    
    function getAllTransactions() {
        axios.get("http://localhost:5000/transactions", { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                setTransactions(response.data);
            })
    }

    return transactions.length === 0 ? (
        <Container>
            <Header> @{user}, aqui vai o seu extrato: </Header>
            <Box centered='center'><h3>Não há registros de entradas ou saídas</h3></Box>
            <Buttons>
                <Button onClick={() => navigate('/main-page')}><p>Voltar</p></Button>
            </Buttons>
        </Container>
    ) : (
        <Container>
            <Header> @{user}, aqui vai o seu extrato: </Header>
            <Buttons>
                <Button onClick={() => getDebitedTransactions()}><p>Débitos</p></Button>
                <Button onClick={() => getAllTransactions()}><p>Todas</p></Button>
                <Button onClick={() => getCreditedTransactions()}><p>Créditos</p></Button>
            </Buttons>
            <Box centered='left'>{transactions.map((transaction) => showTransaction(transaction))}</Box>
            <Buttons>
                <ReturnButton onClick={() => navigate('/main-page')}><IonIcon name="caret-back-outline"/>Voltar</ReturnButton>
            </Buttons>
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
    justify-content: space-between;
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

const Header = styled.header`
    padding: 22px 22px 0 22px;
    font-size: 26px;
    font-weight: 700;
    color: #FFFFFF;
    width: 340px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Box = styled.div<Centered>`
    background: #FFFFFF;
    height: 446px;
    width: 326px;
    display: flex;
    justify-content: ${props => props.centered};
    align-items: ${props => props.centered};
    border-radius: 5px;
    flex-direction: column;
    font-size: 16px;
    padding: 23px 11px 0 12px;
    position: relative;
    overflow: scroll;
    h3{
        width: 200px;
        text-align: center;
        color:#868686;
        font-size: 20px;
    }
    .transaction{
        width: 300px;
        justify-content: space-between;
    }
    div{
        display: flex;
        flex-direction: row;
    }
    div>div{
        display: flex;
        flex-direction: row;
        width: 100px;
        justify-content: space-between;
        margin-bottom: 10px;
    }
`

const Date = styled.span`
    color:#C6C6C6;

`

const Description = styled.div`
    color: #000000;
`

const Value = styled.span<Props>`
    color: ${props => props.type === 'deposit' ? '#03AC00' : '#C70000'};
    text-align: left;
`

const Buttons = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    flex-direction: row;
`

const Button = styled.button`
    display: flex;
    align-items: center;
    height: 40px;
    width: 100px;
    padding: 10px;
    background: white;
    border: none;
    border-radius: 5px;
    margin: 5px;   
    color: black;
    font-size: 17px;
    font-family: 'Raleway', cursive;
    font-weight: 700;
    flex-direction: column;
    IonIcon {
        margin-bottom: 23px;
        font-size: 25px;
    }
    cursor: pointer;
`

const ReturnButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 100px;
    padding: 10px;
    margin: 5px;   
`