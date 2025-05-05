const Awards = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white bg-[#0a0a0a] overflow-hidden">
      {/* Circular Light Glow Effect */}
      <div className="absolute pointer-events-none -top-20 left-1/2 transform -translate-x-1/2 w-[900px] h-[900px] bg-blue-500 opacity-20 rounded-full blur-[150px]"></div>

      {/* Grid Overlay */}
      <div className="absolute pointer-events-none inset-0 bg-grid-small opacity-10"></div>

      {/* Text Section */}
      <div className="text-center mx-4 opacity-70">
        <p className="text-md font-semibold uppercase tracking-wide text-gray-400">Awards & Achievements</p>
        <h1 className="text-4xl md:text-5xl font-bold mt-4">
          Recognizing Excellence in <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Education & Innovation
          </span>
        </h1>
        <p className="text-gray-400 mt-4 text-lg md:text-xl font-medium text-center">
          Celebrating the milestones and achievements that inspire us all.
        </p>
        <div className="text-white py-8 text-4xl font-bold">
          <h1>Page Under Construction...</h1>
        </div>
      </div>      

    </div>
  )
}
export default Awards