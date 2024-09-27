const express = require('express')
const router = express.Router();
const dbproject = require('./projectModel');
router.use(express.json())


router.get('/', (req, res) =>{
  dbproject.get()
    .then( project => {
      res.status(200).json(project)
    })
    .catch( err => {
      res.status(500).json({ error: err, message:"Could not update data"})
    })
})


router.get("/:id", (req, res) =>{
  const id = req.params.id
  dbproject.get(id)
    .then( projectactions => {
      res.status(200).json(projectactions)
    })
    .catch( err => {
      res.status(500).json({ error: err, message:"Could not update data"})
    })
})

router.post('/', (req, res) => {
  const newProject = req.body
  console.log(newProject)
  dbproject.insert(newProject)
    .then( action =>{
      res.status(200).json(action)
    })
    .catch( err => {
      res.status(500).json({ error: err, message:"Could not update data"})
  })


})

router.put('/:id', (req, res) => {
  const updateProject = req.body
  const id = req.params.id

  dbproject.update(id, updateProject)
    .then( project => {
      res.status(200).json(project)
    })
    .catch( err => {
      res.status(500).json({ error: err, message:"Could not update data"})
    })

})



router.delete('/:id', (req, res)=>{
  const projectid = req.params.id
  dbproject.remove(projectid)
    .then( project =>{
      if(project){
        dbproject.remove(project).then(
          removeproject => {
            res.status(201).json(removeproject)
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

module.exports  = router;