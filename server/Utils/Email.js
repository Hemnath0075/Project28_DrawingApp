const sgMail = require("@sendgrid/mail")
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//RESET PASSWORD SENDGRID CODE
module.exports.sendPasswordReset=(email,token)=>{
  const ResetPswdMsg = {
    to: email, // Change to your recipient
    from: 'hemnath0075@gmail.com', // Change to your verified sender
    subject: 'Reset Password',
    text: 'Reset password',
    html: `<p>A request for password reset has been generated from your account.</p>
    <h5>Click on this <a href="${process.env.FRONTEND}/resetPassword/${token}">Link</a> to reset password</h5>`,
  }
  console.log(ResetPswdMsg.to)
  sgMail
  .send(ResetPswdMsg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })
} 

