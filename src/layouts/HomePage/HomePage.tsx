import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import ExploreTopBooks from './components/ExploreTopBooks';
import Carousel from './components/Carousel';
import Heros from './components/Heros';
import LibraryServices from './components/LibraryServices';

const cx = classNames.bind(styles);

const HomePage = () => {
    return (
        <div className={cx('wrapper')}>
            <ExploreTopBooks />
            <Carousel />
            <Heros />
            <LibraryServices />
        </div>
    );
};

export default HomePage;
