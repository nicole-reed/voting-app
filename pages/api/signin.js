import { User } from '../../models/User'
import connectDB from '../../middleware/mongodb'
import { randomDigits } from 'crypto-secure-random-digit'
import { BadRequestError } from '../../errors/badRequest.error'
import { NotFoundError } from '../../errors/notFound.error'
import nodemailer from 'nodemailer'
import { google } from 'googleapis'


const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })


const handler = async (req, res) => {

    if (req.method === 'POST') {
        try {
            const email = req.body.email

            if (!email) {
                throw new BadRequestError('email is required')
            }

            const user = await User.findOne({ email })

            if (!user) {
                throw new NotFoundError('user does not exist')
            }

            const loginCode = randomDigits(6).join('')
            const loginCodeCreatedAt = new Date()


            await user.updateOne({ loginCode, loginCodeCreatedAt, loginCodeAttempts: 0 })

            await sendEmail(email, loginCode)
            res.send('successfully signed in')
        } catch (error) {
            res.status(error.statussCode || 500).send(error.message)
        }

    } else {
        res.status(400).send(`no endpoint ${req.method} /signin`)
    }
}

export default connectDB(handler)


async function sendEmail(email, loginCode) {
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
