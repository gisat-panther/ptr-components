import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

import {Button, Input} from '@gisatcz/ptr-atoms';
import {withNamespaces} from '@gisatcz/ptr-locales';

const LoginOverlay = ({onClose, onLogin, open, opening, loginRequired, t}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [openState, setOpen] = useState(false);

	useEffect(() => {
		if (opening) {
			setTimeout(() => {
				setOpen(true);
			}, 10);
		}
	}, []);

	const onChangeEmail = value => {
		setEmail(value);
	};

	const onChangePassword = value => {
		setPassword(value);
	};

	const closeOverlay = () => {
		setOpen(false);

		if (onClose) {
			setTimeout(() => {
				onClose();
			}, 350);
		}
	};

	const login = () => {
		onLogin(email, password);
		closeOverlay();
	};

	const cancel = () => {
		closeOverlay();
	};

	return (
		<div
			className={classNames('ptr-login-overlay', {
				open: openState || open,
			})}
		>
			<div className="ptr-login">
				<div>
					<Input
						inverted
						email
						transparent
						placeholder="E-mail"
						onChange={onChangeEmail}
						value={email}
					/>
				</div>
				<div>
					<Input
						inverted
						password
						transparent
						placeholder={t('user.passphrase')}
						onChange={onChangePassword}
						value={password}
					/>
				</div>
				<div>
					<Button primary onClick={login}>
						{t('user.login')}
					</Button>
					{!loginRequired ? (
						<Button invisible inverted onClick={cancel}>
							{t('cancelCapitalized')}
						</Button>
					) : null}
				</div>
			</div>
		</div>
	);
};

LoginOverlay.propTypes = {
	onClose: PropTypes.func,
	onLogin: PropTypes.func,
	open: PropTypes.bool,
	opening: PropTypes.bool,
	loginRequired: PropTypes.bool,
	t: PropTypes.func,
};

export default withNamespaces(['common'])(LoginOverlay);
