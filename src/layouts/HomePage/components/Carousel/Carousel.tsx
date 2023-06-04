import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Carousel.module.scss';
import { BookModel } from '~/models';
import ReturnBook from '../ReturnBook';
import { SpinnerLoading } from '~/layouts/Utils';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Carousel = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = `http://54.255.135.69:8080/api/books`;

            const url: string = `${baseUrl}?page=0&size=9`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.books;

            const loadedBooks: BookModel[] = [];

            for (const key in responseData) {
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img,
                });
            }

            setBooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (isLoading) {
        return <SpinnerLoading />;
    }

    if (httpError) {
        return (
            <div className={cx('container', 'm-5')}>
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'mt-5')} style={{ height: 550 }}>
                <div className={cx('homepage-carousel-title')}>
                    <h3>Find your next "I stayed up too late reading" book.</h3>
                </div>
                <div
                    id="carouselExampleControls"
                    className={cx('carousel', 'carousel-dark', 'slide', 'mt-5', 'd-none', 'd-lg-block')}
                    data-bs-interval="false"
                >
                    {/* Desktop */}
                    <div className={cx('carousel-inner')}>
                        <div className={cx('carousel-item', 'active')}>
                            <div className={cx('row', 'd-flex', 'justify-content-center', 'align-items-center')}>
                                {books.slice(0, 3).map((book) => (
                                    <ReturnBook book={book} key={book.id} />
                                ))}
                            </div>
                        </div>
                        <div className={cx('carousel-item')}>
                            <div className={cx('row', 'd-flex', 'justify-content-center', 'align-items-center')}>
                                {books.slice(3, 6).map((book) => (
                                    <ReturnBook book={book} key={book.id} />
                                ))}
                            </div>
                        </div>
                        <div className={cx('carousel-item')}>
                            <div className={cx('row', 'd-flex', 'justify-content-center', 'align-items-center')}>
                                {books.slice(6, 9).map((book) => (
                                    <ReturnBook book={book} key={book.id} />
                                ))}
                            </div>
                        </div>
                        <button
                            className={cx('carousel-control-prev')}
                            type="button"
                            data-bs-target="#carouselExampleControls"
                            data-bs-slide="prev"
                        >
                            <span className={cx('carousel-control-prev-icon')} aria-hidden="true"></span>
                            <span className={cx('visually-hidden')}>Previous</span>
                        </button>
                        <button
                            className={cx('carousel-control-next')}
                            type="button"
                            data-bs-target="#carouselExampleControls"
                            data-bs-slide="next"
                        >
                            <span className={cx('carousel-control-next-icon')} aria-hidden="true"></span>
                            <span className={cx('visually-hidden')}>Next</span>
                        </button>
                    </div>
                </div>

                {/* Mobile */}
                <div className={cx('d-lg-none', 'mt-3')}>
                    <div className={cx('row', 'd-flex', 'justify-content-center', 'align-items-center')}>
                        <ReturnBook book={books[7]} key={books[7].id} />
                    </div>
                </div>
                <div className={cx('homepage-carousel-title', 'mt-3')}>
                    <Link className={cx('btn', 'btn-outline-secondary', 'btn-lg')} to="/search">
                        View More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
