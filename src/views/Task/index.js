import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { format } from 'date-fns';

import api from '../../services/api';
import isConnected from '../../utils/isConnected';
import { Redirect } from 'react-router-dom';

// NOSSOS COMPONENTES
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TypeIcons from '../../utils/typeIcons';

import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

function Task({ match }) {
    const [redirect, setRedirect] = useState(false);
    const [type, setType] = useState();
    const [id, setId] = useState();
    const [done, setDone] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [macaddress, setMacaddress] = useState('11:11:11:11:11:11');

    async function loadTaskDetails() {
        await api.get(`/task/${match.params.id}`).then((response) => {
            setType(response.data.type);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setDate(format(new Date(response.data.when), 'yyyy-MM-dd'));
            setHour(format(new Date(response.data.when), 'HH:mm'));
        });
    }

    async function save() {
        // validação dos dados
        if (!title)
            return alert("Você precisa informar o título da tarefa")
        else if (!description)
            return alert("Você precisa informar a descrição da tarefa")
        else if (!type)
            return alert("Você precisa informar o tipo da tarefa")
        else if (!date)
            return alert("Você precisa informar a data da tarefa")
        else if (!hour)
            return alert("Você precisa informar a hora da tarefa")

        if (match.params.id) {

            let params = {
                macaddress,
                type,
                title,
                done,
                description,
                when: `${date}T${hour}:00.000`
            }
            await api.put(`/task/${match.params.id}`, params).then((response) => {
                setRedirect(true);
            });

        } else {

            let params = {
                macaddress,
                type,
                title,
                done,
                description,
                when: `${date}T${hour}:00.000`
            }
            await api.post(`/task`, params).then((response) => {
                setRedirect(true);
            });

        }
    }

    async function remove() {

        const res = window.confirm('Deseja realmente remover a tarefa?')

        if (res == true) {
            await api.delete(`/task/${match.params.id}`).then(() => {
                setRedirect(true);
            })
        }
    }

    useEffect(() => {
        if (!isConnected)
            setRedirect(true);
        loadTaskDetails();
    }, []);

    return (
        <S.Container>
            {redirect && <Redirect to="/" />}
            <Header />

            <S.Form>
                <S.TypeIcons>
                    {
                        TypeIcons.map((icon, index) => (
                            index > 0 &&
                            <button type="button" onClick={() => setType(index)}>
                                <img src={icon} alt="Tipo da Tarefa" className={type && type != index && 'inative'} />
                            </button>
                        ))
                    }
                </S.TypeIcons>

                <S.Input>
                    <span>Titulo</span>
                    <input type="text" placeholder="Titulo da tarefa" onChange={e => setTitle(e.target.value)} value={title} />
                </S.Input>

                <S.TextArea>
                    <span>Detalhes</span>
                    <textarea rows={5} palceholder="Detalhes da tarefa" onChange={e => setDescription(e.target.value)} value={description} />
                </S.TextArea>

                <S.Input>
                    <span>Data</span>
                    <input type="date" placeholder="Data" onChange={e => setDate(e.target.value)} value={date} />
                    {/* <img src={iconCalendar} alt="Calendario" /> */}
                </S.Input>

                <S.Input>
                    <span>Hora</span>
                    <input type="time" placeholder="Hora" onChange={e => setHour(e.target.value)} value={hour} />
                    {/* <img src={iconClock} alt="time" /> */}
                </S.Input>

                <S.Options>

                    <div>
                        <input id="done" type="checkbox" checked={done} onChange={() => setDone(!done)} />
                        <label for="done"> CONCLUÍDO </label>
                    </div>
                    {match.params.id && <button type="button" onClick={remove}> EXCLUIR </button>}

                </S.Options>

                <S.Save>
                    <button type="button" onClick={save} > SALVAR </button>
                </S.Save>

            </S.Form>

            <Footer />
        </S.Container >
    )
}

export default Task;
