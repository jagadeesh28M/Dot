interface CardInputs {
  img: string;
  title: string;
  des: string;
}

export const Card = ({ img, title, des }: CardInputs) => {
  return (
    <div className="flex-col items-center justify-center w-1/4 h-52 p-5 font-roboto rounded-xl bg-white hover:-translate-y-0.5 hover:shadow-lg hover: ease-out duration-150 ">
      <img src={img} className="bg-[#FFEFEF] size-12 p-3 rounded" />
      <h1 className="font-bold text-xl font-roboto mt-4 mb-2">{title}</h1>
      <p className="font-normal text-lg font-roboto mb-1 text-[#6B7280]">
        {des}
      </p>
    </div>
  );
};
