import express from "express";

const setSuccessfulResponse = (obj,response,code=200) =>{
    response.status(code);
    response.json(obj);
}

const setErrorResponse = (err, response,code=500) => {
    response.status(code);
    response.json({
        error :{
            message: err.message
        }
    });
}

export default {setSuccessfulResponse,setErrorResponse};