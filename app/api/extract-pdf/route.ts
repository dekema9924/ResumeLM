import pdf from '@cedrugs/pdf-parse';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

    try {
        const formData = await req.formData();
        const file = formData.get('file');

        // 1. Guard check: Ensure file exists AND is a File object, not a string
        if (!file || !(file instanceof File)) {
            return NextResponse.json(
                { error: 'No valid file uploaded.' },
                { status: 400 }
            );
        }
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer);
        const data = await pdf(buffer);


        return NextResponse.json({
            success: true,
            text: data.text,
            title: data.info.Title

        }, { status: 200 });



    } catch (err: any) {
        return NextResponse.json(
            { error: 'Failed to process PDF.', details: err.message },
            { status: 500 }
        );
    }

}