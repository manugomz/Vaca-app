function continueDecorator(controllerFunction){

    return async (req,res,next)=>{
        try{
            await controllerFunction(req,res);
            next();
        }catch(error){
            next(error);
        }finally{
        }
    }
}

export default continueDecorator;
