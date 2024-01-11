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
            pages: ({ credentials }) => ({
                signIn: `/auth/signin-${credentials.type}`,  // Dynamic signIn page based on credentials.type
                error: '/auth/error',
            }),
            async authorize(credentials, req) {
                console.log(credentials.type)
                if (credentials.type === 'user') {
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
                } else if (credentials.type === 'student') {
                    const payload = {
                        username: credentials.username,
                        password: credentials.password,
                    };
                    
                    let student
                    const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/loginStudent`,{
                        "username": payload.username,
                        "password": payload.password
                    }).then(function (response) {
                        student = response.data
                        
                    }).catch(function (error) {
                        throw new Error('Login Failed')
                    });

                    return student
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
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