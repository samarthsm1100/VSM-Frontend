/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Button } from "../components/MovingBorders";
import Aadarsh from "../assets/aadarsh.jpeg";
import Bharti from "../assets/bharti.png";
import Convent from "../assets/convent.jpg";
import Ideal from "../assets/ideal.png";
import PDVP from "../assets/pdvp.png";
import Sushiladevi from "../assets/sushiladevi.png";
import Vivekanand from "../assets/vivekanand.jpeg";
import Vidyaniketan from "../assets/vidyaniketan.jpeg"; 

const workExperience = {
  logo: Vidyaniketan,
  school: "MVS Page Krushi Madhyamik Vidyaniketan, Tasgaon",
  position: "Assistant Teacher",
  duration: "2008 - Present",
  description: "Leading interactive science classes with practical learning approaches.",
};

const education = [
  { year: "2022-24", name: "Sushiladevi Salunkhe College, Tasgaon", type: "M.A.(Ed.)", logo: Sushiladevi },
  { year: "2020-22", name: "Vivekanand College, Kolhapur", type: "M.Sc.(Chemistry)", logo: Vivekanand },
  { year: "2005-06", name: "Aadarsh College, Vita", type: "B.Ed.", logo: Aadarsh },
  { year: "2000-03", name: "PDVP College, Tasgaon", type: "B.Sc.(Chemistry)", logo: PDVP },
  { year: "2000", name: "Bharti Vidyamandir College, Tasgaon", type: "HSC (English Medium)", logo: Bharti },
  { year: "1998", name: "Ideal English School, Tasgaon", type: "SSC (English Medium)", logo: Ideal },
  { year: "1992", name: "Kanikkamatha Convent Girls High School, Palakkad (Kerala)", type: "Till 4th Standard (CBSE)", logo: Convent },
];

const Experience = () => {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white px-4 pt-36 overflow-hidden">
    {/* Full Height Background Glow */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-full bg-blue-500 opacity-20 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-small opacity-10 z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Work Experience Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-20 w-full flex justify-center items-center"
        >
          <Button
            duration={10000}
            borderRadius="1.75rem"
            className="w-full p-6 flex items-center gap-6"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: `calc(1.75rem * 0.96)`,
            }}
          >
            <img
              src={workExperience.logo}
              alt="Institution Logo"
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full border border-gray-500"
            />
            <div>
              <h2 className="text-md text-gray-300 mb-1">Current Work Experience</h2>
              <p className="text-white font-semibold text-lg">{workExperience.school}</p>
              <p className="text-gray-100 text-lg">{workExperience.position} ({workExperience.duration})</p>
              <p className="mt-2 text-gray-400">{workExperience.description}</p>
            </div>
          </Button>
        </motion.div>

        {/* Education Timeline with Vertical Glowing Line */}
        <div className="relative my-10 flex flex-col items-center w-full px-4">
          <div className="space-y-14 w-full max-w-3xl">
            {education.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative flex items-start gap-4 md:gap-6 w-full md:mx-auto"
              >
                {/* Glowing Dot on the left */}
                <div className="w-4 h-4 mt-5 bg-blue-500 border-[3px] border-white rounded-full shadow-md animate-pulse shrink-0" />

                {/* Timeline Card */}
                <div className="w-full rounded-xl px-6 py-4 shadow-xl transition-all hover:scale-[1.02]
                  bg-white/5 border border-gray-500/20 backdrop-blur-md
                  backdrop-saturate-150 bg-opacity-10">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.logo}
                      alt={`${item.name} logo`}
                      className="w-16 h-16 object-cover rounded-md border border-gray-500"
                    />
                    <div>
                      <p className="text-sm text-blue-400">{item.year}</p>
                      <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                      <p className="text-md text-white/75 font-bold">{item.type}</p>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
