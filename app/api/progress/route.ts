import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const progress = await prisma.progress.create({
      data: {
        userId: data.userId,
        // courseId: data.courseId,
        moduleId: data.moduleId,
        completed: data.completed,
        score: data.score,
      },
    });
    return NextResponse.json(progress);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}