import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SearchBook.module.scss';
import { BookModel } from '~/models';

const cx = classNames.bind(styles);

const SearchBook: React.FC<{ book: BookModel }> = ({ book }) => {
    return (
        <div className={cx('card', 'mt-3', 'shadow', 'p-3', 'mb-3', 'bg-body', 'rounded')}>
            <div className={cx('row', 'g-0')}>
                <div className={cx('col-md-2')}>
                    {/* Image for Desktop */}
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
                    {/* Image for Mobile */}
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
                        <p className={cx('card-text')}>{book.description}</p>
                    </div>
                </div>
                <div className={cx('col-md-4', 'd-flex', 'justify-content-center', 'align-items-center')}>
                    <Link className={cx('btn', 'btn-md', 'main-color', 'text-white')} to={`/checkout/${book.id}`}>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SearchBook;
