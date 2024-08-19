import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom'; // or MemoryRouter
// import ARoutes from './Routes';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import Home from './Home';
import More from './More';
function App() {
  const router=createBrowserRouter([{
    path:"/",
    element:<RootLayout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/More",
        element:<More/>
      }
    ]
  }])
  return (
    // <Router>
    //   <ARoutes />
    // </Router>
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;
