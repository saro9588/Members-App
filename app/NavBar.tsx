"use client";
import Link from "next/link";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Box,
  Container,
  Flex,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
} from "@radix-ui/themes";
import { CiMenuBurger } from "react-icons/ci";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillEdit />
            </Link>
            <NavLinks />
          </Flex>
          <Flex>
            <Box>
              <SessionUser />
              <AuthStatus />
            </Box>
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const { status } = useSession();

  const links = [
    { label: "Create Account", href: "/register" },
    { label: "Log In", href: "/login" },
    { label: "Dashboard", href: "/", authRequired: true },
    { label: "New Member", href: "/members/new", authRequired: true },
    { label: "Members", href: "/members", authRequired: true },
  ];
  const filteredLinks = links.filter(
    (link) =>
      !(
        (link.label === "Create Account" || link.label === "Log In") &&
        status === "authenticated"
      ) &&
      (!link.authRequired || status === "authenticated")
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenuTrigger>
        <Button variant="soft">
          <CiMenuBurger />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <ul className="flex flex-col">
          {filteredLinks.map((link) => (
            <DropdownMenuItem key={link.href}>
              <Link
                className={classnames({
                  "nav-link": true,
                  "!text-zinc-900": link.href === currentPath,
                })}
                href={link.href}
              >
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu.Root>
    // <ul className="flex space-x-6 ">
    //   {filteredLinks.map((link) => (
    //     <li key={link.href}>
    //       <Link
    //         className={classnames({
    //           "nav-link": true,
    //           "!text-zinc-900": link.href === currentPath,
    //         })}
    //         href={link.href}
    //       >
    //         {link.label}
    //       </Link>
    //     </li>
    //   ))}
    // </ul>
  );
};

const AuthStatus = () => {
  const { status } = useSession();

  return (
    <Box>
      {status === "authenticated" && (
        <Link className="nav-link" href="/api/auth/signout">
          Log Out
        </Link>
      )}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin">Login</Link>
      )}
    </Box>
  );
};

const SessionUser = () => {
  const { data, status } = useSession();

  return <Box>{status === "authenticated" && <p>{data.user?.email}</p>}</Box>;
};

export default NavBar;
