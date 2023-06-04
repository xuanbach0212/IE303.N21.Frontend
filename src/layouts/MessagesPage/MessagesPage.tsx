import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './MessagesPage.module.scss';
import PostNewMessage from './components/PostNewMessage';
import Messages from './components/Messages';

const cx = classNames.bind(styles);

const MessagesPage = () => {
    const [messagesClick, setMessagesClick] = useState(false);

    return (
        <div className={cx('container')}>
            <div className={cx('mt-3', 'mb-2')}>
                <nav>
                    <div className={cx('nav', 'nav-tabs')} id="nav-tab" role="tablist">
                        <button
                            onClick={() => setMessagesClick(false)}
                            className={cx('nav-link', 'active')}
                            id="nav-send-message-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-send-message"
                            type="button"
                            role="tab"
                            aria-controls="nav-send-message"
                            aria-selected="true"
                        >
                            Submit Question
                        </button>
                        <button
                            onClick={() => setMessagesClick(true)}
                            className={cx('nav-link')}
                            id="nav-message-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-message"
                            type="button"
                            role="tab"
                            aria-controls="nav-message"
                            aria-selected="false"
                        >
                            Q/A Response/Pending
                        </button>
                    </div>
                </nav>
                <div className={cx('tab-content')} id="nav-tabContent">
                    <div
                        className={cx('tab-pane', 'fade', 'show', 'active')}
                        id="nav-send-message"
                        role="tabpanel"
                        aria-labelledby="nav-send-message-tab"
                    >
                        <PostNewMessage />
                    </div>
                    <div
                        className={cx('tab-pane', 'fade')}
                        id="nav-message"
                        role="tabpanel"
                        aria-labelledby="nav-message-tab"
                    >
                        {messagesClick && <Messages />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;
