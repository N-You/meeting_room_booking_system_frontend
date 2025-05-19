import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Link, Outlet, RouterProvider } from 'react-router-dom';
import { Register } from './Register';
import { Login } from './Login';
import { UpdatePassword } from './UpdatePassword/UpdatePassword';
import { ErrorPage } from './ErrorPage';
import { Index } from './index/index';
import { UpdateInfo } from './UpdateInfo/update_info';

import '@ant-design/v5-patch-for-react-19';


const routes = [
    {
        path: "/",
        element: <Index></Index>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'update_info',
                element: <UpdateInfo />
            },
            {
                path: 'bbb',
                element: <div>bbb</div>
            }
        ]
    },

    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/update_password', element: <UpdatePassword /> },
]

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<RouterProvider router={router} />)

