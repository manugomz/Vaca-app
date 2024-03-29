const groupService = require("../services/groups");

const getAll = (req,res)=>{
    const groups = groupService.getAll();
    res.json(groups);
}

const get = (req,res)=>{
    const groupName=req.params.name;
    const group = groupService.get(groupName);
    if (!group){
        res.status(404);
        return;
    }
    res.status(200).json(group);
}

// const create = (req,res) =>{
//     const newPet=req.body;
//     const createdPet= groupService.create(newPet);
//     res.status(201).json(createdPet);  
// }

module.exports={
    getAll,
    get,
}