import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayOut from './Component/LayOut/LayOut';
import Login from './Component/Login/Login';
import SignUp from './Component/SignUp/SignUp';
import Home from './Component/Home/Home';
import NotFound from './Component/NotFound/NotFound';
import All from "./Component/All/All"
import Pc from "./Component/Pc/Pc"
import Browser from "./Component/Browser/Browser"
import ReleaseDate from './Component/ReleaseDate/ReleaseDate';
import Alphabetical from './Component/Alphabetical/Alphabetical';
import Relevance from './Component/Relevance/Relevance';
import Racing from './Component/Categories/Racing/Racing';
import Sports from './Component/Categories/Sports/Sports';
import Social from './Component/Categories/Social/Social';
import Shooter from './Component/Categories/Shooter/Shooter';
import OpenWorld from './Component/Categories/OpenWorld/OpenWorld';
import Zombie from './Component/Categories/Zombie/Zombie';
import Fantasy from './Component/Categories/Fantasy/Fantasy';
import ActionRpg from './Component/Categories/ActionRpg/ActionRpg';
import Action from './Component/Categories/Action/Action';
import Flight from './Component/Categories/Flight/Flight';
import BattleRoyale from './Component/Categories/BattleRoyale/BattleRoyale';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import Popularity from './Component/Popularity/Popularity';
import ItemDetails from './Component/ItemDetails/ItemDetails';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  
  const [loading, setloading] = useState(false)

  const [userData, setuserData] = useState(null)
  function saveUserData(){
    const encodedData=localStorage.getItem('userToken');
    const decodedData=jwtDecode(encodedData)
    setuserData(decodedData)
  }
useEffect(()=>{ if(localStorage.getItem('userToken')!==null){saveUserData()}},[])

  let routers = createBrowserRouter([
    {
      path: '', element: <LayOut userData={userData} setuserData={setuserData}/>, children: [
        { index: 'true', element: <Login /> },
        { path: 'login', element: <Login saveUserData={saveUserData}/> },
        { path: 'signup', element: <SignUp /> },
        { path: 'home', element:<ProtectedRoute><Home loading={loading} setloading={setloading} /></ProtectedRoute> }, 
        { path: 'itemdetails/:id', element:<ProtectedRoute><ItemDetails loading={loading} setloading={setloading}/></ProtectedRoute> }, 
        { path: 'all', element:<ProtectedRoute><All loading={loading} setloading={setloading}/> </ProtectedRoute> },         
        { path: 'popularity', element:<ProtectedRoute><Popularity loading={loading} setloading={setloading}/> </ProtectedRoute> },         
        { path: 'pc', element:<ProtectedRoute><Pc loading={loading} setloading={setloading}/> </ProtectedRoute>}, 
        { path: 'browser', element:<ProtectedRoute><Browser loading={loading} setloading={setloading}/> </ProtectedRoute> }, 
        { path: 'releaseDate', element:<ProtectedRoute><ReleaseDate loading={loading} setloading={setloading}/></ProtectedRoute>  }, 
        { path: 'alphabetical', element:<ProtectedRoute><Alphabetical loading={loading} setloading={setloading}/></ProtectedRoute>  },
        { path: 'relevance', element:<ProtectedRoute><Relevance loading={loading} setloading={setloading}/></ProtectedRoute>  },
        { path: 'racing', element:<ProtectedRoute><Racing loading={loading} setloading={setloading}/></ProtectedRoute>  },
        { path: 'sports', element:<ProtectedRoute><Sports loading={loading} setloading={setloading}/></ProtectedRoute>  },
        { path: 'social', element:<ProtectedRoute><Social loading={loading} setloading={setloading}/></ProtectedRoute>  },
        { path: 'shooter', element:<ProtectedRoute><Shooter loading={loading} setloading={setloading}/></ProtectedRoute>  },
        { path: 'openWorld', element:<ProtectedRoute><OpenWorld loading={loading} setloading={setloading}/></ProtectedRoute>  },
        { path: 'fantasy', element:<ProtectedRoute><Fantasy loading={loading} setloading={setloading}/></ProtectedRoute>  },
        { path: 'zombie', element:<ProtectedRoute><Zombie loading={loading} setloading={setloading}/></ProtectedRoute>  },
        { path: 'actionRpg', element:<ProtectedRoute><ActionRpg loading={loading} setloading={setloading}/></ProtectedRoute>  },
        { path: 'action', element:<ProtectedRoute><Action loading={loading} setloading={setloading}/></ProtectedRoute>  },
        { path: 'flight', element:<ProtectedRoute><Flight loading={loading} setloading={setloading}/></ProtectedRoute>  },
        { path: 'battleRoyale', element:<ProtectedRoute><BattleRoyale loading={loading} setloading={setloading}/></ProtectedRoute> },
        { path: '*', element: <NotFound /> },
      ]
    }])
  return <>

    <RouterProvider router={routers}></RouterProvider>


    
  </>
}

export default App;
