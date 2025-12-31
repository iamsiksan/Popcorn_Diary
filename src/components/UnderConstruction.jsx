import React from "react";


const UnderConstruction = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <img
        src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2k3NWJkbHdseW54Z3dvZjFoMnB0aXRmaDB5ajEyeGJzem94OHJ0YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/I35sKRqcrxHDIAbIEs/giphy.gif"
        alt="Under construction"
        className=" w-20 sm:w-35 mb-6 rounded-4xl "
      />

      <h1 className=" text-md sm:text-3xl font-semibold text-white mb-2">
        Page Under Construction
      </h1>

      <p className="text-xs sm:text-3xl text-gray-400 max-w-md">
        We’re working hard to bring this feature to life.  
       
      </p>
      <p className="text-xs sm:text-3xl text-gray-400 max-w-md" > Please check back soon 🚀</p>
    </div>
  );
};

export default UnderConstruction;
