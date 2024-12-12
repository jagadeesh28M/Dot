interface labeling {
  label: string;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  loading: boolean;
}

export const Button = ({ label, handleClick, loading }: labeling) => {
  return (
    <>
      {loading == false ? (
        <button
          onClick={handleClick}
          className="my-7 w-4/6 text-white bg-[#ff6363] hover:bg-[#4b49d8] hover:translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#FF7A7B] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          {label}
        </button>
      ) : (
        <div className="w-10 my-7 h-10 border-4 border-t-red-500 border-gray-300 rounded-full animate-spin"></div>
      )}
    </>
  );
};
