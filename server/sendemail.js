const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

export async function sendEmail(email, loginCode) {
    try {
        const accessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'fromthedeskofnicreed@gmail.com',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        await transport.sendMail({
            from: 'fromthedeskofnicreed@gmail.com',
            to: email,
            subject: 'Your login code.',
            text: 'Here is your login code:',
            html: `
            <h2>Please Use The Login Code Below To Sign Into Your Account</h2>
            <h1>Your Code: ${loginCode}</h1>
            `,
        })

    } catch (error) {
        return error
    }
}
