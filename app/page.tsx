// app/page.tsx (Server Component)
export const metadata = {
  title: "Project | Full Stack App",
  description: "Landing page of your full-stack application",
};

import Home from './HomeClient';

export default function Page() {
  return <Home />;
}
