interface signinInputs {
  title: string;
  phlabel: string;
  type?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input = ({ title, phlabel, type, onChange }: signinInputs) => {
  return (
    <div className="w-5/6 ml-24">
      <label className="block mt-4 mb-2 text-md font-semibold text-gray-900">
        {title}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        placeholder={phlabel}
        className="bg-white hover:cursor-pointer text-sm rounded-lg block w-5/6 p-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-3 focus:outline-none focus:ring-inset focus:ring-[#F6DEB8] "
      />
    </div>
  );
};
