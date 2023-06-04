import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ExploreTopBooks.module.scss';

const cx = classNames.bind(styles);

const ExploreTopBooks = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('p-5', 'mb-4', 'bg-dark', 'header')}>
                <div
                    className={cx(
                        'container-fluid',
                        'py-5',
                        'text-white',
                        'd-flex',
                        'justify-content-center',
                        'align-items-center',
                    )}
                >
                    <div>
                        <h1 className={cx('display-5', 'fw-bold')}>Find your next adventure</h1>
                        <p className={cx('display-5', 'fw-bold')}>Where would you like to go next?</p>
                        <Link type="button" className={cx('btn', 'main-color btn-lg', 'text-white')} to="/search">
                            Explore top books
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreTopBooks;
