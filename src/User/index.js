import {useEffect} from 'react';
import PropTypes from 'prop-types';

import './style.scss';

import {Button} from '@gisatcz/ptr-atoms';
import {Menu, MenuItem} from '@gisatcz/ptr-atoms';
import {withNamespaces} from '@gisatcz/ptr-locales';

const User = ({user, inverted, logout, onMount, t, login}) => {
	useEffect(() => {
		if (typeof onMount === 'function') {
			onMount();
		}
	}, []);

	if (user) {
		let name = user.data.name || user.data.email;

		return (
			<div className="ptr-user">
				<div className="ptr-user-image"></div>
				<div className="ptr-user-name">{name}</div>
				<div className="ptr-user-options">
					<Button onClick={() => {}} icon="dots" invisible inverted={inverted}>
						<Menu bottom left>
							<MenuItem onClick={logout}>{t('user.logout')}</MenuItem>
						</Menu>
					</Button>
				</div>
			</div>
		);
	} else {
		// It means render another component.
		return (
			<div className="ptr-user">
				<div className="ptr-user-login">
					<Button invisible inverted={inverted} onClick={login}>
						{t('user.login')}
					</Button>
				</div>
			</div>
		);
	}
};

User.propTypes = {
	user: PropTypes.object,
	inverted: PropTypes.bool,
	onMount: PropTypes.func,
	logout: PropTypes.func,
	login: PropTypes.func,
	t: PropTypes.func,
};

export default withNamespaces()(User);
