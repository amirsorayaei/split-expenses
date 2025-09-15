import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isSignInPage = createRouteMatcher(["/sign-in(.*)"]);
const isSignUpPage = createRouteMatcher(["/register(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/", // landing page
  "/sign-in(.*)",
  "/register(.*)",
]);
const isProtectedRoute = createRouteMatcher(["/groups(.*)", "/dashboard(.*)"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  // Redirect authenticated users away from auth pages
  const isAuthenticated = await convexAuth.isAuthenticated();

  if ((isSignInPage(request) || isSignUpPage(request)) && isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/groups");
  }

  // Protect routes that require authentication
  if (isProtectedRoute(request) && !isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/sign-in");
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
