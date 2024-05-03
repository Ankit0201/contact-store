const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
};

const createError = (status, message) => {
  const err = new Error()
  err.status = status
  err.message = message
  return err

}

const tryCatchHandler = (cb) => async (req,res,next) => {
  try {
    await cb(req,res,next)
  } catch (error) {
    next(error)
  }
}

const successHandler = (res,message=null,data={},status = 200)=>{
  return res.status(status).json({
      success:true,
      message:message,
      data
  })
}


module.exports = { errorHandler, createError,tryCatchHandler,successHandler };
