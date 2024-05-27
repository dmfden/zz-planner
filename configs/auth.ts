import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import { compare } from 'bcrypt';

export const authConfig: AuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email: { label: 'email', type: 'email', required: true },
                password: { label: 'password', type: 'password', required: true },
            },

            async authorize(credentials) {
                const user = await prisma.user.findUnique({ where: { email: credentials?.email } });
                if (user) {
                    console.log(user);
                    const isEqual = await compare(credentials!.password, user.password);
                    console.log(isEqual);
                    if (isEqual) {
                        return user;
                    }
                }
                return null;
            },
        }),
    ],
    pages: {
        newUser: '/register', // New users will be directed here on first sign in (leave the property out if not of interest)
    },
};

