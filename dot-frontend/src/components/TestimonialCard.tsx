interface CardInputs {
  img: string;
  name: string;
  role: string;
  des: string;
}

export const TestimonialCard = ({ img, name, role, des }: CardInputs) => {
  return (
    <div className="flex-col items-center justify-center w-1/4 h-52 p-5 font-roboto rounded-xl mb-10 bg-white hover:-translate-y-0.5 hover:shadow-lg hover: ease-out duration-150 mt-10">
      <div className="flex justify-start items-center gap-2">
        <img src={img} className="size-14 rounded-full ml-3" />
        <div>
          <h1 className="font-semibold text-base font-roboto text-center">
            {name}
          </h1>
          <h2 className="font-normal text-[#6B7280] text-base font-roboto text-center">
            {role}
          </h2>
        </div>
      </div>
      <p className="font-normal text-lg font-roboto my-5 text-[#6B7280] text-center">
        {des}
      </p>
    </div>
  );
};
