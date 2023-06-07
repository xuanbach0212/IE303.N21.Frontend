import { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import classNames from 'classnames/bind';

import styles from './ChangeQuantityOfBooks.module.scss';
import { BookModel } from '~/models';

const cx = classNames.bind(styles);

export const ChangeQuantityOfBook: React.FC<{ book: BookModel; deleteBook: any }> = ({ book, deleteBook }) => {
    const { authState } = useOktaAuth();
    const [quantity, setQuantity] = useState<number>(0);
    const [remaining, setRemaining] = useState<number>(0);
    const [adjustQuantity, setAdjustQuantity] = useState<number>(0);
    const [isValidAdjust, setIsValidAdjust] = useState<boolean>(true);

    useEffect(() => {
        const fetchBookInState = () => {
            book.copies ? setQuantity(book.copies) : setQuantity(0);
            book.copiesAvailable ? setRemaining(book.copiesAvailable) : setRemaining(0);
        };
        fetchBookInState();
    }, [book.copies, book.copiesAvailable]);

    const increaseQuantity = async () => {
        const url = `https://54.179.229.192:8080/api/admin/secure/increase/book/quantity/?bookId=${book?.id}&n=${adjustQuantity}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if (!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setQuantity(quantity + adjustQuantity);
        setRemaining(remaining + adjustQuantity);
        setIsValidAdjust(true);
    };

    const decreaseQuantity = async () => {
        if (adjustQuantity > remaining) {
            setIsValidAdjust(false);
        } else {
            const url = `https://54.179.229.192:8080/api/admin/secure/decrease/book/quantity/?bookId=${book?.id}&n=${adjustQuantity}`;
            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json',
                },
            };

            const quantityUpdateResponse = await fetch(url, requestOptions);
            if (!quantityUpdateResponse.ok) {
                throw new Error('Something went wrong!');
            }
            setQuantity(quantity - adjustQuantity);
            setRemaining(remaining - adjustQuantity);
            setIsValidAdjust(true);
        }
    };

    const handleDeleteBook = async () => {
        if (window.confirm(`Are you sure you want to delete book '${book.title}'?`)) {
            const url = `https://54.179.229.192:8080/api/admin/secure/delete/book/?bookId=${book?.id}`;
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json',
                },
            };

            const updateResponse = await fetch(url, requestOptions);
            if (!updateResponse.ok) {
                throw new Error('Something went wrong!');
            }
            deleteBook();
        }
    };

    return (
        <div className={cx('card', 'mt-3', 'shadow', 'p-3', 'mb-3', 'bg-body', 'rounded')}>
            <div className={cx('row', 'g-0')}>
                <div className={cx('col-md-2')}>
                    <div className={cx('d-none', 'd-lg-block')}>
                        {book.img ? (
                            <img src={book.img} width="123" height="196" alt="Book" />
                        ) : (
                            <img
                                src={require('~/Images/BooksImages/book-luv2code-1000.png')}
                                width="123"
                                height="196"
                                alt="Book"
                            />
                        )}
                    </div>
                    <div className={cx('d-lg-none', 'd-flex', 'justify-content-center', 'align-items-center')}>
                        {book.img ? (
                            <img src={book.img} width="123" height="196" alt="Book" />
                        ) : (
                            <img
                                src={require('~/Images/BooksImages/book-luv2code-1000.png')}
                                width="123"
                                height="196"
                                alt="Book"
                            />
                        )}
                    </div>
                </div>
                <div className={cx('col-md-6')}>
                    <div className={cx('card-body')}>
                        <h5 className={cx('card-title')}>{book.author}</h5>
                        <h4>{book.title}</h4>
                        <p className={cx('card-text')}> {book.description} </p>
                    </div>
                </div>
                <div className={cx('mt-3', 'col-md-4')}>
                    <div className={cx('d-flex', 'justify-content-center', 'align-items-center')}>
                        <p>
                            Total Quantity: <b>{quantity}</b>
                        </p>
                    </div>
                    <div className={cx('d-flex', 'justify-content-center', 'align-items-center')}>
                        <p>
                            Books Remaining: <b>{remaining}</b>
                        </p>
                    </div>
                    <div className={cx('m-3', 'ps-5', 'pe-5')}>
                        <label className={cx('form-label')}> Quantity of book to add or decrease </label>
                        <input
                            type="number"
                            className={cx('form-control')}
                            name="adjust quatity"
                            min={0}
                            required
                            onChange={(e) => setAdjustQuantity(Number(e.target.value))}
                            value={adjustQuantity}
                        />
                        {!isValidAdjust && <p className={cx('text-danger')}>Invalid change</p>}
                    </div>
                    <div className={cx('d-flex', 'justify-content-center', 'align-items-center')}>
                        <button
                            className={cx('m-1', 'btn', 'btn-md', 'main-color', 'text-white')}
                            onClick={increaseQuantity}
                        >
                            Add Quantity
                        </button>
                    </div>
                    <div className={cx('d-flex', 'justify-content-center', 'align-items-center')}>
                        <button className={cx('m-1', 'btn', 'btn-md', 'btn-warning')} onClick={decreaseQuantity}>
                            Decrease Quantity
                        </button>
                    </div>
                </div>
                <div className={cx('mt-3', 'col-md-1')}>
                    <div className={cx('d-flex', 'justify-content-start')}>
                        <button className={cx('m-1', 'btn', 'btn-md', 'btn-danger')} onClick={handleDeleteBook}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
