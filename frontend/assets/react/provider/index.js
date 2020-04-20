import React, {useState} from 'react';
import axios from '../core/config/axios';

export const AppContext = React.createContext({});

export const AppProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const [data, setData] = React.useState([]);
    const [pagination, setPagination] = React.useState({});
    const [page, setPage] = React.useState(1);

    const [selections, setSelections] = React.useState({});
    const [isVisibleDrawer, setVisibleDrawer] = React.useState(false);
    const [text, setText] = React.useState('');

    const [emails, setEmails] = React.useState([]);

    const send = () => {
        const formData = new FormData;
        Object.values(selections).map(item => {
            formData.append('selection[]', JSON.stringify(item))
        })

        formData.append('text', text)

        axios.post('/site/send', formData)
            .finally(() => {
                onCloseDrawer();
                setSelections({})
            })

    }

    const [modalVisible, setModalVisible] = React.useState(false)
    const okModal = () => {
        setModalVisible(false);
    }
    const showModal = () => {
        getEmails().then(r => {
            setEmails(r.data);
            setModalVisible(true);
        })
    }

    const onCloseDrawer = () => {
        setVisibleDrawer(false)
    }
    const shownDrawer = () => {
        setVisibleDrawer(true)
    }

    const getEmails = () => {
        const config = {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        };

        return axios.get('/site/emails', {
            config
        })
    }

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                isReady,
                data,
                pagination,
                setPage,
                page,
                selections,
                setSelections,
                send,
                shownDrawer,
                onCloseDrawer,
                isVisibleDrawer,
                setText,
                getEmails,
                emails,
                modalVisible,
                okModal,
                showModal,
                login: (username, password) => {
                    // axios.defaults.withCredentials = true;

                    const formData = new FormData;
                    formData.append('username', username)
                    formData.append('password', password)

                    return axios.post('/auth/login', formData)
                },
                logout: () => {

                },
                signUp: (email, username, password) => {
                    const formData = new FormData;
                    formData.append('username', username)
                    formData.append('password', password)
                    formData.append('email', email)

                    return axios.post('/auth/signup', formData)
                },
                me: () => {
                    axios.post('/auth/me')
                        .then(r => {
                            setUser(r.data);

                        })
                        .finally(_ => {
                            setIsReady(true);
                        })
                },

                getData: () => {
                    const config = {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                    };


                    axios.get('/site/index?page=' + page, {
                        config
                    })
                        .then(r => {
                            setData(r.data.data);
                            setPagination(r.data.pagination);
                        })
                        .catch(err => {

                        })
                },


            }}>
            {children}
        </AppContext.Provider>
    );
}