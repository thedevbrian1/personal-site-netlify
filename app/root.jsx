import {
  Form,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  useActionData,
  useNavigation,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";
import Nav from "./components/Nav";
import { Bars, ErrorIcon, Facebook, LinkedIn, Twitter } from "./components/Icon";
import Input from "./components/Input";
import { redirect } from "@remix-run/node";
import { honeypot } from "./.server/honeypot";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { HoneypotProvider } from "remix-utils/honeypot/react";
import { SpamError } from "remix-utils/honeypot/server";
import { useSpinDelay } from "spin-delay";
import { badRequest, validateEmail, validateName } from "./.server/validation";
import { subscribe } from "./.server/email";
import { FormSpacer } from "./components/FormSpacer";
import "./styles/tailwind.css";
import "./styles/animation.css";

export async function loader() {
  return json({ honeypotInputProps: honeypot.getInputProps() });
}

export async function action({ request }) {
  let formData = await request.formData();

  try {
    honeypot.check(formData);
  } catch (error) {
    if (error instanceof SpamError) {
      throw new Response('Form not submitted properly', { status: 400 });
    }
    throw error;
  }

  let action = formData.get('_action');

  switch (action) {
    case 'subscribe': {
      let email = formData.get('email');
      let name = formData.get('name');

      let field = { name, email };
      let fieldErrors = {
        name: validateName(name),
        email: validateEmail(email)
      }

      // Return errors if any
      if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({ field, fieldErrors });
      }

      let { id } = await subscribe(name, email);

      if (id) {
        return redirect('/success');

      }
    }
  }

  return null;

}

export function Layout({ children }) {
  let error = useRouteError();
  let data = useRouteLoaderData('root');

  let honeypotInputProps;
  if (!error) {
    honeypotInputProps = data.honeypotInputProps;
  }

  let navigation = useNavigation();
  let isLoading = navigation.state === 'loading' && !navigation.formMethod;

  let showLoadingState = useSpinDelay(isLoading, {
    delay: 150,
    minDuration: 500
  });

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet"></link>
        <Links />
      </head>
      <body className="w-full bg-dark-blue">
        {showLoadingState
          ? <div className="w-full fixed z-10 grid place-items-center inset-0 bg-black/50">
            <span className="w-14 h-14 md:w-16 md:h-16"><Bars /></span>
          </div>
          : null
        }
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
        {error
          ? children
          : <HoneypotProvider {...honeypotInputProps}>
            {children}
            {<Footer />}
          </HoneypotProvider>
        }

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
export default function App() {
  return <Outlet />;
}

function Footer() {
  let actionData = useActionData();
  let navigation = useNavigation();

  let isSubmitting = navigation.state === 'submitting';

  return (
    <footer className="relative">
      <div className="w-36 h-36 lg:w-44 lg:h-44 absolute -left-20 lg:-left-36 top-10 bg-brand-orange blur-3xl bg-opacity-20 rounded-full" />
      <div
        id="footer"
        className="px-6 md:px-12 xl:px-0 xl:max-w-5xl mx-auto mt-16 md:mt-32"
      >
        <div className="flex justify-between">
          <h2 className="font-heading text-white uppercase">Social media</h2>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/brian-mwangi-9b01651a1/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Find me on LinkedIn"
            >
              <LinkedIn />
            </a>
            <a
              href="https://twitter.com/_3R14N_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow me on X"
            >
              <Twitter />
            </a>
            <a
              href="https://www.facebook.com/brayo.notnice"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow me on Facebook"
            >
              <Facebook />
            </a>
          </div>
        </div>
        <div className="bg-slightly-lighter-dark-blue rounded-xl border border-slate-500 mt-10">
          <div className="grid md:grid-cols-2 gap-5 px-5 py-10">
            <div className="lg:self-center opacity-0 fade-in">
              <h2 className="text-white font-heading font-bold text-xl lg:text-3xl">Sign up for the newsletter</h2>
              <p className="font-body text-body-white lg:text-lg mt-2 lg:mt-4">Receive interesting tips and articles in real time. You can unsubscribe at any time.</p>
            </div>
            <div className="md:w-3/4 lg:w-auto opacity-0 fade-in">
              <Form method="post" className="xl:max-w-sm">
                <HoneypotInputs />
                <fieldset className="grid gap-3">
                  <FormSpacer>
                    <label htmlFor="name" className="text-body-white">
                      Name
                      {(actionData?.fieldErrors?.name)
                        ? (<span className="text-red-500 ml-2">{actionData.fieldErrors.name}</span>)
                        : <>&nbsp;</>
                      }
                    </label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="John Doe"
                    />
                  </FormSpacer>
                  <FormSpacer>
                    <label htmlFor="subscribe" className="text-body-white">
                      Email
                      {(actionData?.fieldErrors)
                        ? (<span className="text-red-500 ml-2">{actionData?.fieldErrors?.email}</span>)
                        : <>&nbsp;</>
                      }
                    </label>

                    <Input
                      type='email'
                      name='email'
                      id='subscribe'
                      placeholder='johndoe@gmail.com'
                    />
                  </FormSpacer>

                  <button
                    id="subscribeBtn"
                    type="submit"
                    name="_action"
                    value="subscribe"
                    // onMouseEnter={handleHover}
                    className=" bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b] transition ease-in-out duration-200 w-full py-3 px-auto  rounded-lg font-bold lg:text-lg text-white group">
                    {isSubmitting
                      ? 'Subscribing...'
                      : 'Subscribe'
                    }
                  </button>
                </fieldset>
                {actionData?.formError
                  ? <p className="text-red-500 mt-4">{actionData.formError}</p>
                  : null
                }
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#533D55] text-body-white font-body flex justify-center mt-10 py-3">
        Copyright &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    console.error({ error });
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='flex flex-col items-center gap-4 text-gray-300'>
          <div className='w-40'>
            <ErrorIcon />
          </div>
          <h1 className='font-semibold text-3xl text-red-500'>{error.status} {error.statusText}</h1>
          <Link to="/" prefetch="intent" className='px-4 py-2 rounded text-white bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b]'> Try again</Link>
        </div>
      </div>
    );
  } else if (error instanceof Error) {
    console.error({ error });
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='flex flex-col items-center gap-4 px-6 xl:px-0'>
          <div className='w-40'>
            <ErrorIcon />
          </div>
          <h1 className='text-red-500 text-3xl'>Error</h1>
          <p className="text-red-500 text-xl">{error.message}</p>
          <Link to="/" prefetch="intent" className='px-4 py-2 rounded flex gap-1 text-white bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b]'> Try again</Link>
        </div>
      </div>
    );
  }
}