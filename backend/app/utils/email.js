import nodemailer from 'nodemailer';

const sendEmail = async (to, token, name, id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: 'barathis1998@gmail.com',
        pass: 'qkqneomciqrevygw',
      },
    });

    const info = await transporter.sendMail({
      from: 'sender@example.com',
      to: to,
      subject: 'Verify your email',
      text: `Hello ${name}, Please verify your email. Verification Link:`,
      html: 'http://localhost:3000/verifyEmail/' + id + '/' + token,
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

export default sendEmail;
