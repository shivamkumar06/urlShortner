const express =  require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');


const Url = require('../models/Url');



//@route POST /api/url/shorten
//@desc Create Short URL
router.post('/shorten', async (req,res) => {
    
    const { longUrl } = req.body;
    console.log(longUrl);
    const baseUrl = config.get('baseUrl');


    //Check Base Url
    if(!validUrl.isUri(baseUrl)) {
        return res.send(401).json('Invalid base Url');
    }

    // create url code
    const urlCode = shortid.generate();

    // Check long Url
    if(validUrl.isUri(longUrl)) {
        try {
           let url = await Url.findOne({ longUrl });

           if(url){
               res.json(url);
           } else{
               const shortUrl = baseUrl + '/' + urlCode;

               url = new Url({
                longUrl,
                shortUrl,
                urlCode,
                date: new Date()
               });

               await url.save();
               res.json(url);
           }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    } else{
        res.status(401).json('Invalid Long Url');
    }
});

module.exports = router;