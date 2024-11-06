import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const cycle = await prisma.menstrualCycle.create({
      data: {
        userId: data.userId,
        startDate: new Date(data.startDate),
        expectedEndDate: new Date(data.expectedEndDate),
      },
    });
    return NextResponse.json(cycle);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record cycle' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const cycles = await prisma.menstrualCycle.findMany({
      where: {
        userId: parseInt(userId),
      },
      orderBy: {
        startDate: 'desc',
      },
      take: 1,
    });
    return NextResponse.json(cycles[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cycle data' }, { status: 500 });
  }
}