import { NextResponse, type NextRequest } from "next/server";
import { recipes } from "@/content/recipes";
import { styles } from "@/content/styles";

// These pages stream, so a notFound() inside them can't change the status after the
// page has started sending. Check the address first, and send unknown recipes and
// styles to a path with no page, which Next answers with its 404 page and a 404 status.

const known = new Set([
  ...styles.flatMap((style) => [`/mood-boards/${style.slug}`, `/design-systems/${style.slug}`]),
  ...recipes.map((recipe) => `/recipes/${recipe.slug}`),
]);

export function proxy(request: NextRequest) {
  if (known.has(request.nextUrl.pathname)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/not-found", request.url));
}

export const config = {
  matcher: ["/mood-boards/:path+", "/design-systems/:path+", "/recipes/:path+"],
};
