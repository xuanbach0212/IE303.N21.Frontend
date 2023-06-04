import classNames from 'classnames/bind';
import styles from './Utils.module.scss';
import { ReviewModel } from '~/models';
import StarsReview from './StarsReview';

const cx = classNames.bind(styles);

const Review: React.FC<{ review: ReviewModel }> = ({ review }) => {
    const date = new Date(review.date);

    const longMonth = date.toLocaleString('en-us', { month: 'long' });
    const dateDay = date.getDate();
    const dateYear = date.getFullYear();

    const dateRender = longMonth + ' ' + dateDay + ', ' + dateYear;

    return (
        <div>
            <div className={cx('col-sm-8', 'col-md-8')}>
                <h5>{review.userEmail}</h5>
                <div className={cx('row')}>
                    <div className={cx('col')}>{dateRender}</div>
                    <div className={cx('col')}>
                        <StarsReview rating={review.rating} size={16} />
                    </div>
                </div>
                <div className={cx('mt-2')}>
                    <p>{review.reviewDescription}</p>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default Review;
