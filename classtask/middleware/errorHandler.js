const errorHandler = async (errorHandler,req,resizeBy,next) => {
    let Error = {...err};
    Error.message= err.message;
    res.status(res.statusCode || 500).json({
        success:false,
        Error
    })
}