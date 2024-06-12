import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export async function GET(req: NextRequest) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const leadsCollection = db.collection('leads');
  
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
  
      if (id) {
        // If ID is provided, fetch the specific lead
        if (!ObjectId.isValid(id)) {
          return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
        }
  
        const lead = await leadsCollection.findOne({ _id: new ObjectId(id) });
  
        if (!lead) {
          return NextResponse.json({ message: 'Lead not found' }, { status: 404 });
        }
  
        return NextResponse.json(lead, { status: 200 });
      } else {
        // If no ID is provided, fetch all leads
        const leads = await leadsCollection.find({}).toArray();
        return NextResponse.json(leads, { status: 200 });
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      return NextResponse.json({ error }, { status: 500 });
    }
  }

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const leadsCollection = db.collection('leads');

    const data = await req.json();

    // Check if all required keys are present
    const requiredKeys = [
      'firstName',
      'lastName',
      'birthDate',
      'email',
      'phone',
      'isSmoker',
      'gender',
      'insuranceAmount',
      'type',
      'typeOfPlacement',
      'numberOfYears',
      'status',
      'dateSubmitted'
    ];
    const missingKeys = requiredKeys.filter(key => !(key in data));
    if (missingKeys.length > 0) {
      return NextResponse.json({ message: `Missing required keys: ${missingKeys.join(', ')}` }, { status: 400 });
    }

    // Validate birthDate format
    const birthDatePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthDatePattern.test(data.birthDate)) {
      return NextResponse.json({ message: 'Invalid birthDate format, should be YYYY-MM-DD' }, { status: 400 });
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
    }

    // Validate gender
    let extras = data['gender'];
    if (extras !== 'male' && extras !== 'female') {
      return NextResponse.json({ message: `Invalid gender value: ${extras}` }, { status: 400 });
    }

    // Validate phone format
    const phonePattern = /^\+?[1-9]\d{1,14}$/; // Example pattern for E.164 format
    if (!phonePattern.test(data.phone)) {
      return NextResponse.json({ message: 'Invalid phone number format' }, { status: 400 });
    }

    // Validate typeOfPlacement
    extras = data['typeOfPlacement'];
    if (!Array.isArray(extras)) {
      return NextResponse.json({ message: 'typeOfPlacement should be an array' }, { status: 400 });
    }
    const validExtraKeys = ['CÉLI', 'REER', 'REEE', 'CELIAPP', 'null']; // Use 'null' as a string
    const areKeysValid = extras.every(item => validExtraKeys.includes(item));
    if (!areKeysValid) {
      const invalidExtraKeys = extras.filter(item => !validExtraKeys.includes(item));
      return NextResponse.json({ message: `Invalid typeOfPlacement values: ${invalidExtraKeys.join(', ')}` }, { status: 400 });
    }

    // Validate type
    extras = data['type'];
    if (!['Assurance vie temporaire', 'Assurance vie permanente', 'Assurance vie hypothéquaire', 'Assurance vie entreprise', 'Assurance invalidité', 'placement'].includes(extras)) {
      return NextResponse.json({ message: `Invalid type value: ${extras}` }, { status: 400 });
    }

    // Validate status
    extras = data['status'];
    if (!['active', 'transféré', 'répondu'].includes(extras)) {
      return NextResponse.json({ message: `Invalid status value: ${extras}` }, { status: 400 });
    }

    // If all validations pass, proceed with insertion
    const result = await leadsCollection.insertOne({
      firstName: data['firstName'],
      lastName: data['lastName'],
      birthDate: data['birthDate'],
      email: data['email'],
      phone: data['phone'],
      isSmoker: data['isSmoker'],
      gender: data['gender'],
      insuranceAmount: data['insuranceAmount'],
      type: data['type'],
      typeOfPlacement: data['typeOfPlacement'],
      numberOfYears: data['numberOfYears'],
      status: data['status'],
      dateSubmitted: new Date(),
    });

    console.log({ data });

    return NextResponse.json({ message: 'Lead added successfully', lead: result }, { status: 201 });
  } catch (error) {
    console.error('Error adding lead:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const leadsCollection = db.collection('leads');
  
      const { id } = await req.json();
  
      const result = await leadsCollection.findOneAndDelete({ _id: new ObjectId(id) });
  
      if (!result) {
        return NextResponse.json({ message: 'Lead not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Lead deleted successfully', quote: result }, { status: 200 });
    } catch (error) {
      console.error('Error deleting lead:', error);
      return NextResponse.json({ message: 'Error deleting lead' }, { status: 500 });
    }
  }


  export async function PUT(req: NextRequest) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const leadsCollection = db.collection('leads');
  
      const { id, status } = await req.json();
  
      if (!id || !ObjectId.isValid(id)) {
        return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
      }
  
      if (!['active', 'transféré', 'répondu'].includes(status)) {
        return NextResponse.json({ message: `Invalid status value: ${status}` }, { status: 400 });
      }
  
      const result = await leadsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: status } }
      );
  
      if (result.matchedCount === 0) {
        return NextResponse.json({ message: 'Lead not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Lead status updated successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error updating lead status:', error);
      return NextResponse.json({ error }, { status: 500 });
    }
  }
