import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect(`/sign-in`);

  return (
    <div>
      Essa é a página inicial
    </div>
  );
}
