"use client";
import Link from "next/link";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

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
          <AuthStatus />
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
    (link) => !link.authRequired || status === "authenticated"
  );
  return (
    <ul className="flex space-x-6 ">
      {filteredLinks.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

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

export default NavBar;
