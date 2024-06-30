import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export async function GET(req: NextRequest) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const queueObjectCollection = db.collection('queueObject');
  
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
  
      if (id) {
        if (!ObjectId.isValid(id)) {
          return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
        }
  
        const queueObject = await queueObjectCollection.findOne({ _id: new ObjectId(id) });
  
        if (!queueObject) {
          return NextResponse.json({ message: 'queueObject not found' }, { status: 404 });
        }
        // To fetch leads related to the current queueObject 
        //TODO: Ensure what we will do in the case where the lead DOESN'T get passed to her team and she keeps them
        const leadsCollection = db.collection('leads');
        const leads = await leadsCollection.find({ queueObjectId: new ObjectId(id) }).toArray();

        return NextResponse.json({ ...queueObject, leads }, { status: 200 });
      } else {
        // If no ID is provided, fetch all queueObject
        const queueObject = await queueObjectCollection.find({}).toArray();
        return NextResponse.json(queueObject, { status: 200 });
      }
    } catch (error) {
      console.error('Error fetching queueObject:', error);
      return NextResponse.json({ error }, { status: 500 });
    }
  }

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const queueObjectCollection = db.collection('queueObject');

    const data = await req.json();

    // Check if all required keys are present
    const requiredKeys = [
      'type',
      'email',
      'amountSent',
      'amountRemaining',
      'totalAmount',
      'priority',
    ];
    const missingKeys = requiredKeys.filter(key => !(key in data));
    if (missingKeys.length > 0) {
      return NextResponse.json({ message: `Missing required keys: ${missingKeys.join(', ')}` }, { status: 400 });
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
    }

    // Validate type
    let extras = data['type']; //TODO: confirm with frnace what she wants as types when adding to queue
    if (!['Assurance', 'invalidité', 'placement'].includes(extras)) {
      return NextResponse.json({ message: `Invalid type value: ${extras}` }, { status: 400 });
    }

    // Validate amounts
    const { amountSent, amountRemaining, totalAmount } = data;

    if (amountSent < 0 || amountRemaining < 0 || totalAmount < 0) {
      return NextResponse.json({ message: 'Amounts cannot be negative' }, { status: 400 });
    }

    if (totalAmount !== (amountSent + amountRemaining)) {
      return NextResponse.json({ message: 'Total amount must be equal to the sum of amount sent and amount remaining' }, { status: 400 });
    }

    // Validate priority
    const priority = data.priority;
    if (typeof priority !== 'number' || priority < 1 || priority > 10) {
      return NextResponse.json({ message: 'Priority must be a number between 1 and 10' }, { status: 400 });
    }

    // If all validations pass, proceed with insertion
    const result = await queueObjectCollection.insertOne({
        type: data['type'],
        email: data['email'],
        amountSent: data['amountSent'],
        amountRemaining: data['amountRemaining'],
        totalAmount: data['totalAmount'],
        priority: data['priority'],
    });

    console.log({ data });

    return NextResponse.json({ message: 'queueObject added successfully', queueObject: result }, { status: 201 });
  } catch (error) {
    console.error('Error adding queueObject:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const queueObjectCollection = db.collection('queueObject');
  
      const { id } = await req.json();
  
      const result = await queueObjectCollection.findOneAndDelete({ _id: new ObjectId(id) });
  
      if (!result) {
        return NextResponse.json({ message: 'queueObject not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'queueObject deleted successfully', quote: result }, { status: 200 });
    } catch (error) {
      console.error('Error deleting queueObject:', error);
      return NextResponse.json({ message: 'Error deleting queueObject' }, { status: 500 });
    }
  }


  export async function PUT(req: NextRequest) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const queueObjectCollection = db.collection('queueObject');
  
      const { id, priority } = await req.json();
  
      if (!id || !ObjectId.isValid(id)) {
        return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
      }
  
      if (typeof priority !== 'number' || priority < 1 || priority > 10) {
        return NextResponse.json({ message: 'Invalid priority value. Priority should be a number between 1 and 10.' }, { status: 400 });
      }
  
      const result = await queueObjectCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { priority: priority } }
      );
  
      if (result.matchedCount === 0) {
        return NextResponse.json({ message: 'queueObject not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'queueObject priority updated successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error updating queueObject priority:', error);
      return NextResponse.json({ error }, { status: 500 });
    }
  }
