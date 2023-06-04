import classNames from 'classnames/bind';
import styles from './ReturnBook.module.scss';
import BookModel from '~/models/BookModel';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ReturnBook: React.FC<{ book: BookModel }> = ({ book }) => {
    return (
        <div className={cx('wrapper', 'col-xs-6', 'col-sm-6 col-md-4', 'col-lg-3', 'mb-3')}>
            <div className={cx('text-center')}>
                {book.img ? (
                    <img src={book.img} width="151" height="233" alt="book" />
                ) : (
                    <img
                        src={require('~/Images/BooksImages/book-luv2code-1000.png')}
                        width="151"
                        height="233"
                        alt="book"
                    />
                )}
                <h6 className={cx('mt-2')}>{book.title}</h6>
                <p>{book.author}</p>
                <Link className={cx('btn', 'main-color', 'text-white')} to={`/checkout/${book.id}`}>
                    Reserve
                </Link>
            </div>
        </div>
    );
};

export default ReturnBook;
