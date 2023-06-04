import classNames from 'classnames/bind';
import styles from './LoansModal.module.scss';
import { ShelfCurrentLoans } from '~/models';

const cx = classNames.bind(styles);

const LoansModal: React.FC<{
    shelfCurrentLoan: ShelfCurrentLoans;
    mobile: boolean;
    returnBook: any;
    renewLoan: any;
}> = ({ shelfCurrentLoan, mobile, returnBook, renewLoan }) => {
    return (
        <div
            className={cx('modal', 'fade')}
            id={mobile ? `mobilemodal${shelfCurrentLoan.book.id}` : `modal${shelfCurrentLoan.book.id}`}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
            key={shelfCurrentLoan.book.id}
        >
            <div className={cx('modal-dialog')}>
                <div className={cx('modal-content')}>
                    <div className={cx('modal-header')}>
                        <h5 className={cx('modal-title')} id="staticBackdropLabel">
                            Loan Options
                        </h5>
                        <button
                            type="button"
                            className={cx('btn-close')}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className={cx('modal-body')}>
                        <div className={cx('container')}>
                            <div className={cx('mt-3')}>
                                <div className={cx('row')}>
                                    <div className={cx('col-2')}>
                                        {shelfCurrentLoan.book?.img ? (
                                            <img src={shelfCurrentLoan.book?.img} width="56" height="87" alt="Book" />
                                        ) : (
                                            <img
                                                src={require('~/Images/BooksImages/book-luv2code-1000.png')}
                                                width="56"
                                                height="87"
                                                alt="Book"
                                            />
                                        )}
                                    </div>
                                    <div className={cx('col-10')}>
                                        <h6>{shelfCurrentLoan.book.author}</h6>
                                        <h4>{shelfCurrentLoan.book.title}</h4>
                                    </div>
                                </div>
                                <hr />
                                {shelfCurrentLoan.daysLeft > 0 && (
                                    <p className={cx('text-secondary')}>Due in {shelfCurrentLoan.daysLeft} days.</p>
                                )}
                                {shelfCurrentLoan.daysLeft === 0 && <p className={cx('text-success')}>Due Today.</p>}
                                {shelfCurrentLoan.daysLeft < 0 && (
                                    <p className={cx('text-danger')}>Past due by {shelfCurrentLoan.daysLeft} days.</p>
                                )}
                                <div className={cx('list-group', 'mt-3')}>
                                    <button
                                        onClick={() => returnBook(shelfCurrentLoan.book.id)}
                                        data-bs-dismiss="modal"
                                        className={cx('list-group-item', 'list-group-item-action')}
                                        aria-current="true"
                                    >
                                        Return Book
                                    </button>
                                    <button
                                        onClick={
                                            shelfCurrentLoan.daysLeft < 0
                                                ? (event) => event.preventDefault()
                                                : () => renewLoan(shelfCurrentLoan.book.id)
                                        }
                                        data-bs-dismiss="modal"
                                        className={cx(
                                            'list-group-item',
                                            'list-group-item-action',
                                            shelfCurrentLoan.daysLeft < 0 && 'inactiveLink',
                                        )}
                                    >
                                        {shelfCurrentLoan.daysLeft < 0
                                            ? 'Late dues cannot be renewed'
                                            : 'Renew loan for 7 days'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('modal-footer')}>
                        <button type="button" className={cx('btn', 'btn-secondary')} data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoansModal;
