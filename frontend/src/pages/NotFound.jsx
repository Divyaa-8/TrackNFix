import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="grid min-h-screen place-items-center bg-slate-50 px-4 text-center">
    <div>
      <p className="text-7xl font-black text-brand">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-slate-500">The page you are looking for does not exist.</p>
      <Link className="btn-primary mt-6" to="/">Go Home</Link>
    </div>
  </main>
);

export default NotFound;
