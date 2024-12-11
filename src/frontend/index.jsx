// Imports
import React from 'react';
import {creatRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

// Webpage router
const router = createBrowserRouter([
  {
    continue;
  }
})

// Find root in index.html
const root = createRoot(document.querySelector('#root'));

root.render(<RouterProvider router={router} />);
