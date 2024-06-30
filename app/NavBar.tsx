"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  AiFillEdit,
  AiOutlinePlus,
  AiOutlineUnorderedList,
} from "react-icons/ai";
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
  const { data: session } = useSession();

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillEdit />
            </Link>
            <NavLinks />
            {session && (
              <>
                <Link href="/members/new">
                  <Button variant="soft">
                    <AiOutlinePlus />
                  </Button>
                </Link>
                <Link href="/members">
                  <Button variant="soft">
                    <AiOutlineUnorderedList />
                  </Button>
                </Link>
              </>
            )}
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
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

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
        session
      ) &&
      (!link.authRequired || session)
  );

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <DropdownMenu.Root
      open={menuOpen}
      onOpenChange={(isOpen) => setMenuOpen(isOpen)}
    >
      <DropdownMenuTrigger>
        <Button variant="soft">
          <CiMenuBurger />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <ul className="flex flex-col">
          {filteredLinks.map((link) => (
            <DropdownMenuItem key={link.href} onClick={handleLinkClick}>
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
  );
};

const AuthStatus = () => {
  const { data: session } = useSession();

  return (
    <Box>
      {session ? (
        <Link className="nav-link" href="/api/auth/signout">
          Log Out
        </Link>
      ) : (
        <Link href="/api/auth/signin">Login</Link>
      )}
    </Box>
  );
};

const SessionUser = () => {
  const { data: session } = useSession();

  return <Box>{session && <p>{session.user?.email}</p>}</Box>;
};

export default NavBar;
