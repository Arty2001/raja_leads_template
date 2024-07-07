import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb'; // Update the path to your MongoDB setup file
import bcrypt from "bcryptjs";


export async function POST (req:NextRequest) {

    const {password, email} = await req.json();   //getting token from the url

    // connecting to databse
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ 
        email
     });

    const hashedPassword= await bcrypt.hash(password,5);
    const result = await usersCollection.updateOne(
        { email: email },
        {
          $set: {
            password:hashedPassword,
            resetToken:undefined,
            resetTokenExpiry:undefined
          }
        }
      );
    if (!result)
      {
        return new NextResponse("Password was not saved",{status:400});
      }
    
    return new NextResponse(JSON.stringify(result), {status:200})

}