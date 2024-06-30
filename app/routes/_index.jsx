import { Link, isRouteErrorResponse, useFetcher, useLoaderData, useRouteError } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import Heading from "../components/Heading";
import Input from "../components/Input";
import { badRequest, trimValue, validateEmail, validateMessage, validateName, validatePhone } from "../.server/validation";
import { sendEmail } from "../.server/email";
import { ErrorIcon, ThreeDots } from "../components/Icon";
import ProjectCard from "../components/ProjectCard";
import { honeypot } from "../.server/honeypot";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { SpamError } from "remix-utils/honeypot/server";
import { getProjects } from "~/models/project";
import { FormSpacer } from "~/components/FormSpacer";

export const meta = () => {
  return [
    { title: "Brian Mwangi" },
    { name: "description", content: "I build professional and high quality websites for businesses that scale well and offer great SEO" },
  ];
};

// export function headers() {
//   return { 'Cache-Control': 'max-age=259200' };
// }
export async function loader() {
  let projects = await getProjects();
  return projects;
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

  const action = formData.get('_action');

  // const res = await mailjet.get("listrecipient", { 'version': 'v3' }).request();
  // console.log({ res });
  if (action === 'contact') {
    // Send email
    const name = formData.get('name');
    let phone = formData.get('phone');
    const email = formData.get('email');
    const message = formData.get('message');

    const fields = { name, email, message };

    let trimmedPhone = trimValue(phone);

    const fieldErrors = {
      name: validateName(name),
      phone: validatePhone(trimmedPhone),
      email: validateEmail(email),
      message: validateMessage(message)
    };

    // Return errors if any
    if (Object.values(fieldErrors).some(Boolean)) {
      return badRequest({ fieldErrors, fields });
    }

    let { id } = await sendEmail(name, email, trimmedPhone, message);

    if (id) {
      return redirect('/success');
    }
  }

  return null;
}

export default function Index() {
  return (
    <main className="relative min-h-screen font-body">
      <Hero />
      <About />
      <Projects />
      <ContactForm />
    </main>
  );
}

function Hero() {
  return (
    <section className="w-full md:min-h-[70vh] lg:min-h-screen relative">
      <div className="w-80 h-80 absolute -left-60 lg:-left-44 top-20 bg-brand-orange blur-3xl bg-opacity-20 rounded-full" />
      <div className="w-full xl:max-w-7xl mx-auto grid items-start lg:place-items-center py-10 lg:py-auto md:mt-20 lg:mt-0">
        <div
          id="hero"
          className="grid lg:grid-cols-2 w-full h-full gap-14 lg:gap-5 mt-5 md:mt-8 pt-44 px-6 md:px-8 lg:px-10 hero-animation"
        >
          <div>
            {/* Text */}
            <h2 className="font-heading font-bold text-white text-2xl lg:text-5xl">Hi, I'm Brian Mwangi. I build websites that <span className="text-brand-orange "><em>actually work</em></span></h2>
            {/* TODO: Use text gradient */}
            <p className="text-body-white mt-3 lg:text-lg">Do you desire to have the<em className="text-brand-orange"> best </em> website you can possibly have?</p>
            <div className="mt-5 flex gap-6 items-center">
              <Link to="/#contact" className="px-8 py-3 bg-white text-black hover:bg-brand-orange transition duration-300 ease-in-out rounded-lg">Contact me</Link>
              <Link to="/#projects" className="text-body-white hover:text-brand-orange transition duration-300 ease-in-out underline">View projects</Link>
            </div>
            <div className="w-9 h-9 mt-2 -ml-2">
              <img
                id="arrow"
                src="/contact-arrow.svg"
                alt=""
                className="arrow"
              />
            </div>
          </div>
          <div className="flex justify-center">
            {/* Image */}
            <div className="md:w-96 lg:w-auto">
              <img src="/hero.svg" alt="" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-56 h-56 lg:w-80 lg:h-80 absolute -bottom-10 lg:-bottom-40 left-20 lg:left-1/3 bg-brand-orange blur-3xl bg-opacity-20 rounded-full" />
    </section>
  );
}

function About() {
  return (
    <section className="px-6 md:px-12 xl:px-0 lg:max-w-5xl xl:max-w-6xl mx-auto mt-16" id="about">
      <div className="bg-slightly-lighter-dark-blue rounded-xl border border-slate-500">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 lg:gap-36 items-center py-5 lg:py-10">
          <div className="px-5 md:px-8 lg:px-12 pt-6 fade-in">
            <Heading text='About me' />
            <p className="text-body-white lg:text-lg mt-4 lg:mt-8">
              I am a web developer based in Nairobi, Kenya. I help my clients improve their online presence by building them fantastic websites with great SEO.
            </p>
            <p className="text-body-white lg:text-lg mt-2 ">
              I like to work out and solve puzzles when I'm not coding🙂
            </p>
            <h3 className="font-semibold font-heading text-body-white text-lg mt-4">Education</h3>
            <p className="text-body-white lg:text-lg  mt-2">I graduated with a Bachelor's degree in Computer Science from Jomo Kenyatta University of Agriculture and Technology.</p>
          </div>
          <div className="justify-self-center px-4 lg:px-0">
            <img src="/brian.jpg" className=" w-full md:max-w-xs h-full rounded-lg image-reveal" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  let projects = useLoaderData();

  return (
    <section className="mt-16 md:mt-32 px-6 md:px-12  xl:px-0 lg:max-w-6xl mx-auto" id="projects">
      <div
        id="projectsDiv"
        className="text-center  w-full "
      >
        <Heading text='Wondering what I could do?' />
        <p className="text-body-white lg:text-center lg:text-lg mt-8">Here are some of my projects:</p>
        {/* TODO:
              Use laptop illustration and animations to showcase projects
              Use a laptop frame.
              Projects should display inside the frame
              Either a slider or scroll animation
          */}
        <div className="w-full h-full grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8 mt-8">

          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              imageUrl={project.image.asset.url}
              alt={project.altText}
              title={project.title}
              projectUrl={project.projectUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}



function ContactForm() {
  const fetcher = useFetcher();
  let isSubmitting = fetcher.state !== 'idle';

  return (
    <section
      className="w-full px-6 md:px-12 xl:px-0 lg:max-w-5xl mx-auto mt-16 md:mt-32"
      id="contact"
    >
      <div className="bg-slightly-lighter-dark-blue rounded-xl border border-slate-500">
        <div id="contactDiv" className="grid md:grid-cols-2 gap-10 md:gap-5 px-5 md:px-8 py-10">
          <div className="md:self-center fade-in">
            {/* Text */}
            <Heading text="Get in touch with me" />
            <p className="font-body text-body-white lg:text-lg mt-4">
              I'd like to hear from you
            </p>
            <div className="flex gap-5 items-center py-2 mt-4">
              <div
                id="mobile"
                className="w-16 h-16"
              >
                <img
                  src="/phone.svg"
                  alt="Mobile phone handcraft"
                  className="-rotate-12 w-full h-full"
                />
              </div>
              <span className="font-heading font-bold text-body-white">0710 162 152</span>
            </div>
          </div>
          <div className="lg:px-2 ">
            {/* Form */}
            <fetcher.Form method="post" className="xl:max-w-sm fade-in">
              <HoneypotInputs />
              <h3 className="font-heading font-semibold text-white text-xl">Send me a message</h3>
              <fieldset className="space-y-3 mt-4">
                <FormSpacer>
                  <label htmlFor="name" className="text-body-white">
                    Name
                    {fetcher.data?.fieldErrors
                      ? (<span className="text-red-500 ml-2">{fetcher.data?.fieldErrors?.name}</span>)
                      : <>&nbsp;</>
                    }
                  </label>
                  <Input
                    // ref={nameRef}
                    type='text'
                    name='name'
                    id='name'
                    placeholder='John Doe'
                  />
                </FormSpacer>
                <FormSpacer>
                  <label htmlFor="phone" className="text-body-white">
                    Phone
                    {fetcher.data?.fieldErrors?.phone
                      ? (<span className="text-red-500 ml-2">{fetcher.data.fieldErrors.phone}</span>)
                      : <>&nbsp;</>
                    }
                  </label>
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="+254 712 345 678"
                  />
                </FormSpacer>
                <FormSpacer>
                  <label htmlFor="email" className="text-body-white">
                    Email
                    {fetcher.data?.fieldErrors
                      ? (<span className="text-red-500 ml-2">{fetcher.data?.fieldErrors?.email}</span>)
                      : <>&nbsp;</>
                    }
                  </label>
                  <Input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='johndoe@gmail.com'
                  />
                </FormSpacer>
                <FormSpacer>
                  <label htmlFor="message" className="text-body-white">
                    Message
                    {fetcher.data?.fieldErrors
                      ? (<span className="text-red-500 ml-2">{fetcher.data?.fieldErrors?.message}</span>)
                      : <>&nbsp;</>
                    }
                  </label>
                  <Input
                    type="textarea"
                    name="message"
                    id="message"
                    // cols="30" 
                    rows="4"
                  // className="w-full xl:max-w-sm bg-transparent rounded-lg block text-body-white focus:border-none focus:ring-2 focus:ring-white"
                  />
                </FormSpacer>
                {/* FIXME: Fix button size when submitting */}
                <button
                  type="submit"
                  name="_action"
                  value="contact"
                  className="bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b] transition ease-in-out duration-200 w-full flex justify-center py-3  rounded-lg font-bold lg:text-lg text-white"
                >
                  {isSubmitting
                    ? (<div className="w-10"><ThreeDots /></div>)
                    : 'Submit'
                  }
                </button>
              </fieldset>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </section>
  );
}


export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    console.error({ error });
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='flex flex-col items-center gap-4 text-gray-300'>
          <div className='w-40'>
            <ErrorIcon />
          </div>
          <h1 className='font-semibold text-3xl text-red-500'>{error.status} {error.statusText}</h1>
          <Link to="/" prefetch="intent" className='px-4 py-2 rounded text-white bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b]'>Try again</Link>
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
          <h1 className='text-red-500 text-3xl'>Error fetching data</h1>
          <Link to="/" prefetch="intent" className='px-4 py-2 rounded text-white bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b]'>Try again</Link>
        </div>
      </div>
    );
  }
}