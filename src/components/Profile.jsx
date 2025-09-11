// "use client";

// // import { useSession } from "next-auth/react";
// import Image from "next/image";
// import { getServerSession } from "next-auth";

// export default async function Profile() {
//   const session = await getServerSession();

//   if (!session) {
//     return <p>No autenticado</p>;
//   }

//   return (
//     <div>
//       <h1>Hola {session?.user?.name}</h1>
//       {session?.user?.image && (
//         <Image
//           src={session.user.image}
//           alt="Avatar"
//           width={80}
//           height={80}
//           className="rounded-full"
//         />
//       )}
//     </div>
//   );
// }