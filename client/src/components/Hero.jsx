import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className='relative h-screen flex items-center justify-start px-6 md:px-16 lg:px-36'
      style={{ backgroundImage: `url("/bg.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl text-white space-y-4 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Fire & Blood <br /> Game of Thrones
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-gray-200">
          <span className="font-medium">Politics | Power | Betrayal</span>

          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" /> 2018
          </div>

          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" /> 2h 10m
          </div>
        </div>

        <p className="text-gray-200 leading-relaxed">
          In the Seven Kingdoms of Westeros, the battle for the Iron Throne rages on. As noble families vie for power, alliances are forged and broken, and the fate of the realm hangs in the balance.
        </p>

        <button
          onClick={() => navigate("/movies")}
          className="flex items-center gap-2 px-6 py-3 text-lg bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition"
        >
          Explore Movies
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
