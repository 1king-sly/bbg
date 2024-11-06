"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "lucide-react";

interface MenstrualTrackerProps {
  userId: number;
}

export default function MenstrualTracker({ userId }: MenstrualTrackerProps) {
  const [cycleData, setCycleData] = useState({
    currentDay: 0,
    totalDays: 28,
    phase: 'normal', // normal, fertile, menstruating, warning
    nextPeriod: new Date(),
  });

  useEffect(() => {
    fetchCycleData();
  }, [userId]);

  const fetchCycleData = async () => {
    try {
      const response = await fetch(`/api/menstrual?userId=${userId}`);
      const data = await response.json();
      
      if (data) {
        const startDate = new Date(data.startDate);
        const today = new Date();
        const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        
        setCycleData({
          currentDay: daysDiff + 1,
          totalDays: 28,
          phase: calculatePhase(daysDiff + 1),
          nextPeriod: new Date(startDate.getTime() + (28 * 24 * 60 * 60 * 1000)),
        });
      }
    } catch (error) {
      console.error('Failed to fetch cycle data:', error);
    }
  };

  const calculatePhase = (day: number) => {
    if (day <= 5) return 'menstruating';
    if (day >= 12 && day <= 16) return 'fertile';
    if (day > 28) return 'warning';
    return 'normal';
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'menstruating': return 'bg-red-500';
      case 'fertile': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Cycle Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Day {cycleData.currentDay} of {cycleData.totalDays}</span>
              <span className="text-sm font-medium capitalize">{cycleData.phase} Phase</span>
            </div>
            <Progress 
              value={(cycleData.currentDay / cycleData.totalDays) * 100}
              className={getPhaseColor(cycleData.phase)}
            />
          </div>
          
          <div className="text-sm">
            <p>Next period expected on: {cycleData.nextPeriod.toLocaleDateString()}</p>
            {cycleData.phase === 'warning' && (
              <p className="text-yellow-500 mt-2">
                Your period is late. Consider taking a pregnancy test or consulting a healthcare provider.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}