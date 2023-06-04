import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './LibraryServices.module.scss';

const cx = classNames.bind(styles);

const LibraryServices = () => {
    const { authState } = useOktaAuth();

    return (
        <div>
            <div className={cx('container', 'my-5')}>
                <div className={cx('row', 'p-4', 'align-items-center', 'border', 'shadow-lg')}>
                    <div className={cx('col-lg-7', 'p-3')}>
                        <h1 className={cx('display-4', 'fw-bold')}>Can't find what you are looking for?</h1>
                        <p className={cx('lead')}>
                            If you cannot find what you are looking for, send our library admin's a personal message!
                        </p>
                        <div className={cx('d-grid', 'gap-2', 'justify-content-md-start', 'mb-4', 'mb-lg-3')}>
                            {authState?.isAuthenticated ? (
                                <Link
                                    className={cx(
                                        'btn',
                                        'main-color',
                                        'btn-lg',
                                        'px-4',
                                        'me-md-2',
                                        'fw-bold',
                                        'text-white',
                                    )}
                                    to="/messages"
                                >
                                    Library Services
                                </Link>
                            ) : (
                                <Link className={cx('btn', 'main-color', 'btn-lg', 'text-white')} to="/login">
                                    Sign up
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className={cx('col-lg-4', 'offset-lg-1', 'shadow-lg', 'lost-image')}></div>
                </div>
            </div>
        </div>
    );
};

export default LibraryServices;
