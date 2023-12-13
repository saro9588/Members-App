export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/members/new", "/members", "/members/:id/notes", "/members/:id+"],
};
