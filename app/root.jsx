import { cssBundleHref } from "@remix-run/css-bundle";

import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  useFetcher,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


import "./styles/tailwind.css";
import Nav from "./components/Nav";
import { ArrowLeftIcon, ErrorIcon, Facebook, LinkedIn, Twitter } from "./components/Icon";
import Input from "./components/Input";
import { useEffect, useRef } from "react";
import { redirect } from "@remix-run/node";
import { honeypot } from "./.server/honeypot";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { HoneypotProvider } from "remix-utils/honeypot/react";
import { SpamError } from "remix-utils/honeypot/server";
import { badRequest, validateEmail } from "./.server/validation";
import { addContactToList, createContact } from "./.server/email";

export const links = () => [
  // { rel: "stylesheet", href: tailwindStyles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "true" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap" },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function loader() {
  return json({ honeypotInputProps: honeypot.getInputProps() });
}

export async function action({ request }) {
  const formData = await request.formData();

  try {
    honeypot.check(formData);
  } catch (error) {
    if (error instanceof SpamError) {
      throw new Response('Form not submitted properly', { status: 400 });
    }
    throw error;
  }

  const email = formData.get('email');

  const field = { email };
  const fieldErrors = {
    email: validateEmail(email)
  }

  // Return errors if any
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ field, fieldErrors });
  }
  // First create contact then add contact to a contact list
  //
  const contact = await createContact(email);

  const contactEmail = contact.Data[0].Email;

  await addContactToList(contactEmail);

  return redirect('/success');
}

export function Layout({ children }) {
  let { honeypotInputProps } = useLoaderData();

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
        <HoneypotProvider {...honeypotInputProps}>
          {children}
        </HoneypotProvider>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
export default function App() {
  return <Outlet />
}

function Footer() {
  const fetcher = useFetcher();
  gsap.registerPlugin(ScrollTrigger);

  const footerRef = useRef(null);

  // function handleHover() {
  //   gsap.to("#subscribeBtn", {
  //     backgroundColor: '#c94b4b'
  //   });
  // }

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from("#footer", {
        opacity: 0,
        y: 20,
        duration: 1,
        scrollTrigger: "#footer"
      });
    }, footerRef);
    return ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative">
      <div className="w-36 h-36 lg:w-44 lg:h-44 absolute -left-20 lg:-left-36 top-10 bg-brand-orange blur-3xl bg-opacity-20 rounded-full" />
      <div
        id="footer"
        className="w-4/5 xl:max-w-5xl mx-auto mt-16"
      >
        <div className="flex justify-between">
          <h2 className="font-heading text-white uppercase">Brian Mwangi</h2>
          <div className="flex gap-3">
            {/* <img src="/twitter.svg" alt="Twitter icon" />
              <img src="/facebook.svg" alt="Facebook icon" /> */}
            <a href="https://www.linkedin.com/in/brian-mwangi-9b01651a1/" target="_blank" rel="noopener noreferrer" >
              <LinkedIn />
            </a>
            <a href="https://twitter.com/_3R14N_" target="_blank" rel="noopener noreferrer">
              <Twitter />
            </a>
            <a href="https://www.facebook.com/brayo.notnice" target="_blank" rel="noopener noreferrer">
              <Facebook />
            </a>
          </div>
        </div>
        <div className="bg-slightly-lighter-dark-blue rounded-xl border border-slate-500 mt-10 px-5 md:px-8 py-10 grid lg:grid-cols-2 gap-5">
          <div className="lg:self-center">
            <h2 className="text-white font-heading font-bold text-xl lg:text-3xl">Sign up for the newsletter</h2>
            <p className="font-body text-body-white lg:text-lg mt-2 lg:mt-4">Receive interesting tips and articles in real time. You can unsubscribe at any time.</p>
          </div>
          <div className="md:w-3/4 lg:w-auto">
            <fetcher.Form method="post" className="xl:max-w-sm">
              <HoneypotInputs />
              <fieldset className="grid gap-3">
                <div>
                  <label htmlFor="subscribe" className="text-body-white">
                    Email
                    {(fetcher.data?.fieldErrors)
                      ? (<span className="text-red-500 ml-2">{fetcher.data?.fieldErrors?.email}</span>)
                      : <>&nbsp;</>
                    }
                  </label>
                  {/* <input
                    type="email"
                    name="email"
                    id="subscribe"
                    className="w-full xl:max-w-sm block bg-transparent border border-orange-300 rounded-lg p-2 text-body-white"
                  /> */}
                  {/* <input
                    type="text"
                    name="email"
                    id="subscribe"
                    placeholder="johndoe@gmail.com"
                    className="nm-inset-slightly-lighter-dark-blue border-none outline-none w-full xl:max-w-sm block rounded-lg  text-body-white"
                  /> */}
                  <Input
                    type='email'
                    name='email'
                    id='subscribe'
                    placeholder='johndoe@gmail.com'
                  />
                </div>
                {/* <div className="relative max-w-sm group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f12711] to-[#f5af19] group-hover:bg-gradient-to-r group-hover:from-[#f5af19] group-hover:to-[#f12711] transition ease-in-out duration-5000 blur opacity-75 rounded-lg" />

                  <button
                    type="submit"
                    name="_action"
                    value="subscribe"
                    className="relative bg-dark-blue w-full py-2 px-auto rounded-lg font-bold lg:text-lg text-white">
                    {(fetcher.submission)
                      ? 'Subscribing...'
                      : 'Subscribe'
                    }
                  </button>
                </div> */}
                <button
                  id="subscribeBtn"
                  type="submit"
                  name="_action"
                  value="subscribe"
                  // onMouseEnter={handleHover}
                  className=" bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b] transition ease-in-out duration-200 w-full py-3 px-auto  rounded-lg font-bold lg:text-lg text-white group">
                  {(fetcher.submission)
                    ? 'Subscribing...'
                    : 'Subscribe'
                  }
                </button>
              </fieldset>
            </fetcher.Form>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#533D55] text-body-white font-body flex justify-center mt-10 py-3">
        Copyright &copy; {new Date().getFullYear()}
      </div>
    </footer>
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