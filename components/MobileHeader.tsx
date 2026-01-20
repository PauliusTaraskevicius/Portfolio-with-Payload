"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoIosClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useEffect, useState } from "react";
import { ContactDialog } from "./ContactDialog";
import { MobileLogo } from "./MobileLogo";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/projects",
    label: "Projects",
  },
  {
    href: "/about",
    label: "About",
  },
  // {
  //   href: "/contact",
  //   label: "Contact",
  // },
];

export const MobileHeader = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Drawer direction="top" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        <CiMenuBurger className="size-6 cursor-pointer text-white" />
      </DrawerTrigger>
      <DrawerContent>
        <VisuallyHidden>
          <DrawerTitle>Navigation Menu</DrawerTitle>
        </VisuallyHidden>
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <MobileLogo />
            <DrawerClose className="cursor-pointer" asChild>
              <Button variant="ghost" className="cursor-pointer" size="icon">
                <IoIosClose className="size-7 text-black" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="flex flex-col items-center justify-center space-y-4 py-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-3xl font-bold tracking-tighter uppercase"
            >
              {link.label}
            </Link>
          ))}
          <ContactDialog>
            <span className="text-3xl font-bold tracking-tighter uppercase">
              Contact Me
            </span>
          </ContactDialog>
        </div>
        <DrawerFooter>
          <div className="flex items-center justify-center gap-4">
            <Button
              className="cursor-pointer rounded-full border border-black/40"
              variant="ghost"
              size="icon"
              asChild
            >
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="size-3" />
              </a>
            </Button>
            <Button
              className="cursor-pointer rounded-full border border-black/40"
              variant="ghost"
              size="icon"
              asChild
            >
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="size-3" />
              </a>
            </Button>
            <Button
              className="cursor-pointer rounded-full border border-black/40"
              variant="ghost"
              size="icon"
              asChild
            >
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="size-3" />
              </a>
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
