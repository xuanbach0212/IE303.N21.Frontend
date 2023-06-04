import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Utils.module.scss';
import StarsReview from './StarsReview';

const cx = classNames.bind(styles);

const LeaveAReview: React.FC<{ submitReview: any }> = ({ submitReview }) => {
    const [starInput, setStarInput] = useState(0);
    const [displayInput, setDisplayInput] = useState(false);
    const [reviewDescription, setReviewDescription] = useState('');

    function starValue(value: number) {
        setStarInput(value);
        setDisplayInput(true);
    }

    return (
        <div className={cx('dropdown', 'cursor-pointer')}>
            <h5 className={cx('dropdown-toggle')} id="dropdownMenuButton1" data-bs-toggle="dropdown">
                Leave a review?
            </h5>
            <ul id="submitReviewRating" className={cx('dropdown-menu')} aria-labelledby="dropdownMenuButton1">
                <li>
                    <button onClick={() => starValue(0)} className={cx('dropdown-item')}>
                        0 star
                    </button>
                </li>
                <li>
                    <button onClick={() => starValue(0.5)} className={cx('dropdown-item')}>
                        .5 star
                    </button>
                </li>
                <li>
                    <button onClick={() => starValue(1)} className={cx('dropdown-item')}>
                        1 star
                    </button>
                </li>
                <li>
                    <button onClick={() => starValue(1.5)} className={cx('dropdown-item')}>
                        1.5 star
                    </button>
                </li>
                <li>
                    <button onClick={() => starValue(2)} className={cx('dropdown-item')}>
                        2 star
                    </button>
                </li>
                <li>
                    <button onClick={() => starValue(2.5)} className={cx('dropdown-item')}>
                        2.5 star
                    </button>
                </li>
                <li>
                    <button onClick={() => starValue(3)} className={cx('dropdown-item')}>
                        3 star
                    </button>
                </li>
                <li>
                    <button onClick={() => starValue(3.5)} className={cx('dropdown-item')}>
                        3.5 star
                    </button>
                </li>
                <li>
                    <button onClick={() => starValue(4)} className={cx('dropdown-item')}>
                        4 star
                    </button>
                </li>
                <li>
                    <button onClick={() => starValue(4.5)} className={cx('dropdown-item')}>
                        4.5 star
                    </button>
                </li>
                <li>
                    <button onClick={() => starValue(5)} className={cx('dropdown-item')}>
                        5 star
                    </button>
                </li>
            </ul>
            <StarsReview rating={starInput} size={32} />

            {displayInput && (
                <form method="POST" action="#">
                    <hr />

                    <div className={cx('mb-3')}>
                        <label className={cx('form-label')}>Description</label>
                        <textarea
                            className={cx('form-control')}
                            id="submitReviewDescription"
                            placeholder="Optional"
                            rows={3}
                            onChange={(e) => setReviewDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={() => submitReview(starInput, reviewDescription)}
                            className={cx('btn', 'btn-primary', 'mt-3')}
                        >
                            Submit Review
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default LeaveAReview;
