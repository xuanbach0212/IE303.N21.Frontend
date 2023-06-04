import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './LastestReviews.module.scss';
import { ReviewModel } from '~/models';
import { Review } from '~/layouts/Utils';

const cx = classNames.bind(styles);

const LatestReviews: React.FC<{
    reviews: ReviewModel[];
    bookId: number | undefined;
    mobile: boolean;
}> = ({ reviews, bookId, mobile }) => {
    return (
        <div className={cx(mobile ? 'mt-3' : 'row mt-5', 'mb-3')}>
            <div className={cx(!mobile && 'col-sm-2', 'col-md-2')}>
                <h2>Latest Reviews: </h2>
            </div>
            <div className={cx('col-sm-10', 'col-md-10')}>
                {reviews.length > 0 ? (
                    <>
                        {reviews.slice(0, 3).map((eachReview) => (
                            <Review review={eachReview} key={eachReview.id} />
                        ))}

                        <div className={cx('m-3')}>
                            <Link
                                type="button"
                                className={cx('btn', 'main-color', 'btn-md', 'text-white')}
                                to={`/reviewlist/${bookId}`}
                            >
                                Reach all reviews.
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className={cx('m-3')}>
                        <p className={cx('lead')}>Currently there are no reviews for this book</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LatestReviews;
