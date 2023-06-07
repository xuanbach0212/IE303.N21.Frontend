import { useOktaAuth } from '@okta/okta-react';
import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './AddNewBook.module.scss';
import { AddBookRequest } from '~/models';

const cx = classNames.bind(styles);

const AddNewBook = () => {
    const { authState } = useOktaAuth();

    // New Book
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [copies, setCopies] = useState(0);
    const [category, setCategory] = useState('Category');
    const [selectedImage, setSelectedImage] = useState<any>(null);

    // Displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    const categoryField = (value: string) => {
        setCategory(value);
    };

    const base64ConversionForImages = async (e: any) => {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    };

    const getBase64 = (file: any) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSelectedImage(reader.result);
        };
        reader.onerror = (error) => {
            console.log('Error', error);
        };
    };

    const submitNewBook = async () => {
        const url = `http://54.179.229.192:8080/api/admin/secure/add/book`;
        if (
            authState?.isAuthenticated &&
            title !== '' &&
            author !== '' &&
            category !== 'Category' &&
            description !== '' &&
            copies >= 0
        ) {
            const book: AddBookRequest = new AddBookRequest(title, author, description, copies, category);
            book.img = selectedImage;
            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            };

            const submitNewBookResponse = await fetch(url, requestOptions);
            if (!submitNewBookResponse.ok) {
                throw new Error('Something went wrong!');
            }
            setTitle('');
            setAuthor('');
            setDescription('');
            setCopies(0);
            setCategory('Category');
            setSelectedImage(null);
            setDisplayWarning(false);
            setDisplaySuccess(true);
        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    };

    return (
        <div className={cx('container', 'mt-5', 'mb-5')}>
            {displaySuccess && (
                <div className={cx('alert', 'alert-success')} role="alert">
                    Book added successfully
                </div>
            )}
            {displayWarning && (
                <div className={cx('alert', 'alert-danger')} role="alert">
                    All fields must be filled out
                </div>
            )}
            <div className={cx('card')}>
                <div className={cx('card-header')}>Add a new book</div>
                <div className={cx('card-body')}>
                    <form method="POST">
                        <div className={cx('row')}>
                            <div className={cx('col-md-6', 'mb-3')}>
                                <label className={cx('form-label')}>Title</label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    name="title"
                                    required
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                            </div>
                            <div className={cx('col-md-3', 'mb-3')}>
                                <label className={cx('form-label')}> Author </label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    name="author"
                                    required
                                    onChange={(e) => setAuthor(e.target.value)}
                                    value={author}
                                />
                            </div>
                            <div className={cx('col-md-3', 'mb-3')}>
                                <label className={cx('form-label')}> Category</label>
                                <button
                                    className={cx('form-control', 'btn', 'btn-secondary', 'dropdown-toggle')}
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {category}
                                </button>
                                <ul
                                    id="addNewBookId"
                                    className={cx('dropdown-menu')}
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    <li>
                                        <span onClick={() => categoryField('FE')} className={cx('dropdown-item')}>
                                            Front End
                                        </span>
                                    </li>
                                    <li>
                                        <span onClick={() => categoryField('BE')} className={cx('dropdown-item')}>
                                            Back End
                                        </span>
                                    </li>
                                    <li>
                                        <span onClick={() => categoryField('Data')} className={cx('dropdown-item')}>
                                            Data
                                        </span>
                                    </li>
                                    <li>
                                        <span onClick={() => categoryField('DevOps')} className={cx('dropdown-item')}>
                                            DevOps
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('col-md-12', 'mb-3')}>
                            <label className={cx('form-label')}>Description</label>
                            <textarea
                                className={cx('form-control')}
                                id="exampleFormControlTextarea1"
                                rows={3}
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            ></textarea>
                        </div>
                        <div className={cx('col-md-3', 'mb-3')}>
                            <label className={cx('form-label')}>Copies</label>
                            <input
                                type="number"
                                className={cx('form-control')}
                                name="Copies"
                                required
                                onChange={(e) => setCopies(Number(e.target.value))}
                                value={copies}
                            />
                        </div>
                        <input type="file" onChange={(e) => base64ConversionForImages(e)} />
                        <div>
                            <button type="button" className={cx('btn', 'btn-primary', 'mt-3')} onClick={submitNewBook}>
                                Add Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewBook;
