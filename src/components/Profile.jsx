import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Hola {session?.user?.name}</h1>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          alt="Avatar"
          width={80}
          height={80}
          className="rounded-full"
        />
      )}
    </div>
  );
}