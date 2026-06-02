import loaderLogo from "../assets/download (1).svg";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex justify-center items-center">
      <img src={loaderLogo} alt="Loading..." className="w-36 h-36" />
    </div>
  );
};

export default Loader;
