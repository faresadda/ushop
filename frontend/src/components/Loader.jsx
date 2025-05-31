const Loader = ({style}) => {
  return (
    <div className={`${style} w-[40px] h-[20px] relative z-[4]`}>
      {/* Circles */}
      <div className="w-[6px] h-[6px] absolute rounded-full bg-black left-[15%] origin-[50%] animate-typing-circle" />
      <div className="w-[6px] h-[6px] absolute rounded-full bg-black left-[45%] origin-[50%] animate-typing-circle-delay-1" />
      <div className="w-[6px] h-[6px] absolute rounded-full bg-black right-[15%] origin-[50%] animate-typing-circle-delay-2" />

      {/* Shadows */}
      <div className="w-[5px] h-[4px] rounded-full bg-black/20 absolute top-[30px] origin-[50%] z-[3] left-[15%] blur-[1px] animate-typing-shadow" />
      <div className="w-[5px] h-[4px] rounded-full bg-black/20 absolute top-[30px] origin-[50%] z-[3] left-[45%] blur-[1px] animate-typing-shadow-delay-1" />
      <div className="w-[5px] h-[4px] rounded-full bg-black/20 absolute top-[30px] origin-[50%] z-[3] right-[15%] blur-[1px] animate-typing-shadow-delay-2" />
    </div>
  );
};

export default Loader;
