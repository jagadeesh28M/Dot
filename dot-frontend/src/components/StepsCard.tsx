interface CardInputs {
  img: string;
  title: string;
  des: string;
}

export const StepsCard = ({ img, title, des }: CardInputs) => {
  return (
    <div className="flex-col items-center justify-center w-1/4 h-52 p-5 my-9 font-roboto bg-white">
      <div className="flex justify-center items-center">
        <img src={img} className=" bg-[#FFEFEF]  size-12 p-3  rounded-full" />
      </div>
      <h1 className="font-bold text-xl font-roboto mt-4 mb-2 text-center">
        {title}
      </h1>
      <p className="font-normal text-lg font-roboto mb-1 text-[#6B7280] text-center">
        {des}
      </p>
    </div>
  );
};
