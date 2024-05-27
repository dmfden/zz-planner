'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";

export default function SignOutCta(): ReactNode {
    const session = useSession();
    if (!session) {
        return
    }
    return (
        <>

            {session?.data && <Link href={"#"} onClick={() => signOut({ callbackUrl: '/' })}>Sign out</Link>}
        </>
    )
}