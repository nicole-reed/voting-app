import { Poll } from '../../../models/Poll'
import connectDB from '../../../middleware/mongodb'
import jwt from 'jsonwebtoken'
import { NotFoundError } from '../../../errors/notFound.error'
import { BadRequestError } from '../../../errors/badRequest.error'


const handler = async (req, res) => {

    if (req.method === 'GET') {
        try {
            const { createdBy } = req.query

            const polls = createdBy ? await Poll.find({ createdBy }) : await Poll.find()

            res.send(polls)
        } catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }

    } else if (req.method === 'POST') {
        try {
            const { authorization } = req.headers
            const { title, answers } = req.body


            if (!authorization) {
                throw new Error('forbidden')
            }

            const decodedJwt = jwt.verify(authorization, process.env.SECRET)

            if (!title) {
                throw new BadRequestError('must contain title')
            }

            if (!answers) {
                throw new BadRequestError('must contain answers')
            }

            if (!Array.isArray(answers)) {
                throw new BadRequestError('answers must be array of strings')
            }

            const answersMap = {}
            for (let i = 0; i < answers.length; i++) {
                const answer = answers[i]
                answersMap[answer] = 0
            }
            const poll = new Poll({ title, createdBy: decodedJwt.email, answers: answersMap })

            await poll.save()


            res.send(`successfully created poll ${poll.title}`)
        } catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }

    } else {
        res.status(400).send(`no endpoint ${req.method} /polls`)
    }
}

export default connectDB(handler)