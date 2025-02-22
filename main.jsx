import React from "react";
import ReactDom from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter,RouterProvider } from "react-router-dom";

import App from './App.jsx'
import Login from "./components/login.jsx";
import Cadastro from "./components/cadastro.jsx";
import Landing from './components/landing.jsx'
import Dashboard from "./components/pages/regular/home.jsx";
import Frota from "./components/pages/regular/frota.jsx";
import Motoristas from "./components/pages/regular/motoristas.jsx";
import RegistroEntregas from "./components/pages/regular/entrega.jsx";
import AdminRegistro from "./components/pages/regular/addAdmin.jsx";
import AdminsLista from "./components/pages/regular/admins.jsx";

const route = createBrowserRouter([
  {path:'/',
    element:<App/>,
    children:[
      {path:'/login',
        element:<Login/>
      },
      {path:'/cadastro',
        element:<Cadastro/>
      },
      {path:'/',
        element:<Landing/>
      },
      {path:'/home',
        element:<Dashboard/>
      },
      {path:'/frota',
        element:<Frota/>
      },
      {path:'/motoristas',
        element:<Motoristas/>
      },
      {path:'/entrega',
        element:<RegistroEntregas/>
      },
      {path:'/newAdmin',
        element:<AdminRegistro/>
      },
      {path:'/Admins',
        element:<AdminsLista/>
      },
    ],
  }
])



ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route}/>
  </React.StrictMode>,
)
