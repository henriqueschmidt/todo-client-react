import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { Link, Redirect } from 'react-router-dom';

import api from '../../services/api';
// NOSSOS COMPONENTES
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterCard from '../../components/FilterCard';
import TaskCard from '../../components/TaskCard';
import isConnected from '../../utils/isConnected';

function Home() {

	const [filterActived, setFilterActivded] = useState('all');
	const [tasks, setTasks] = useState([]);
	const [redirect, setRedirect] = useState(false);

	async function loadTasks() {
		await api.get(`/task/filter/${filterActived}/${isConnected}`)
			.then((response) => {
				setTasks(response.data);
			});
	}

	function notification() {
		setFilterActivded('late');
	}

	useEffect(() => {
		loadTasks();
		if (!isConnected)
			setRedirect(true);
	}, [filterActived]);

	return (
		<S.Container>
			{ redirect && <Redirect to="/qrcode" />}
			<Header clickNotification={notification} />

			<S.FilterArea>
				<button type="button" onClick={() => setFilterActivded("all")}>
					<FilterCard title="Todos" actived={filterActived == 'all'} />
				</button>
				<button type="button" onClick={() => setFilterActivded("today")}>
					<FilterCard title="Hoje" actived={filterActived == 'today'} />
				</button>
				<button type="button" onClick={() => setFilterActivded("week")}>
					<FilterCard title="Semana" actived={filterActived == 'week'} />
				</button>
				<button type="button" onClick={() => setFilterActivded("month")}>
					<FilterCard title="Mês" actived={filterActived == 'month'} />
				</button>
				<button type="button" onClick={() => setFilterActivded("year")}>
					<FilterCard title="Ano" actived={filterActived == 'year'} />
				</button>
			</S.FilterArea >

			<S.Title>
				<h3> {filterActived == 'late' ? 'Tarefas Atrasadas' : 'Tarefas'} </h3>
			</S.Title>

			<S.Content>
				{
					tasks.map(t => (
						<Link to={`/task/${t._id}`} >
							<TaskCard type={t.type} title={t.title} when={t.when} done={t.done} />
						</Link>
					))
				}

			</S.Content>

			<Footer />
		</S.Container >
	)
}

export default Home;
