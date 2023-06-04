import classNames from 'classnames/bind';
import styles from './Utils.module.scss';

const cx = classNames.bind(styles);

const Pagination: React.FC<{ currentPage: number; totalPages: number; paginate: any }> = ({
    currentPage,
    totalPages,
    paginate,
}) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

    return (
        <nav aria-label="...">
            <ul className={cx('pagination')}>
                <li className={cx('page-item')} onClick={() => paginate(1)}>
                    <button className={cx('page-link')}>First Page</button>
                </li>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        onClick={() => paginate(number)}
                        className={cx('page-item ', currentPage === number && 'active')}
                    >
                        <button className={cx('page-link')}>{number}</button>
                    </li>
                ))}
                <li className={cx('page-item')} onClick={() => paginate(totalPages)}>
                    <button className={cx('page-link')}>Last Page</button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
