import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Objectives from '@/components/Objectives';
import Partners from '@/components/Partners';
import Mission from '@/components/Mission';
import Events from '@/components/Events';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Hero />
      <Services />
      <Testimonials />
      <Objectives />
      <Partners />
      <Mission />
      <Events />
    </div>
  );
}