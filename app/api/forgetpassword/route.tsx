import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb'; // Update the path to your MongoDB setup file
import crypto from 'crypto';
import sgMail from "@sendgrid/mail"
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

/**
 * 
 * @param req 
 * @returns 
 * 
 * The forgetpassword API route has the responsability of assigning a hashed user token and token expiry date entries 
 * to the user's collection in the database. Additionally, the router sends a message to user's email which contains the link 
 * that will allow the user to update the password. This functionality is possible due to sendgrid/mail API library. 
 */


export async function POST (req:NextRequest) {

try{
const {email} = await req.json();

console.log("EMAIL",email);
const client = await clientPromise;
const db = client.db();
const usersCollection = db.collection('users');

const existingUser = await usersCollection.findOne({ email: email });

if (!existingUser) {
    return NextResponse.json({ message: 'User does not exist' }, { status: 400 });
}

const resetToken = crypto.randomBytes(20).toString('hex');  //generate random user token in hexadecimal format to be included in url
const passwordResetToken =  crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");     // hashed random user token to be stored in database
const passwordResetExpires = Date.now() + 3600000; //password expires within one hour from current time,

console.log("EXPIRY", passwordResetExpires)

const result = await usersCollection.updateOne(
    { email: email },
    {
      $set: {
        resetToken: passwordResetToken,
        resetTokenExpiry: passwordResetExpires
      }
    }
  );

console.log("RESULT",result)
const reseturl= `localhost:3000/resetpassword/${resetToken}`; //creating the URL

console.log(reseturl);

const body ="Reset Password by clicking on following url " + reseturl; //constructing body of the message

const msg = {   //constructing a message object
    to:email,
    from:"raja.developers4@gmail.com",
    subject:"Reset Password",
    text:body
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY || ""); //assigning API key

sgMail
    .send(msg)
    .then (() => {  //sending message to client
        return new NextResponse("Reset password email is sent.", { status:200 });
    })
    .catch(async (error) => { 
        existingUser.resetToken=undefined;
        existingUser.resetTokenExpiry=undefined;
        //await existingUser.save();  //saving info in the database

        return new NextResponse("Failed sending email. Try again", {
            status: 400,
        });
    });

try{

    //await existingUser.save();  // saving info in the databse
    return new NextResponse("Email is sent",{
        status:200,
    });
 } catch(error:any){
    return new NextResponse( error, {
        status: 500,
    });
 }

  


}catch (error) {
    console.error('Error adding user:', error);
    return NextResponse.json({ error }, { status: 500 });
  }

};