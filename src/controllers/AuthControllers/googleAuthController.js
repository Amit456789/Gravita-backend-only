// @desc - google logout
// @route - GET /auth/google/login/success
// @access - public
export const googleLogin = async(req,res)=>{
  try{
    console.log(req.user)
    if(req?.user){
      return res.status(200).json({success:true,message:"User Created Successfully"})
    }else{
      return res.status(400).json({success:false,message:"User is Un-Authorized"})
    }
  }catch(error){
    return res.status(500).json({success:false,message:`Internal Server Error! ${error.message}`})
  }
}



// @desc - google logout
// @route - GET /auth/google/logout
// @access - public

export const googleLogout = async (req, res) => {
    req.session.destroy((e) => {
      try {
        req.logOut(() => {
          res.clearCookie("ACCESS_TOKEN");
          res.clearCookie("google-oauth-session");
          req.cookies = "";
          res.redirect(
            200,
            `${
              process.env.NODE_ENV === "production"
                ? process.env.FRONTEND_URL_PRODUCTION
                : process.env.FRONTEND_URL_DEVELOPMENT
  
              // It will destroy your session from app but if you want complete logout even from google account you can redirect to
              // https://mail.google.com/mail/u/0/?logout&hl=en
            }`
          );
          // res
          //   .status(200)
          //   .json({ status: "SUCCESS", msg: "Log-out successfully" });
        });
      } catch (error) {
        console.log(error.message);
      }
    });
  };