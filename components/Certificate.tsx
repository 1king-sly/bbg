"use client";

import { useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CertificateProps {
  userName: string;
  courseName: string;
  completionDate: Date;
  certificateId: string;
}

export default function Certificate({
  userName,
  courseName,
  completionDate,
  certificateId
}: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${userName}-${courseName}-Certificate.pdf`);
    }
  };

  return (
    <div className="p-4">
      <Card ref={certificateRef} className="p-8 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-secondary to-accent" />
        </div>

        {/* Certificate Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold">BabyGal</span>
            </div>
            <div className="text-right text-sm text-gray-500">
              Certificate ID: {certificateId}
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif mb-4">Certificate of Completion</h1>
            <div className="h-1 w-32 bg-primary mx-auto" />
          </div>

          {/* Main Content */}
          <div className="text-center mb-8">
            <p className="text-lg mb-4">This is to certify that</p>
            <p className="text-3xl font-bold text-primary mb-4">{userName}</p>
            <p className="text-lg mb-4">has successfully completed the course</p>
            <p className="text-2xl font-bold mb-4">{courseName}</p>
            <p className="text-lg">
              on {completionDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          {/* Signatures */}
          <div className="flex justify-around mt-12">
            <div className="text-center">
              <div className="w-40 h-0.5 bg-gray-400 mb-2" />
              <p className="font-semibold">Course Instructor</p>
            </div>
            <div className="text-center">
              <div className="w-40 h-0.5 bg-gray-400 mb-2" />
              <p className="font-semibold">Program Director</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-4 text-center">
        <Button onClick={downloadCertificate}>
          Download Certificate
        </Button>
      </div>
    </div>
  );
}