import m1 from "../assets/m1.png";
import m2 from "../assets/m2.png";
import m3 from "../assets/m3.png";
import { TestimonialCard } from "./TestimonialCard";

export const Testimonial = () => {
  return (
    <>
      <div className=" h-auto w-full font-roboto bg-[#FF6B6B]">
        <h1 className="font-bold text-center text-5xl pt-10 pb-3">
          What Our Users Say
        </h1>
        <p className="text-xl text-center font-normal text-[#6B7280] tracking-normal mt-4">
          Join thousands of satisfied users who've transformed their
          productivity
        </p>
        <div className="w-full h-auto flex justify-evenly items-center">
          <TestimonialCard
            img={m1}
            name="Sarah Johnson"
            role="Product Manager"
            des="DOT has revolutionized how I manage my team's
                tasks. The visual system makes it incredibly easy to 
                track progress and prioritize effectively."
          />
          <TestimonialCard
            img={m2}
            name="Michael Chen"
            role="Entrepreneur"
            des="Since implementing DOT, my productivity has 
                increased by 40%. The dot system makes task 
                organization intuitive and enjoyable."
          />
          <TestimonialCard
            img={m3}
            name="Emma Davis"
            role="Creative Director"
            des="The visual nature of DOT perfectly aligns with how I 
                think. It's transformed my creative process and 
                project management."
          />
        </div>
      </div>
    </>
  );
};
