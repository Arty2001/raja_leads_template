import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb'; // Update the path to your MongoDB setup file


export async function POST (req:NextRequest) {

    const {token} = await req.json();   //getting token from the url

    // connecting to databse
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection('users');

    const hashedToken= crypto.createHash("sha256").update(token).digest("hex"); //creating hashed version of token in hexadecimal format
    const existingUser = await usersCollection.findOne({ 
        resetToken:hashedToken,
        resetTokenExpiry: {$gt:Date.now()}  // Matches documents where the resetTokenExpiry field is greater than the current timestamp 
     });

    if (!existingUser)
    {
        return new NextResponse("Invalid token or has expired",{status:400});
    }
    console.log("User exists");
    return new NextResponse(JSON.stringify(existingUser), {status:200})
}