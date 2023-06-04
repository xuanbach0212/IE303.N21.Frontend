import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './CheckoutAndReview.module.scss';
import { BookModel } from '~/models';
import { LeaveAReview } from '~/layouts/Utils';

const cx = classNames.bind(styles);

const CheckoutAndReviewBox: React.FC<{
    book: BookModel | undefined;
    mobile: boolean;
    currentLoansCount: number;
    isAuthenticated: any;
    isCheckedOut: boolean;
    checkoutBook: any;
    isReviewLeft: boolean;
    submitReview: any;
}> = ({ book, mobile, currentLoansCount, isAuthenticated, isCheckedOut, checkoutBook, isReviewLeft, submitReview }) => {
    const buttonRender = () => {
        if (isAuthenticated) {
            if (!isCheckedOut && currentLoansCount < 5) {
                return (
                    <button className={cx('btn', 'btn-success', 'btn-lg')} onClick={() => checkoutBook()}>
                        Checkout
                    </button>
                );
            } else if (isCheckedOut) {
                return (
                    <p>
                        <b>Book checked out. Enjoy!</b>
                    </p>
                );
            } else if (!isCheckedOut) {
                return <p className={cx('text-danger')}>Too many books checked out.</p>;
            }
        }
        return (
            <Link to={'/login'} className={cx('btn', 'btn-success', 'btn-lg')}>
                Sign in
            </Link>
        );
    };

    const reviewRender = () => {
        if (isAuthenticated && !isReviewLeft) {
            return (
                <p>
                    <LeaveAReview submitReview={submitReview} />
                </p>
            );
        } else if (isAuthenticated && isReviewLeft) {
            return (
                <p>
                    <b>Thank you for your review!</b>
                </p>
            );
        }
        return (
            <div>
                <hr />
                <p>Sign in to be able to leave a review.</p>
            </div>
        );
    };

    return (
        <div className={cx('card', 'd-flex', mobile ? 'mt-5' : 'col-3', 'container', 'mb-5')}>
            <div className={cx('card-body', 'container')}>
                <div className={cx('mt-3')}>
                    <p>
                        <b>{currentLoansCount}/5 </b>
                        books checked out
                    </p>
                </div>
                <hr />
                {book && book.copiesAvailable && book.copiesAvailable > 0 ? (
                    <h4 className={cx('text-success')}>Available</h4>
                ) : (
                    <h4 className={cx('text-danger')}>Wait List</h4>
                )}
                <div className={cx('row')}>
                    <p className={cx('col-6', 'lead')}>
                        <b>{book?.copies} </b>
                        copies
                    </p>
                    <p className={cx('col-6', 'lead')}>
                        <b>{book?.copiesAvailable} </b>
                        available
                    </p>
                </div>
                {buttonRender()}
                <hr />
                <p className={cx('mt-3')}>This number can change until placing order has been complete.</p>
                {reviewRender()}
            </div>
        </div>
    );
};

export default CheckoutAndReviewBox;
