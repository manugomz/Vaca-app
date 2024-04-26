import Service from "../services/groups.service.js";

const Controller = () => {
  const getAll = async (req, res) => {
    const service = Service(req.dbClient);

    const groups = await service.getAll();
    res.status(200).json(groups);
  };

  const getById = async (req, res) => {
    const service = Service(req.dbClient);

    const group = await service.getById(req.params.id);

    if (!group) {
      res.status(404).end();
    } else {
      res.status(200).json(group);
    }
  };

  const deleteById = async (req, res) => {
    const service = Service(req.dbClient);
    const deleted = await service.deleteById(req.params.id);

    if (!deleted) {
      res.status(404).end();
    } else {
      res.status(200).end();
    }
  };

  const create = async (req, res) => {
    const service = Service(req.dbClient);
    const group = req.body;
    const createdGroup = await service.create(group);
    res.status(201).json(createdGroup);
  };

  return {
    getAll,
    getById,
    deleteById,
    create,
  };
};

export default Controller;

// import groupService from('../services/groups');

// const getAll = async (req,res)=>{
//     const sort = req.query.sort || "asc";
//     const groups = groupService.getAll(sort);
//     res.json(groups);
// }

// const get = async(req,res)=>{
//     const groupName=req.params.name;
//     const group = groupService.get(groupName);
//     if (!group){
//         res.status(404);
//         return;
//     }
//     res.status(200).json(group);
// }

// const create = async(req,res) =>{
//     const newGroup=req.body;
//     const createdGroup= groupService.create(newGroup);
//     res.status(201).json(createdGroup);
// }

// module.exports={
//     getAll,
//     get,
//     create
// }
