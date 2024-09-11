import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"; // Importing necessary components from a UI library
import { HeroPostDetail } from "./HeroPostDetail"; // Importing HeroPostDetail component

// Defining the props interface for HeroSlider component
interface HeroSliderProps {
  posts: any; // 'posts' can be of any type, should be refined for better type safety
}

// Functional component HeroSlider that accepts HeroSliderProps
export const HeroSlider: React.FC<HeroSliderProps> = ({ posts }) => {
  return (
    // Carousel component as the outer container
    <Carousel>
      {/* CarouselContent contains the individual items of the carousel */}
      <CarouselContent>
        {/* Slicing the first 4 posts and mapping over them to create CarouselItem components */}
        {posts.slice(1, 5).map((post: any, index: number) => (
          // Each CarouselItem component represents a slide in the carousel
          <CarouselItem className="basis-10/12" key={index}>
            {/* HeroPostDetail component displays the details of the post */}
            <HeroPostDetail post={post} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
