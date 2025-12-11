import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

// verify transporter at startup
transporter.verify()
    .then(() => console.log('SMTP transporter verified'))
    .catch(err => console.error('SMTP transporter verification failed', err && err.message ? err.message : err))

export const sendEmail = async ({ to, subject, text, html }) => {
    const msg = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text,
        html
    }

    try {
        const info = await transporter.sendMail(msg)
        // console.log('Email sent:', info && info.messageId)
        return info
    } catch (err) {
        console.error('Error sending email:', err && err.message ? err.message : err)
        throw err
    }
}

export default sendEmail