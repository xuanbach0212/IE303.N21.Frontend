import { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import classNames from 'classnames/bind';

import styles from './PostNewMessage.module.scss';
import { MessageModel } from '~/models';

const cx = classNames.bind(styles);

const PostNewMessage = () => {
    const { authState } = useOktaAuth();
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    const submitNewQuestion = async () => {
        const url = `http://54.251.217.42:8080/api/messages/secure/add/message`;
        if (authState?.isAuthenticated && title !== '' && question !== '') {
            const messageRequestModel: MessageModel = new MessageModel(title, question);
            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageRequestModel),
            };

            const submitNewQuestionResponse = await fetch(url, requestOptions);
            if (!submitNewQuestionResponse.ok) {
                throw new Error('Something went wrong!');
            }

            setTitle('');
            setQuestion('');
            setDisplayWarning(false);
            setDisplaySuccess(true);
        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    };

    return (
        <div className={cx('card', 'mt-3')}>
            <div className={cx('card-header')}>Ask question to VNLibrary Admin</div>
            <div className={cx('card-body')}>
                <form method="POST">
                    {displayWarning && (
                        <div className={cx('alert', 'alert-danger')} role="alert">
                            All fields must be filled out
                        </div>
                    )}
                    {displaySuccess && (
                        <div className={cx('alert', 'alert-success')} role="alert">
                            Question added successfully
                        </div>
                    )}
                    <div className={cx('mb-3')}>
                        <label className={cx('form-label')}>Title</label>
                        <input
                            type="text"
                            className={cx('form-control')}
                            id="exampleFormControlInput1"
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>

                    <div className={cx('mb-3')}>
                        <label className={cx('form-label')}>Question</label>
                        <textarea
                            className={cx('form-control')}
                            id="exampleFormControlTextarea1"
                            rows={3}
                            onChange={(e) => setQuestion(e.target.value)}
                            value={question}
                        ></textarea>
                    </div>
                    <div>
                        <button type="button" className={cx('btn', 'btn-primary', 'mt-3')} onClick={submitNewQuestion}>
                            Submit Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostNewMessage;
