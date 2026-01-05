import Image from "next/image";

import { Bebas_Neue } from "next/font/google";
import { InfiniteRuningText } from "@/components/InfiniteRuningText";
import { FaGithub, FaLinkedin, FaFacebook, FaGoogle } from "react-icons/fa";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const socialLinks = [
  {
    title: "GitHub",
    url: "https://github.com/PauliusTaraskevicius",
    image: <FaGithub size={25} />,
  },
  {
    title: "LinkedIn",
    url: "https://linkedin.com/in/paulius-taraškevičius-916b83234",
    image: <FaLinkedin size={25} />,
  },
  {
    title: "Facebook",
    url: "https://www.facebook.com/paulius.taraskevicius",
    image: <FaFacebook size={25} />,
  },
  {
    title: "Google",
    url: "mailto:fixas1029@gmail.com",
    image: <FaGoogle size={25} />,
  },
];

const Page = () => {
  return (
    <div className="mx-auto mt-20 flex max-w-440 flex-col items-center justify-center p-5 md:mt-40">
      <div className="flex w-full flex-col gap-8 md:flex-row md:justify-between md:gap-2">
        <div className="flex w-full justify-center md:justify-start">
          <Image
            src="/profile-pic.png"
            alt="About Me Photo"
            height={400}
            width={400}
            className="rounded-2xl object-cover"
            priority
          />
        </div>
        <div className="w-full">
          <span
            className={`${bebasNeue.className} text-[32px] leading-9 tracking-wide text-white/40 transition-colors duration-300 hover:text-white md:text-[40px] md:leading-10`}
          >
            My first exposure to web development was in 2020. Since then, I've
            built a range of projects and collaborated with talented individuals
            to bring their ideas to life. What I've enjoyed most is the
            continuous learning process—steadily refining my craft over time. I
            find particular fulfillment in seeing my programming and design
            skills come together in a well-executed, finished product.
          </span>
        </div>
      </div>

      <div className="border-muted-foreground relative mt-20 w-full border-t py-8 md:mt-40">
        <InfiniteRuningText />
        <div className="absolute -top-10 left-0 flex gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-white/40 transition-colors duration-300 hover:text-white"
            >
              {link.image}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
