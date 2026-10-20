const Media = require("../models/Media")
const logger = require("../utils/logger")

const handlPostDeleted = async (event) => {
    console.log(event,"eventeventevent");
    const {postId,mediaIds} = event
    try{
        const mediaToDelete = await Media.find({_id : {$in: mediaIds}})

        for(const media of mediaToDelete){
            await deleteMediaFromCloudinary(media.publicId)
            await Media.findByIdAndDelete(media._id)

            logger.info(`Deleted media ${media._id} associated with this deleted post ${postId}`)
        }

        logger.info(`Process deletion for media for post id ${postid}`)
    }catch(e){
        logger.error(e,'Error occured while media deletion')
    }
}; 

module.exports = {handlPostDeleted}
