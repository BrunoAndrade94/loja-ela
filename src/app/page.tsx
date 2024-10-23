import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-7">
      <Link href="/sign-in">
        <Button> Acessar Aqui
        </Button>
      </Link>
    </div>
  );
}
