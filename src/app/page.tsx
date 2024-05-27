//import styles from "./page.module.css";
import { authConfig } from "../../configs/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";


export default async function Home() {
  const session = await getServerSession(authConfig);
  console.log(session);
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div>
      <h1>HOME</h1>
      <Link href={'/register'}>Registration</Link>
      <Link href={"/api/auth/signin"}> Sign In</Link>
    </div>
  );
}
