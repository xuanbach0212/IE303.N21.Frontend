import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';

import './App.scss';
import oktaConfig from './lib/oktaConfig';
import Navbar from './layouts/Navbar';
import HomePage from './layouts/HomePage';
import SearchBooksPage from './layouts/SearchBookPage';
import Footer from './layouts/Footer';
import BookCheckoutPage from './layouts/BookCheckoutPage';
import LoginWidget from './Auth/LoginWidget';
import ReviewListPage from './layouts/ReviewListPage';
import ShelfPage from './layouts/ShelfPage';
import MessagesPage from './layouts/MessagesPage';
import ManageLibraryPage from './layouts/ManageLibraryPage';

const oktaAuth = new OktaAuth(oktaConfig);

const App = () => {
    const history = useHistory();
    const customAuthHandler = () => {
        history.push('/login');
    };

    const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
        history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    };

    return (
        <div className="App">
            <div className="d-flex flex-column min-vh-100">
                <Security
                    oktaAuth={oktaAuth}
                    restoreOriginalUri={restoreOriginalUri}
                    onAuthRequired={customAuthHandler}
                >
                    <Navbar />
                    <div className="flex-grow-1">
                        <Switch>
                            <Route path="/" exact>
                                <Redirect to="/home" />
                            </Route>
                            <Route path="/home">
                                <HomePage />
                            </Route>
                            <Route path="/search">
                                <SearchBooksPage />
                            </Route>
                            <Route path="/reviewlist/:bookId">
                                <ReviewListPage />
                            </Route>
                            <Route path="/checkout/:bookId">
                                <BookCheckoutPage />
                            </Route>
                            <Route path="/login" render={() => <LoginWidget config={oktaConfig} />} />
                            <Route path="/login/callback" component={LoginCallback} />
                            <SecureRoute path="/shelf">
                                <ShelfPage />
                            </SecureRoute>
                            <SecureRoute path="/messages">
                                <MessagesPage />
                            </SecureRoute>
                            <SecureRoute path="/admin">
                                <ManageLibraryPage />
                            </SecureRoute>
                        </Switch>
                    </div>
                    <Footer />
                </Security>
            </div>
        </div>
    );
};

export default App;
