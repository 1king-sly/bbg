"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

const Mission = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
        <Card className="bg-primary-foreground text-primary">
          <CardHeader>
            <Target className="h-12 w-12 mb-4 text-primary" />
            <CardTitle className="text-2xl">Empowering Girls, Transforming Communities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              BabyGal is committed to empowering girls and young women through every stage of their lives. We strive to create a supportive community that nurtures their potential, protects their rights, and provides them with the resources they need to thrive. By investing in girls, we aim to transform communities and build a more equitable world for all.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Mission;