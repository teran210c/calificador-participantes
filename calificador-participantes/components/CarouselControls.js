import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

const CarouselControls = ({ onPrevious, onNext }) => {
  return (
    <div className="absolute top-0 h-full w-full justify-between items-center flex text-gray px-3 text-3xl pointer-events-none">
      <button
        onClick={onPrevious}
        className="z-20 pointer-events-auto bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-70 transition-all"
      >
        <BsFillArrowLeftCircleFill />
      </button>
      <button
        onClick={onNext}
        className="z-20 pointer-events-auto bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-70 transition-all"
      >
        <BsFillArrowRightCircleFill />
      </button>
    </div>
  );
};

export default CarouselControls;
