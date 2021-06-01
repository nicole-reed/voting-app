import { Poll } from '../../../../models/Poll'
import connectDB from '../../../../middleware/mongodb'
import jwt from 'jsonwebtoken'
import { NotFoundError } from '../../../../errors/notFound.error'
import { BadRequestError } from '../../../../errors/badRequest.error'

const handler = async (req, res) => {

    if (req.method === 'PUT') {
        try {
            const { id } = req.query
            if (!id) {
                throw new BadRequestError('please enter id')
            }

            const poll = await Poll.findOne({ _id: id })
            if (!poll) {
                throw new NotFoundError(`poll with _id ${id} does not exist`)
            }

            const { answer } = req.body
            if (!answer) {
                throw new BadRequestError('please enter answer')
            }

            if (!poll.answers.has(answer)) {
                throw new BadRequestError('please enter valid answer')
            }

            await poll.updateOne({ $inc: { [`answers.${answer}`]: 1 } })

            res.send('success')
        } catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }

    } else {
        res.status(400).send(`poll not found`)
    }
}

export default connectDB(handler)