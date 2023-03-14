const Reference = require('../models/Reference')

const getAllReferences = async (req, res) => {
    try {
        const allReferences = await Reference.find({})
        console.log('allReferences', allReferences.length)

        if (allReferences.length > 0) {
            res.status(200).send(allReferences)
        } else {
            res.status(204).json({ msg: 'There are no registered references' })
        }
    } catch (error) {
        console.log('getAllReferences Error:', error)
    }
}

const createReference = async (req, res) => {
    const { name } = req.body
    const reference = name.toLowerCase().trim()

    try {
        const referenceExists = await Reference.findOne({ name: reference })

        if (referenceExists) {
            res.status(409).send({ msg: 'The reference already exists' })
        } else {
            const newReference = new Reference({ name: reference })
            const savedReference = await newReference.save()
            res.status(200).send({ msg: 'Reference successfully added ', savedReference })
        }
    } catch (error) {
        console.log('createReference Error:', error)
    }
}

const updateReference = async (req, res) => {
    const { newName, id } = req.body

    try {
        const referenceExists = await Reference.findById(id)

        if (!referenceExists) {
            res.status(404).send({ msg: 'Reference not found' })
        } else {
            const referenceUpdated = await Reference.findByIdAndUpdate(id, { name: newName }, { new: true })
            res.status(200).send({ msg: 'Reference updated successfully', referenceUpdated })
        }
    } catch (error) {
        console.log('updateReference Error:', error)
        res.status(500).send({ msg: 'Error updating the reference' })
    }
}

const deleteReference = async (req, res) => {
    const { id } = req.body

    try {
        const result = await Reference.deleteOne({ _id: id })

        if (result.deletedCount === 0) {
            res.status(404).send({ msg: 'Reference not found' })
        } else {
            res.status(200).send({ msg: 'Reference successfully deleted' })
        }
    } catch (error) {
        console.log('deleteReference Error:', error)
    }
}

module.exports = {
    getAllReferences,
    createReference,
    updateReference,
    deleteReference
}
