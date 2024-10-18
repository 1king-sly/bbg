import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">About BabyGal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="mb-4">
            BabyGal is a non-profit organization dedicated to empowering girls and young women through every stage of their lives. Founded in 2010, we have been working tirelessly to create a supportive community that nurtures potential, protects rights, and provides essential resources.
          </p>
          <p className="mb-4">
            Our team consists of passionate individuals from diverse backgrounds, all united by the common goal of making a positive impact in the lives of girls and young women.
          </p>
        </div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="BabyGal Team"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
      <h2 className="text-3xl font-bold mt-12 mb-6">Our Impact</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>10,000+</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Girls supported through our programs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>50+</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Partner organizations worldwide</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>15</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Countries with active BabyGal programs</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}