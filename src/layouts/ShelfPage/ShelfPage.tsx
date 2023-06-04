import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ShelfPage.module.scss';
import Loans from './components/Loans';
import HistoryTab from './components/HistoryTab';

const cx = classNames.bind(styles);

const ShelfPage = () => {
    const [historyClick, setHistoryClick] = useState(false);

    return (
        <div className={cx('container')}>
            <div className={cx('mt-3')}>
                <nav>
                    <div className={cx('nav', 'nav-tabs')} id="nav-tab" role="tablist">
                        <button
                            onClick={() => setHistoryClick(false)}
                            className={cx('nav-link', 'active')}
                            id="nav-loans-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-loans"
                            type="button"
                            role="tab"
                            aria-controls="nav-loans"
                            aria-selected="true"
                        >
                            Loans
                        </button>
                        <button
                            onClick={() => setHistoryClick(true)}
                            className={cx('nav-link')}
                            id="nav-history-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-history"
                            type="button"
                            role="tab"
                            aria-controls="nav-history"
                            aria-selected="false"
                        >
                            Your History
                        </button>
                    </div>
                </nav>
                <div className={cx('tab-content')} id="nav-tabContent">
                    <div
                        className={cx('tab-pane', 'fade', 'show', 'active')}
                        id="nav-loans"
                        role="tabpanel"
                        aria-labelledby="nav-loans-tab"
                    >
                        <Loans />
                    </div>
                    <div
                        className={cx('tab-pane', 'fade')}
                        id="nav-history"
                        role="tabpanel"
                        aria-labelledby="nav-history-tab"
                    >
                        {historyClick && <HistoryTab />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShelfPage;
