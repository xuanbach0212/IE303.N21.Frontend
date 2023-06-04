import { useOktaAuth } from '@okta/okta-react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ManageLibraryPage.module.scss';
import AdminMessages from './components/AdminMessages';
import AddNewBook from './components/AddNewBook';
import ChangeQuantityOfBooks from './components/ChangeQuantityOfBooks';

const cx = classNames.bind(styles);

const ManageLibraryPage = () => {
    const { authState } = useOktaAuth();

    const [changeQuantityOfBooksClick, setChangeQuantityOfBooksClick] = useState(false);
    const [messagesClick, setMessagesClick] = useState(false);

    const handleAddBookClick = () => {
        setChangeQuantityOfBooksClick(false);
        setMessagesClick(false);
    };

    const handleChangeQuantityOfBooksClick = () => {
        setChangeQuantityOfBooksClick(true);
        setMessagesClick(false);
    };

    const handleMessagesClick = () => {
        setChangeQuantityOfBooksClick(false);
        setMessagesClick(true);
    };

    if (authState?.accessToken?.claims.userType === undefined) {
        return <Redirect to="/home" />;
    }

    return (
        <div className={cx('container')}>
            <div className={cx('mt-5')}>
                <h3>Manage Library</h3>
                <nav>
                    <div className={cx('nav', 'nav-tabs')} id="nav-tab" role="tablist">
                        <button
                            onClick={handleAddBookClick}
                            className={cx('nav-link', 'active')}
                            id="nav-add-book-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-add-book"
                            type="button"
                            role="tab"
                            aria-controls="nav-add-book"
                            aria-selected="false"
                        >
                            Add new book
                        </button>
                        <button
                            onClick={handleChangeQuantityOfBooksClick}
                            className={cx('nav-link')}
                            id="nav-quantity-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-quantity"
                            type="button"
                            role="tab"
                            aria-controls="nav-quantity"
                            aria-selected="true"
                        >
                            Change quantity
                        </button>
                        <button
                            onClick={handleMessagesClick}
                            className={cx('nav-link')}
                            id="nav-messages-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-messages"
                            type="button"
                            role="tab"
                            aria-controls="nav-messages"
                            aria-selected="false"
                        >
                            Messages
                        </button>
                    </div>
                </nav>
                <div className={cx('tab-content')} id="nav-tabContent">
                    <div
                        className={cx('tab-pane', 'fade', 'show', 'active')}
                        id="nav-add-book"
                        role="tabpanel"
                        aria-labelledby="nav-add-book-tab"
                    >
                        <AddNewBook />
                    </div>
                    <div
                        className={cx('tab-pane', 'fade')}
                        id="nav-quantity"
                        role="tabpanel"
                        aria-labelledby="nav-quantity-tab"
                    >
                        {changeQuantityOfBooksClick && <ChangeQuantityOfBooks />}
                    </div>
                    <div
                        className={cx('tab-pane', 'fade')}
                        id="nav-messages"
                        role="tabpanel"
                        aria-labelledby="nav-messages-tab"
                    >
                        {messagesClick && <AdminMessages />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageLibraryPage;
