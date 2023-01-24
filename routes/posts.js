var express = require('express');
var router = express.Router();
var {faker} =require('@faker-js/faker')
const { body, validationResult } = require('express-validator');
/* GET home page. */
router.get('/', function(req, res, next) {
    const posts=Array.from({length:30},(el,index)=>({
        id:index+1,
        title:faker.lorem.text(),
        text:faker.lorem.words(30),
        created_at:faker.date.birthdate()
    }))
  res.json(posts)
});

router.post("/",body('title').notEmpty(),body('text').notEmpty(), function(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    res.json({
        message:"created post successfully",
        data:{...req.body}
    })
})

router.get("/:id",function(req,res){
    return res.json({
        id:req.params.id,
        title:faker.lorem.text(),
        text:faker.lorem.words(30),
        created_at:faker.date.birthdate()
    })
})

router.put("/:id",body('title').notEmpty(),body('text').notEmpty(),function(req,res){
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    res.json({
        message:"updated post successfully",
        data:{...req.body,id:req.params.id}
    })
})

router.delete("/:id",function(req,res){
    res.json({
        message:"deleted post successfully",
        data:{title:faker.lorem.text(),
            text:faker.lorem.words(30),
            created_at:faker.date.birthdate(),id:req.params.id}
    })
})

module.exports = router;
