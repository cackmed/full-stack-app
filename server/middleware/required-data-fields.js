module.exports = (req, res, next) => {
    let isError = false;
    const errorBody = { statusCode: 400 }

    if(!req.body.firstName) { 
        isError = true
        errorBody["firstName field missing"] = 'Fill out first name input before resubmitting.'
     }
    if(!req.body.lastName) { 
        isError = true 
        errorBody["lastName field missing"] = 'Fill out last name input before resubmitting.'
    }
    if(!req.body.supervisor) { 
        isError = true
        errorBody["supervisor field missing"] = 'Select your supervisor from the dropdown before resubmitting.'
    }
    if(isError) {
        res.status(400).json(errorBody);
    } else {
        next();
    }
  };
