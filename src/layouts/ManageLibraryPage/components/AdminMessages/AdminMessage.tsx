import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminMessages.module.scss';
import { MessageModel } from '~/models';

const cx = classNames.bind(styles);

const AdminMessage: React.FC<{ message: MessageModel; submitResponseToQuestion: any }> = ({
    message,
    submitResponseToQuestion,
}) => {
    const [displayWarning, setDisplayWarning] = useState(false);
    const [response, setResponse] = useState('');

    const submitBtn = () => {
        if (message.id !== null && response !== '') {
            submitResponseToQuestion(message.id, response);
            setDisplayWarning(false);
        } else {
            setDisplayWarning(true);
        }
    };

    return (
        <div key={message.id}>
            <div className={cx('card', 'mt-2', 'shadow', 'p-3', 'bg-body', 'rounded')}>
                <h5>
                    Case #{message.id}: {message.title}
                </h5>
                <h6>{message.userEmail}</h6>
                <p>{message.question}</p>
                <hr />
                <div>
                    <h5>Response: </h5>
                    <form action="PUT">
                        {displayWarning && (
                            <div className={cx('alert', 'alert-danger')} role="alert">
                                All fields must be filled out.
                            </div>
                        )}
                        <div className={cx('col-md-12', 'mb-3')}>
                            <label className={cx('form-label')}> Description </label>
                            <textarea
                                className={cx('form-control')}
                                id="exampleFormControlTextarea1"
                                rows={3}
                                onChange={(e) => setResponse(e.target.value)}
                                value={response}
                            ></textarea>
                        </div>
                        <div>
                            <button type="button" className={cx('btn', 'btn-primary', 'mt-3')} onClick={submitBtn}>
                                Submit Response
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminMessage;
