import {
  data,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "jotai";

import "./tailwind.css";

import "./styles/globals.scss";
import { authTokenExists, refreshToken } from "./api/server.auth";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "./components/ui/sonner";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export async function loader({ request }: { request: Request }) {
  if(!authTokenExists({request})) {
    return new Response();
  }

  const response = await refreshToken({ request });

  if(!response) {
    return new Response();
  }

  return data({
    access_token: response?.data?.access_token
  });
}

export default function App() {
  const [queryClient, setQueryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000
      }
    }
  }));

  const data = useLoaderData<typeof loader>();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider access_token={data.access_token}>
        <Provider>
          <Outlet />
          <Toaster richColors />
        </Provider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
