import axios from "axios";

export const humanVerification = async (req, res, next) => {
  const { tokenReCaptcha } = JSON.parse(req.body);

  try {
    // Sending secret key and response token to Google Recaptcha API for authentication.
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${tokenReCaptcha}`
    );

    // Check response status and send back to the client-side
    if (response.data.success) {
      next();
      //       res.send("Human 👨 👩");
    } else {
      res.status(400).send("Error verifying reCAPTCHA");
      //       res.send("Robot 🤖");
    }
  } catch (error) {
    // Handle any errors that occur during the reCAPTCHA verification process
    console.error(error);
    return res.status(500).json({
      message: error?.message || error || "Error verifying reCAPTCHA",
    });
  }
};
