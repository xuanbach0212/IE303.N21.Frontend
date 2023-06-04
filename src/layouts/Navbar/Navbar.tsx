import { Link, NavLink } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';
import { SpinnerLoading } from '../Utils';

const cx = classNames.bind(styles);

const Navbar = () => {
    const { oktaAuth, authState } = useOktaAuth();

    if (!authState) {
        return <SpinnerLoading />;
    }

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to log out?')) {
            oktaAuth.signOut();
        }
    };

    console.log(authState.accessToken);

    return (
        <div className={cx('wrapper')}>
            <nav className={cx('navbar', 'navbar-expand-lg', 'navbar-dark', 'main-color', 'py-3')}>
                <div className={cx('container-fluid')}>
                    <span className={cx('navbar-brand')}>VNLibrary</span>
                    <button
                        className={cx('navbar-toggler')}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle Navigation"
                    >
                        <span className={cx('navbar-toggler-icon')}></span>
                    </button>
                    <div className={cx('collapse', 'navbar-collapse')} id="navbarNavDropdown">
                        <ul className={cx('navbar-nav')}>
                            <li className={cx('nav-item')}>
                                <NavLink className={cx('nav-link')} to="/home">
                                    Home
                                </NavLink>
                            </li>
                            <li className={cx('nav-item')}>
                                <NavLink className={cx('nav-link')} to="/search">
                                    Search Books
                                </NavLink>
                            </li>
                            {authState.isAuthenticated && (
                                <>
                                    <li className={cx('nav-item')}>
                                        <NavLink className={cx('nav-link')} to="/shelf">
                                            Shelf
                                        </NavLink>
                                    </li>
                                    <li className={cx('nav-item')}>
                                        <NavLink className={cx('nav-link')} to="/messages">
                                            Library Service
                                        </NavLink>
                                    </li>
                                </>
                            )}
                            {authState.accessToken?.claims.userType === 'admin' && (
                                <NavLink className={cx('nav-link')} to="/admin">
                                    Admin
                                </NavLink>
                            )}
                        </ul>
                        <ul className={cx('navbar-nav', 'ms-auto')}>
                            <li className={cx('nav-item', 'm-1')}>
                                {authState.isAuthenticated ? (
                                    <button className={cx('btn', 'btn-outline-light')} onClick={handleLogout}>
                                        Log out
                                    </button>
                                ) : (
                                    <Link type="button" className={cx('btn', 'btn-outline-light')} to="/login">
                                        Sign in
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
