import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
    session:{
        strategy:"jwt"
    },
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'my-project',
            credentials: {},
            async authorize(credentials, req) {
                const payload = {
                    username: credentials.username,
                    password: credentials.password,
                };
                
                let user
                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/login`,{
                    "username": payload.username,
                    "password": payload.password
                }).then(function (response) {
                    user = response.data
                    
                }).catch(function (error) {
                    throw new Error('Login Failed')
                });

                return user
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.userId;
                token.accessToken = user.token;
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.user_id = token.userId;
            session.user.role = token.role;
            session.user.accessTokenExpires = token.accessTokenExpires;
            
            return session;
        },
    },
    
});