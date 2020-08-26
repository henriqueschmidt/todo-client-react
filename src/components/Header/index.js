import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import isConnected from '../../utils/isConnected';

import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';

function Header({ clickNotification }) {
	const [lateCount, setLateCount] = useState();

	async function lateVerify() {
		await api.get(`/task/filter/late/${isConnected}`)
			.then((response) => {
				setLateCount(response.data.length);
			});
	}

	async function logout() {
		localStorage.removeItem('@todo/macaddress');
		window.location.reload();
	}

	useEffect(() => {
		lateVerify()
	})

	return (
		<S.Container>
			<S.LeftSide>
				<img src={logo} alt="Logo" />
			</S.LeftSide>

			<S.RigthSide>
				<Link to="/"> INÍCIO </Link>
				<span className="dividir" />
				<Link to="/task"> NOVA TAREFA </Link>
				<span className="dividir" />
				{
					!isConnected ?
						<Link to="/qrcode"> SINCRONIZAR CELULAR </Link>
						: <button type="button" onClick={logout}> SAIR </button>
				}
				{
					lateCount &&
					<>
						<span className="dividir" />
						<button id="notification" onClick={clickNotification} >
							<img src={bell} alt="Notificacão"></img>
							<span>{lateCount}</span>
						</button>
					</>
				}
			</S.RigthSide>
		</S.Container>
	);
}

export default Header;
