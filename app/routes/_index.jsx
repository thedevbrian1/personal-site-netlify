import { Link, useFetcher } from "@remix-run/react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Heading from "../components/Heading";
import Input from "../components/Input";
import { redirect } from "@remix-run/node";
import { addContactToList, badRequest, createContact, sendEmail, validateEmail, validateMessage, validateName } from "../utils";
import { ArrowLeftIcon, ErrorIcon, Facebook, LinkedIn, Twitter } from "../components/Icon";
import ProjectCard from "../components/ProjectCard";

export const meta = () => {
  return [
    { title: "Brian Mwangi" },
    { name: "description", content: "I build professional and high quality websites for businesses that scale well and offer great SEO" },
  ];
};

export function headers() {
  return { 'Cache-Control': 'max-age=259200' };
}

export async function action({ request }) {
  const formData = await request.formData();
  const action = formData.get('_action');

  // const res = await mailjet.get("listrecipient", { 'version': 'v3' }).request();
  // console.log({ res });
  if (action === 'contact') {
    // Send email
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const fields = { name, email, message };
    const fieldErrors = {
      name: validateName(name),
      email: validateEmail(email),
      message: validateMessage(message)
    };

    // Return errors if any
    if (Object.values(fieldErrors).some(Boolean)) {
      return badRequest({ fieldErrors, fields });
    }
    let emailObj = {
      name,
      email,
      message
    };

    await sendEmail(emailObj);

    return redirect('/success');
  }

  if (action === 'subscribe') {
    // Subscribe to newsletter

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
  const heroRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo("#arrow", {
        x: '-6',
        y: 6,
      },
        {
          x: 2,
          y: 0,
          duration: 1.5,
          yoyo: true,
          repeat: Infinity
        })
    }, heroRef);

    return () => {
      ctx.revert();
    }
  }, []);

  return (
    <section ref={heroRef} className="w-full md:min-h-[70vh] lg:min-h-screen relative">
      <div className="w-80 h-80 absolute -left-60 lg:-left-44 top-20 bg-brand-orange blur-3xl bg-opacity-20 rounded-full" />
      <div className="w-full xl:max-w-7xl mx-auto grid items-start lg:place-items-center py-10 lg:py-auto md:mt-20 lg:mt-0">
        <motion.div
          id="hero"
          className="grid lg:grid-cols-2 w-full h-full gap-14 lg:gap-5 mt-5 md:mt-8 pt-44 px-6 md:px-8 lg:px-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 2 } }}
          viewport={{ once: true }}
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

              />
            </div>
          </div>
          <div className="flex justify-center">
            {/* Image */}
            <div className="md:w-96 lg:w-auto">
              <img src="/hero.svg" alt="" className="object-cover w-full h-full" />
            </div>
          </div>
        </motion.div>
      </div>
      <div className="w-56 h-56 lg:w-80 lg:h-80 absolute -bottom-10 lg:-bottom-40 left-20 lg:left-1/3 bg-brand-orange blur-3xl bg-opacity-20 rounded-full" />
    </section>
  );
}

function About() {
  gsap.registerPlugin(ScrollTrigger);

  const aboutRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from("#rect", {
        xPercent: 100,
        ease: 'expo',
        opacity: 0,
        duration: 2,
        delay: 1,
        // scrollTrigger: {
        //   trigger: '#rect',
        //   // start: "30%"
        // }
        // immediateRender: false,
      });
    }, aboutRef)
    return () => {
      ctx.revert();
    }
  }, []);

  return (
    <section className="w-4/5 xl:max-w-6xl mx-auto bg-slightly-lighter-dark-blue rounded-xl border border-slate-500 mt-5 md:mt-14 lg:mt-10" id="about">
      <div ref={aboutRef} className="grid lg:grid-cols-2 gap-8 lg:gap-36 items-center py-5 lg:py-10">
        <div className="px-5 md:px-8 lg:px-12 pt-6">
          <Heading text='About me' />
          <p className="text-body-white lg:text-lg mt-2 lg:mt-4">
            I am a web developer based in Nairobi, Kenya. I help my clients improve their online presence by building them fantastic websites with great SEO.
          </p>
          <p className="text-body-white lg:text-lg mt-2 ">
            I like to work out and solve puzzles when I'm not coding🙂
          </p>
          <h3 className="font-semibold font-heading text-body-white text-lg mt-2 lg:mt-4">Education</h3>
          <p className="text-body-white lg:text-lg  mt-2">I graduated with a Bachelor's degree in Computer Science from Jomo Kenyatta University of Agriculture and Technology.</p>
        </div>
        <div className="justify-self-center">
          <div className=" w-40 md:w-56 lg:w-72 xl:w-80  rounded-lg">
            <svg viewBox="0 0 100 100" className="">
              <mask id="myMask">
                <rect
                  id="rect"
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="white"
                />
              </mask>
              <image mask="url(#myMask)" x="0" y="0" width="100%" height="100%" href="/brian.jpg" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  gsap.registerPlugin(ScrollTrigger);
  const projectsRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from("#projectsDiv", {
        opacity: 0,
        y: 20,
        duration: 1,
        scrollTrigger: "#projectsDiv"
      })
    }, projectsRef);
    return () => {
      ctx.revert();
    }
  }, []);
  return (
    <section className="w-4/5 xl:max-w-5xl mx-auto" id="projects" ref={projectsRef}>
      <div
        id="projectsDiv"
        className="text-center pt-20 lg:pt-24 w-full space-y-4"
      >
        <Heading text='Wondering what I could do?' />
        <p className="text-body-white lg:text-center lg:text-lg mt-2 lg:mt-4">Here are some of my projects:</p>
        {/* TODO:
              Use laptop illustration and animations to showcase projects
              Use a laptop frame.
              Projects should display inside the frame
              Either a slider or scroll animation
          */}
        <div className="flex flex-col items-center justify-center sm:flex-row md:flex-wrap w-full gap-8 mt-2">

          {/* Project */}
          <ProjectCard
            imageUrl={'/wakadinali.png'}
            alt={'A screenshot of Wakadinali website home page'}
            title={'Wakadinali'}
            projectUrl={'https://wakadinali.netlify.app'}
          />

          <ProjectCard
            imageUrl={'/organiczones.png'}
            alt={'A screenshot of organic zones home page'}
            title={'Organic zones'}
            projectUrl={'https://organiczones.co.ke/'}
          />

          <ProjectCard
            imageUrl={'/nifty.png'}
            alt={'A screenshot of Nifty e-School home page'}
            title={'Nifty e-School'}
            projectUrl={'https://niftyeschool.com/'}
          />
          {/* Project */}
          <ProjectCard
            imageUrl={'/restaurant.png'}
            alt={'A screenshot of a fancy restaurant website home page'}
            title={'Restaurant'}
            projectUrl={'https://glittery-clafoutis-7de171.netlify.app'}
          />

          <ProjectCard
            imageUrl={'/got.png'}
            alt={'A screenshot of Game of Thrones quiz app home page'}
            title={'Game of Thrones quiz app'}
            projectUrl={'https://got-quiz-app.netlify.app/'}
          />

          <ProjectCard
            imageUrl={'/kelectricals.png'}
            alt='A screenshot of Kihara Electricals home page'
            title='Kihara Electricals'
            projectUrl='https://kihara-electricals.netlify.app/'
          />
        </div>
      </div>
    </section>
  )
}



function ContactForm() {
  // const actionData = useActionData();
  // const transition = useTransition();
  const fetcher = useFetcher();
  // gsap.registerPlugin(ScrollTrigger);

  const contactRef = useRef(null);

  // useEffect(() => {
  //   let ctx = gsap.context(() => {
  //     gsap.from("#contactDiv", {
  //       opacity: 0,
  //       y: 20,
  //       duration: 1,
  //       scrollTrigger: "#contactDiv",
  //     });
  //     gsap.to("#mobile", {
  //       rotateZ: 5,
  //       repeat: 3,
  //       yoyo: true,
  //       duration: 0.3,
  //       delay: 2,
  //       scrollTrigger: "#mobile"
  //     });
  //   }, contactRef);
  //   return () => {
  //     ctx.revert();
  //   }
  // }, []);
  return (
    <section
      className="w-4/5 xl:max-w-5xl mx-auto bg-slightly-lighter-dark-blue rounded-xl border border-slate-500 mt-24"
      ref={contactRef}
      id="contact"
    >
      <div id="contactDiv" className="grid md:grid-cols-2 gap-10 md:gap-5 px-5 md:px-8 py-10">
        <div className="md:self-center">
          {/* Text */}
          <Heading text="Get in touch with me" />
          <p className="font-body text-body-white lg:text-lg mt-2 lg:mt-4">
            I'd like to hear from you
          </p>
          <div className="flex gap-5 items-end py-2">
            <div
              id="mobile"
              className="w-7 h-7 lg:w-8 lg:h-8"
            >
              <img
                src="/phone.svg"
                alt="Mobile phone handcraft"
                width="100%"
                height="100%"
                className="-rotate-12"

              />
            </div>
            <span className="font-heading font-bold text-body-white">0710 162 152</span>
          </div>
        </div>
        <div className="lg:px-2">
          {/* Form */}
          <fetcher.Form method="post" className="xl:max-w-sm">
            <fieldset className="grid gap-3">
              <div>
                <label htmlFor="name" className="text-body-white">
                  Name
                  {fetcher.data?.fieldErrors
                    ? (<span className="text-red-500 ml-2">{fetcher.data?.fieldErrors?.name}</span>)
                    : <>&nbsp;</>
                  }
                </label>
                {/* <input
                  type="text"
                  name="name"
                  id="name"
                  className="border border-brand-orange rounded-lg w-full p-2 text-body-white bg-transparent"
                /> */}
                <Input
                  // ref={nameRef}
                  type='text'
                  name='name'
                  id='name'
                  placeholder='John Doe'
                />
              </div>
              <div>
                <label htmlFor="email" className="text-body-white">
                  Email
                  {fetcher.data?.fieldErrors
                    ? (<span className="text-red-500 ml-2">{fetcher.data?.fieldErrors?.email}</span>)
                    : <>&nbsp;</>
                  }
                </label>
                {/* <input
                  type="email"
                  name="email"
                  id="email"
                  className="border border-brand-orange rounded-lg w-full p-2 text-body-white bg-transparent"
                /> */}
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='johndoe@gmail.com'
                />
              </div>
              <div>
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
              </div>

              {/* <div className="relative max-w-sm group ">
                <div className="absolute inset-0 bg-gradient-to-r from-[#f12711] to-[#f5af19] group-hover:bg-gradient-to-r group-hover:from-[#f5af19] group-hover:to-[#f12711] transition ease-in-out duration-5000 blur opacity-75 rounded-lg" />

              </div> */}
              <button
                type="submit"
                name="_action"
                value="contact"
                className=" bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b] transition ease-in-out duration-200 w-full py-3 px-auto  rounded-lg font-bold lg:text-lg text-white group">
                {(fetcher.submission)
                  ? 'Submitting...'
                  : 'Submit'
                }
              </button>
            </fieldset>
          </fetcher.Form>
        </div>
      </div>
    </section>
  );
}


export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    console.log({ error });
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='flex flex-col items-center gap-4 text-gray-300'>
          <div className='w-40'>
            <ErrorIcon />
          </div>
          <h1 className='font-semibold text-3xl text-red-500'>{error.status} {error.statusText}</h1>
          <Link to="/" className='px-4 py-2 rounded flex gap-1 text-white bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b]'><ArrowLeftIcon /> Try again</Link>
        </div>
      </div>
    );
  } else if (error instanceof Error) {
    console.log({ error });
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='flex flex-col items-center gap-4 px-6 xl:px-0'>
          <div className='w-40'>
            <ErrorIcon />
          </div>
          <h1 className='text-red-500 text-3xl'>Error fetching data</h1>
          <Link to="/" className='px-4 py-2 rounded flex gap-1 text-white bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b]'><ArrowLeftIcon /> Try again</Link>
        </div>
      </div>
    );
  }
}