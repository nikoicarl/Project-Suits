const Nodemailer = require('nodemailer');
const dotenv = require('dotenv')
const { ConfigPath } = require('./ConfigPath')
dotenv.config({ path: ConfigPath('mail.env', 0)})

class MailingApiModel {
    /**
     * This object or class is a mailing api model used to send mail in two ways, being it noreply or using individual emails.
     * Also resend same mail to back to the sender to keep track of sent messages
     * @param {string} mailingType - This param specifies which type of mail this should send. Using noreply or personal email address provided. If mailingType is set to noreply the object param shouldn't include usr and pwd fields.
     * @param {object} object - This param contains the actual mail options or content
     * @param {string} object.usr - This field or option should be passed into the object param when mailingType param is set to noreply. object.usr is the personal email address in which the mail will use to send the message. 
     * @param {string} object.pwd - This field or option should be passed into the object param when mailingType param is set to noreply. object.pwd is the password to the personal email address in which the mail will use to send the message.
     * @param {array} object.to - The recipient email addresses. It's in the format of an array.
     * @param {array} object.cc - The recipient email addresses. It's in the format of an array.
     * @param {string} object.subject - The subject of the mail.
     * @param {string} object.message - The actual message content, whether it's an HTML or plain text.
     * @param {string} object.messageType - The message type. If the passed message is an HTML content, use html else use text.
     * @param {string} object.outgoingServer - The outgoing server hostname or IP Address.
     * @param {int} object.outgoingPort - The outgoing server port number.
     */
    constructor(mailingType, object) {
        this.mailingType = mailingType;
        this.object = object;
    }

    async authenticate() {
        try {
            let usr, pwd;
            if (this.mailingType == 'noreply') {
                usr = getNoreplyAuth().usr;
                pwd = getNoreplyAuth().pwd;
            } else {
                usr = this.object.usr;
                pwd = this.object.pwd;
            }
    
            let auth = Nodemailer.createTransport({
                host: (this.mailingType == 'noreply') ? 'mail.'+(usr.split("@")[1]) : this.object.outgoingServer,
                port: (this.mailingType == 'noreply') ? 465 : this.object.outgoingPort,
                secure: true,
                auth: {
                    user: usr,
                    pass: pwd
                },
                tls:{
                    rejectUnauthorized: false
                }
            });
    
            return auth;
        } catch (error) {
            console.log(error);
        }
    }

    async sendMail() {
        try {
            this.object.to.push((this.mailingType == 'noreply') ? getNoreplyAuth().usr : this.object.usr);
            let options = {
                from: this.redefineFromAddress(),
                to: this.object.to.toString(),
                cc: this.object.cc == undefined ? '' : this.object.cc.toString(),
                subject: this.object.subject,
                envelope: {
                    from: this.redefineFromAddress(),
                    to: this.redifineEnvelopTo(),
                    cc: this.object.cc == undefined ? '' : this.object.cc.toString()
                }
            };
    
            if (this.object.messageType == 'html') {
                options['html'] = this.object.message;
            } else {
                options['text'] = this.object.message;
            }
            let result = await this.deliverMail(options);
            
            return result;
        } catch (error) {
            return {
                type: 'error',
                message: error
            };
        }
    }

    /**
     * This method sends or deliver the mail using the passed options param.
     * @param {object} options - The details or content ot the email message.
     * @param {string} options.from - The address of the sender.
     * @param {string} options.to - The recipient email address.
     * @param {string} options.subject - The subject of the mail.
     * @param {string} options.html - Optional, it is attached when the message type is html.
     * @param {string} options.text - Optional, it is attached when the message type is plain text.
     */
    async deliverMail(options) {
        try {
            const auth = await this.authenticate();
    
            return new Promise((resolve, reject) => {
                auth.sendMail(options, function(error, info) {
                    if (error) {
                        resolve({
                            type: 'error',
                            message: error
                        });
                    } else {
                        resolve({
                            type: 'success',
                            message: info
                        });
                    }
                }); 
            });
        } catch (error) {
            console.log(error);
            return {
                type: 'error',
                message: error
            };
        }
    }

    redefineFromAddress() {
        return `${(this.mailingType == 'noreply') ? getNoreplyAuth().usr.split("@")[0].toUcwords() : this.object.usr.split("@")[0].toUcwords()} <${(this.mailingType == 'noreply') ? getNoreplyAuth().usr : this.object.usr}>`;
    }

    redifineEnvelopTo() {
        const data = this.object.to;
        if (data.length > 0) {
            let string = '';
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                if (i == 0) {
                    string += `${item.split("@")[0].toUcwords()} <${item}>`;
                } else {
                    string += `, ${item.split("@")[0].toUcwords()} <${item}>`;
                }
            }
            return string;
        } else {
            return data.toString();
        }
    }
}

module.exports = MailingApiModel;


//AUthentications for the noreply mailing
const getNoreplyAuth = () => {
    return {
        usr: process.env.NO_REPLY_USR,
        pwd: process.env.NO_REPLY_PWD
    }
}

//Capitalize each word in a given string
String.prototype.toUcwords = function() {
    let value = this.toString();
    if (value === "" || value === null || value === undefined) {
        return '';
    } else {
        return value.replace(/\w+/g, function(a){
            return a.charAt(0).toUpperCase() + a.slice(1).toLowerCase();
        });
    }
}