// ---------------------------------------------Imports---------------------------------------------------
import { feedbackMail } from "../../utils/feedbackMail.js";
// -------------------------------------------------------------------------------------------------------



// @desc - Feedback Sending
// @route - POST /feedback
// @access - public
// @payload - JSON raw body no Form data

export const sendFeedback = async(req,res)=>{
    try{    
        const {name,email,feedbackContent} = req.body
        
        if(!name || !email || !feedbackContent){
            return res.status(400).json({
                success:false,
                message:"Invalid Payload Data"
            })
        }

        feedbackMail(name,email,feedbackContent).then((sent)=>{
            return res.status(200).json({
                success:true,
                message:sent
            })
        }).catch((error)=>{
            return res.status(400).json({
                success:false,
                message:error.message
            })
        });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Internal Server Error! ${error.message}`
        })
    }
}
