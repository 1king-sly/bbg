import Hero from '@/Components/Hero';
import Services from '@/Components/Services';
import Testimonials from '@/Ccomponents/Testimonials';
import Objectives from '@/Components/Objectives';
import Partners from '@/Components/Partners';
import Mission from '@/Components/Mission';
import Events from '@/Components/Events';

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