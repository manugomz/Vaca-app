const groupService = require("../services/groups");

const getAll = (req,res)=>{
    const sort = req.query.sort || "asc";
    const groups = groupService.getAll(sort);
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



const create = (req,res) =>{
    const newGroup=req.body;
    const createdGroup= groupService.create(newGroup);
    res.status(201).json(createdGroup);  
}

module.exports={
    getAll,
    get,
    create
}
