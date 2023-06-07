import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Loans.module.scss';
import { ShelfCurrentLoans } from '~/models';
import { SpinnerLoading } from '~/layouts/Utils';
import LoansModal from '../LoansModal';

const cx = classNames.bind(styles);

const Loans = () => {
    const { authState } = useOktaAuth();
    const [httpError, setHttpError] = useState(null);

    // Current Loans
    const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
    const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);
    const [checkout, setCheckout] = useState(false);

    useEffect(() => {
        const fetchUserCurrentLoans = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://54.179.229.192:8080/api/books/secure/currentloans`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                };
                const shelfCurrentLoansResponse = await fetch(url, requestOptions);
                if (!shelfCurrentLoansResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const shelfCurrentLoansResponseJson = await shelfCurrentLoansResponse.json();
                setShelfCurrentLoans(shelfCurrentLoansResponseJson);
            }
            setIsLoadingUserLoans(false);
        };
        fetchUserCurrentLoans().catch((error: any) => {
            setIsLoadingUserLoans(false);
            setHttpError(error.message);
        });
        window.scrollTo(0, 0);
    }, [authState, checkout]);

    if (isLoadingUserLoans) {
        return <SpinnerLoading />;
    }

    if (httpError) {
        return (
            <div className={cx('container', 'm-5')}>
                <p>{httpError}</p>
            </div>
        );
    }

    const returnBook = async (bookId: number) => {
        const url = `http://54.179.229.192:8080/api/books/secure/return/?bookId=${bookId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json',
            },
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setCheckout(!checkout);
    };

    const renewLoan = async (bookId: number) => {
        const url = `http://54.179.229.192:8080/api/books/secure/renew/loan/?bookId=${bookId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setCheckout(!checkout);
    };

    return (
        <div>
            {/* Desktop */}
            <div className={cx('d-none', 'd-lg-block', 'mt-2')}>
                {shelfCurrentLoans.length > 0 ? (
                    <>
                        <h5>Current Loans: </h5>

                        {shelfCurrentLoans.map((shelfCurrentLoan) => (
                            <div key={shelfCurrentLoan.book.id}>
                                <div className={cx('row', 'mt-3', 'mb-3')}>
                                    <div className={cx('col-4', 'col-md-4', 'container')}>
                                        {shelfCurrentLoan.book?.img ? (
                                            <img src={shelfCurrentLoan.book?.img} width="226" height="349" alt="Book" />
                                        ) : (
                                            <img
                                                src={require('~/Images/BooksImages/book-luv2code-1000.png')}
                                                width="226"
                                                height="349"
                                                alt="Book"
                                            />
                                        )}
                                    </div>
                                    <div className={cx('card', 'col-3', 'col-md-3', 'container', 'd-flex')}>
                                        <div className={cx('card-body')}>
                                            <div className={cx('mt-3')}>
                                                <h4>Loan Options</h4>
                                                {shelfCurrentLoan.daysLeft > 0 && (
                                                    <p className={cx('text-secondary')}>
                                                        Due in {shelfCurrentLoan.daysLeft} days.
                                                    </p>
                                                )}
                                                {shelfCurrentLoan.daysLeft === 0 && (
                                                    <p className={cx('text-success')}>Due Today.</p>
                                                )}
                                                {shelfCurrentLoan.daysLeft < 0 && (
                                                    <p className={cx('text-danger')}>
                                                        Past due by {shelfCurrentLoan.daysLeft} days.
                                                    </p>
                                                )}
                                                <div className={cx('list-group', 'mt-3')}>
                                                    <button
                                                        className={cx('list-group-item', 'list-group-item-action')}
                                                        aria-current="true"
                                                        data-bs-toggle="modal"
                                                        data-bs-target={`#modal${shelfCurrentLoan.book.id}`}
                                                    >
                                                        Manage Loan
                                                    </button>
                                                    <Link
                                                        to="/search"
                                                        className={cx('list-group-item', 'list-group-item-action')}
                                                    >
                                                        Search more books?
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr />
                                            <p className={cx('mt-3')}>
                                                Help other find their adventure by reviewing your loan.
                                            </p>
                                            <Link
                                                className={cx('btn', 'btn-primary')}
                                                to={`/checkout/${shelfCurrentLoan.book.id}`}
                                            >
                                                Leave a review
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <LoansModal
                                    shelfCurrentLoan={shelfCurrentLoan}
                                    mobile={false}
                                    returnBook={returnBook}
                                    renewLoan={renewLoan}
                                />
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <h3 className={cx('mt-3')}>Currently no loans</h3>
                        <Link className={cx('btn', 'btn-primary')} to="/search">
                            Search for a new book
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile */}
            <div className={cx('container', 'd-lg-none', 'mt-2')}>
                {shelfCurrentLoans.length > 0 ? (
                    <>
                        <h5 className={cx('mb-3')}>Current Loans: </h5>

                        {shelfCurrentLoans.map((shelfCurrentLoan) => (
                            <div key={shelfCurrentLoan.book.id}>
                                <div className={cx('d-flex', 'justify-content-center', 'align-items-center')}>
                                    {shelfCurrentLoan.book?.img ? (
                                        <img src={shelfCurrentLoan.book?.img} width="226" height="349" alt="Book" />
                                    ) : (
                                        <img
                                            src={require('~/Images/BooksImages/book-luv2code-1000.png')}
                                            width="226"
                                            height="349"
                                            alt="Book"
                                        />
                                    )}
                                </div>
                                <div className={cx('card', 'd-flex', 'mt-5', 'mb-3')}>
                                    <div className={cx('card-body', 'container')}>
                                        <div className={cx('mt-3')}>
                                            <h4>Loan Options</h4>
                                            {shelfCurrentLoan.daysLeft > 0 && (
                                                <p className={cx('text-secondary')}>
                                                    Due in {shelfCurrentLoan.daysLeft} days.
                                                </p>
                                            )}
                                            {shelfCurrentLoan.daysLeft === 0 && (
                                                <p className={cx('text-success')}>Due Today.</p>
                                            )}
                                            {shelfCurrentLoan.daysLeft < 0 && (
                                                <p className={cx('text-danger')}>
                                                    Past due by {shelfCurrentLoan.daysLeft} days.
                                                </p>
                                            )}
                                            <div className={cx('list-group', 'mt-3')}>
                                                <button
                                                    className={cx('list-group-item', 'list-group-item-action')}
                                                    aria-current="true"
                                                    data-bs-toggle="modal"
                                                    data-bs-target={`#mobilemodal${shelfCurrentLoan.book.id}`}
                                                >
                                                    Manage Loan
                                                </button>
                                                <Link
                                                    to="/search"
                                                    className={cx('list-group-item', 'list-group-item-action')}
                                                >
                                                    Search more books?
                                                </Link>
                                            </div>
                                        </div>
                                        <hr />
                                        <p className={cx('mt-3')}>
                                            Help other find their adventure by reviewing your loan.
                                        </p>
                                        <Link
                                            className={cx('btn', 'btn-primary')}
                                            to={`/checkout/${shelfCurrentLoan.book.id}`}
                                        >
                                            Leave a review
                                        </Link>
                                    </div>
                                </div>

                                <hr />
                                <LoansModal
                                    shelfCurrentLoan={shelfCurrentLoan}
                                    mobile={true}
                                    returnBook={returnBook}
                                    renewLoan={renewLoan}
                                />
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <h3 className={cx('mt-3')}>Currently no loans</h3>
                        <Link className={cx('btn', 'btn-primary')} to="/search">
                            Search for a new book
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Loans;
