import { cssBundleHref } from "@remix-run/css-bundle";

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import tailwindStyles from "./styles/tailwind.css";
import Nav from "./components/Nav";
import { ArrowLeftIcon, ErrorIcon } from "./components/Icon";

export const links = () => [
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "true" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap" },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  const navLinks = [
    {
      name: 'Home',
      path: '/',
      id: 1,
    },
    {
      name: 'Projects',
      path: '/#projects',
      id: 2,
    },
    {
      name: 'Contact me',
      path: '/#contact',
      id: 3,
    },
    {
      name: 'About',
      path: '/#about',
      id: 4,
    },
    {
      name: 'Blog',
      path: '/posts',
      id: 5,
    }
  ];
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet"></link> */}
        <Links />
      </head>
      <body className="w-full bg-dark-blue">
        <header className="flex justify-between items-center absolute top-0 left-0 right-0 z-10 pt-8 px-6 lg:pl-12 lg:pr-16">
          {/* 
            TODO:
            LOGO ideas:
              - Make logo my name and it should glow
              - Make first letter of my name flicker like a faulty bulb
          */}
          <Link to="/">
            <h1 className="font-heading text-white uppercase">Brian Mwangi</h1>
          </Link>
          <Nav navLinks={navLinks} />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// export function ErrorBoundary() {
//   const error = useRouteError();

//   if (isRouteErrorResponse(error)) {
//     console.log({ error });
//     return (
//       <div className='w-full h-screen flex justify-center items-center'>
//         <div className='flex flex-col items-center gap-4 text-gray-300'>
//           <div className='w-40'>
//             <ErrorIcon />
//           </div>
//           <h1 className='font-semibold text-3xl text-red-500'>{error.status} {error.statusText}</h1>
//           <Link to="/" className='px-4 py-2 rounded flex gap-1 text-white bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b]'><ArrowLeftIcon /> Try again</Link>
//         </div>
//       </div>
//     );
//   } else if (error instanceof Error) {
//     console.log({ error });
//     return (
//       <div className='w-full h-screen flex justify-center items-center'>
//         <div className='flex flex-col items-center gap-4 px-6 xl:px-0'>
//           <div className='w-40'>
//             <ErrorIcon />
//           </div>
//           <h1 className='text-red-500 text-3xl'>Error fetching data</h1>
//           <Link to="/" className='px-4 py-2 rounded flex gap-1 text-white bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b]'><ArrowLeftIcon /> Try again</Link>
//         </div>
//       </div>
//     );
//   }
// }