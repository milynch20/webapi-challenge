const express = require('express')
const router = express.Router();
const dbaction = require('./actionModel');
router.use(express.json());

router.get('/', (req, res) =>{
  dbaction.get()
    .then( actions => {
      res.status(200).json(actions)
    })
    .catch( err => {
      res.status(500).json({ error: err, message:"Could not update data"})
    })
});

router.get("/:id", (req, res) =>{
  const id = req.params.id
  dbaction.get(id)
    .then( project => {
      res.status(200).json(project)
    })
    .catch( err => {
      res.status(500).json({ error: err, message:"Could not update data"})
    })
})

router.post('/', (req, res) => {
  const newAction = req.body
  dbaction.insert(newAction)
    .then( action =>{
      res.status(200).json(action)
    })
    .catch( err => {
      res.status(500).json({ error: err, message:"Could not update data"})
  })
})


router.put('/:id', (req, res) => {
  const updateAct = req.body
  const id = req.params.id

  dbaction.update(id, updateAct)
    .then( action => {
      res.status(200).json(action)
    })
    .catch( err => {
      res.status(500).json({ error: err, message:"Could not update data"})
    })

})

router.delete('/:id', (req, res)=>{
  const actionid = req.params.id
  dbaction.remove(actionid)
    .then( action =>{
      if(action){
        dbaction.remove(actionid).then(
          removeaction => {
            res.status(201).json(removeaction)
          }
        )
      }else{
        res.status(404).json({ error: err, mesage : "User does not exist"})
      }
    })
    .catch( err => {
      res.status(500).json({ error: err, message:"Could not update data"})
    })
})

module.exports = router;