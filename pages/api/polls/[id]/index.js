import { Poll } from '../../../../models/Poll'
import connectDB from '../../../../middleware/mongodb'
import jwt from 'jsonwebtoken'
import { NotFoundError } from '../../../../errors/notFound.error'


const handler = async (req, res) => {

    if (req.method === 'DELETE') {
        try {
            const { authorization } = req.headers

            if (!authorization) {
                throw new Error('forbidden')
            }

            const decodedJwt = jwt.verify(authorization, process.env.SECRET)

            const { id } = req.query

            const poll = await Poll.findOne({ _id: id })

            if (!poll) {
                throw new NotFoundError(`poll with _id ${id} does not exist`)
            }

            if (poll.createdBy !== decodedJwt.email) {
                throw new Error('forbidden')
            }

            await poll.deleteOne()

            res.send('poll successfully deleted')
        } catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }

    } else {
        res.status(400).send(`no endpoint ${req.method} /polls`)
    }
}

export default connectDB(handler)