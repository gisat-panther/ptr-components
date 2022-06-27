import {useEffect} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LoginOverlay from '../LoginOverlay';

const AppContainer = ({
	activeUser,
	loginRequired,
	light,
	dark,
	onLoginOverlayClose,
	onMount,
	loginOverlayOpen,
	onLogIn,
	children,
	appKey,
}) => {
	useEffect(() => {
		if (typeof onMount === 'function') {
			onMount();
		}
	}, []);

	const renderLoginOverlay = () => {
		if (loginOverlayOpen) {
			return (
				<LoginOverlay onLogin={onLogIn} onClose={onLoginOverlayClose} opening />
			);
		} else {
			return null;
		}
	};

	const renderContent = () => {
		let loginOverlay = renderLoginOverlay();

		if (loginRequired && !activeUser) {
			return <LoginOverlay open loginRequired onLogin={onLogIn} />;
		} else {
			return (
				<>
					{loginOverlay}
					{children}
				</>
			);
		}
	};

	let classes = classNames(appKey, {
		'ptr-light': light || !dark,
		'ptr-dark': dark,
	});

	return (
		<div id="ptr-app" key="ptr-app" className={classes}>
			{renderContent()}
		</div>
	);
};

AppContainer.propTypes = {
	appKey: PropTypes.string,
	activeUser: PropTypes.object,
	loginRequired: PropTypes.bool,
	light: PropTypes.bool,
	dark: PropTypes.bool,

	onLoginOverlayClose: PropTypes.func,
	onMount: PropTypes.func,
	children: PropTypes.node,
	loginOverlayOpen: PropTypes.bool,
	onLogIn: PropTypes.func,
};

export default AppContainer;
