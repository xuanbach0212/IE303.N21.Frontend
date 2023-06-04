import classNames from 'classnames/bind';
import styles from './Utils.module.scss';

const cx = classNames.bind(styles);

const SpinnerLoading = () => {
    return (
        <div className={cx('container', 'm-5', 'd-flex', 'justify-content-center', 'spinner-wrapper')}>
            <div className={cx('spinner-border', 'text-primary')} role="status">
                <span className={cx('visually-hidden')}>Loading...</span>
            </div>
        </div>
    );
};

export default SpinnerLoading;
