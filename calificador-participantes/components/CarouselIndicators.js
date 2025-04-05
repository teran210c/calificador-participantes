const CarouselIndicators = ({ totalSlides, currentIndex, onSelect }) => {
    return (
      <div className="absolute bottom-2 py-2 flex justify-center gap-3 w-full z-20 pointer-events-none">        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={`indicator-${i}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(i);
            }}
            className={`rounded-full w-4 h-4 cursor-pointer pointer-events-auto ${
              i === currentIndex ? "bg-blue-500" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    );
  };
  
  export default CarouselIndicators;
  