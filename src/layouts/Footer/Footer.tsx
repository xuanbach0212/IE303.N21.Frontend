import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer = () => {
    const { authState } = useOktaAuth();

    return (
        <div className={cx('wrapper', 'main-color')}>
            <footer
                className={cx(
                    'container',
                    'd-flex',
                    'flex-wrap',
                    'justify-content-between',
                    'align-items-center',
                    'py-5',
                    'main-color',
                )}
            >
                <p className={cx('col-md-4', 'mb-0', 'text-white')}>© Example Library App, Inc</p>
                <ul className={cx('nav', 'navbar-dark', 'col-md-4', 'justify-content-end')}>
                    <li className={cx('nav-item')}>
                        <Link className={cx('nav-link', 'px-2', 'text-white')} to="/home">
                            Home
                        </Link>
                    </li>
                    <li className={cx('nav-item')}>
                        <Link className={cx('nav-link', 'px-2', 'text-white')} to="/search">
                            Search Books
                        </Link>
                    </li>
                    {authState?.isAuthenticated && (
                        <>
                            <li className={cx('nav-item')}>
                                <Link className={cx('nav-link', 'px-2', 'text-white')} to="/shelf">
                                    Shelf
                                </Link>
                            </li>
                            <li className={cx('nav-item')}>
                                <Link className={cx('nav-link', 'px-2', 'text-white')} to="/messages">
                                    Library Service
                                </Link>
                            </li>
                        </>
                    )}
                    {authState?.accessToken?.claims.userType === 'admin' && (
                        <Link className={cx('nav-link', 'px-2', 'text-white')} to="/admin">
                            Admin
                        </Link>
                    )}
                </ul>
            </footer>
        </div>
    );
};

export default Footer;
