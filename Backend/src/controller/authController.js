const {check, validationResult} = require("express-validator");
exports.signUp = [
    check(fullName)
    .trim()
    .notEmpty()
    .withMessage("Full Name cannot be empty..")
    .isString()
    .withMessage("Should be a String.."),
    // add regex to see if there is space between first name and second name
    check("email")
    .trim()
    .isEmail()
    .withMessage("Email should be in the correct format.."),
    check("phoneNumber")
    .isNumeric()
    .withMessage("Phone Number should be a Number...")
    .isLength({min: 10, max: 10})
    .withMessage("Phone Number Should only be of 10 digits.."),
    check("password")
    .trim()
    .isLength({min: 6, max: 10})
    .isStrongPassword()
    .withMessage("Please enter a Strong password.."),
    check("confirmPassword")
    .trim()
    .custom((value, {req}) => {
        if ( value !== req.body.password){
            throw new Error("Password do not match..");
        }
        return true;
    }),
    check("verifyCode")
    .trim()
    .isNumeric()
    .withMessage("Code should be a number.."),
    async(req, res) => {
    try {
        const {fullName, email, phoneNumber, password, confirmPassword, verifyCode} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json(errors);
        }
        


    } catch (error) {
        
    }
}]