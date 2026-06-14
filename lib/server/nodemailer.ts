const nodemailer = require("nodemailer");


export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.GOOGLE_APP_PASSWORD,
    },
});