const Limit = require('../models/limit');

const RATE_LIMIT = 80000;

// Middleware to control user number of characters per day to justify
isLimitReached = (req, res, next) => {

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const userId = req.userId;
    const text = req.body;

    if(!text){
        return res.status(400).json({error: 'Text is empty'});
    }

    const characters = text.length;

    Limit.findOne({userId : userId, date: today})
        .then(data => {
            if(!data){
                const limit = new Limit({
                    userId: userId,
                    date: today,
                    characters: characters
                });

                limit.save()
                    .then(()=>{
                        next();
                    })
                    .catch(error =>{
                        return res.status(400).json({error: 'Error during limit creation', message: error})
                    });
            }

            charactersUpdate = characters + data.characters;

            if(charactersUpdate > RATE_LIMIT){
                return res.status(402).json(
                    {
                        error: `Payment Required : You\'ve reached the free daily limit of our service. ${RATE_LIMIT - data.characters} characters remaining...`
                    });
            }

            Limit.updateOne({_id: data._id}, {characters: charactersUpdate})
                .then(() => {
                    return next();
                })
                .catch(error => {
                    return res.status(400).json({error: 'Error during limit update', message: error})
                })
        })
        .catch(()=>{
            return res.status(400).json({error: 'Error during limit update', message: error});
        });
}

module.exports = { isLimitReached };