export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/edit-room", "/create-room", "/my-rooms"],
};
