import Image from "next/image";
import Link from "next/link";
 const Hero = () => {
    return (
      <div className="bg-[#F2F0F1] min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="relative w-full flex flex-col lg:flex-row items-center justify-between max-w-7xl px-6 mx-auto">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl sm:z-0  md:text-5xl lg:text-6xl font-extrabold uppercase leading-tight">
              Find Clothes That Matches Your Style
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense of style.
            </p>
            <Link href="/shop">
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform">
              Shop Now
            </button></Link>
          </div>
  
          {/* Right Content */}
          <div className="relative lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
            <Image
              src="/heroimage.png"
              alt="Models"
              width={700}
              height={600}
              className="w-full max-w-sm md:max-w-md lg:max-w-full object-cover"
            />
            {/* Decorative Stars */}
            <div className="absolute top-6 left-6 w-6 h-6 bg-black rounded-full hidden lg:block"></div>
            <div className="absolute bottom-6 right-6 w-6 h-6 bg-black rounded-full hidden lg:block"></div>
          </div>
        </div>
  
        {/* Brand Logos */}
        <div id="brands" className="bg-black w-full mt-2">
          <div  className="flex justify-evenly items-center h-14">
            {["Versace", "Zara", "Gucci", "Prada", "Calvin Klein"].map((brand) => (
              <span
              key={brand}
                 className="text-white text-sm sm:text-base lg:text-lg font-semibold"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  export default Hero;