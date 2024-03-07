export default class ApplicationError extends Error{
    constructor(message, code) {
        super(message);
        this.code = code;
      }
}


export const errorHandler = (err, req, res, next)=>{
  if(err instanceof ApplicationError){
    const {message ,  code} = err;
    res.render('error404', {message})
  }else{
    console.error(err); // Log the error for debugging purposes
    res.status(500).render('error404', {message:"Internal Server Error"})
  
  }
}