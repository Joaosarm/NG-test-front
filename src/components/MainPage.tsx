import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IonIcon from '@reacticons/ionicons';

import { UserContext } from "../context/UserContext";

export default function MainPage() {

    const { token, setToken } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const [balance, setBalance] = useState(0);
    const [hideBalance, setHideBalance] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            try {
                axios.get("http://localhost:5000/balance", {
                    headers: { Authorization: `Bearer ${token}` }
                }).then((response) => setBalance(response.data.balance));

            } catch (e) {
                alert("Erro ao receber dados");
                console.log(e);
            }
        })();
    }, [token])

    function logOff() {
        setToken('');
        navigate('/');
    }

    return (
        <Container>
            <Header>Olá, @{user} <IonIcon name="exit-outline" onClick={logOff} /></Header>
            <BalanceBox>
                <div className="balance">
                    <h3>Saldo: R${hideBalance ? '...' : balance}</h3>
                    {
                        hideBalance ?
                            <div className='show-and-hide-balance'
                                onClick={() => setHideBalance(!hideBalance)} >
                                <IonIcon name="eye-outline" />
                            </div>
                            :
                            <div className='show-and-hide-balance'
                                onClick={() => setHideBalance(!hideBalance)} >
                                <IonIcon name="eye-off-outline" />
                            </div>
                    }
                </div>
            </BalanceBox>
            <Buttons>
                <Button onClick={() => navigate('/my-statement')}><IonIcon name="document-text-outline" /><p>Checar</p> <p>Extrato</p></Button>
                <Button onClick={() => navigate('/new-transaction')}><IonIcon name="add-circle-outline" /><p>Nova</p> <p>Transferência</p></Button>
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
`;

const Header = styled.header`
    padding: 22px;
    font-size: 26px;
    font-weight: 700;
    color: #FFFFFF;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
`

const BalanceBox = styled.div`
    background: #FFFFFF;
    height: 100px;
    width: 270px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-weight: bold;

    .balance{
        width: 200px;
        display: flex;
        justify-content: space-between;
    }

    h3{
        text-align: center;
        color:black;
        font-size: 20px;
    }
`


const Buttons = styled.div`
    padding: 10px;
    margin-bottom: 30px;
`

const Button = styled.button`
    height: 114px;
    width: 155px;
    padding: 10px;
    background: white;
    border: none;
    border-radius: 5px;
    margin: 5px;   
    color: black;
    text-align: left;
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