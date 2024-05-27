import { getServerSession } from "next-auth";
import { authConfig } from "../../../configs/auth";
import SignOutCta from "@/components/SignOutCta";


export default async function Dashboard() {
    const session = await getServerSession(authConfig);

    return (
        <div>
            <h1>DashBoard</h1>
            {session && session.user?.email}
            <SignOutCta />
        </div>
    );
}
