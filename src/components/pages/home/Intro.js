const Intro = () => {
  return (
    <>
      <div className="h-[80vh] bg-primary flex flex-col items-start justify-center gap-8 py-10 ">
        <h1 className="text-white">Hi, I am</h1>
        <h1 className="text-7xl sm:text-3xl text-secondary font-semibold">
          Sejal Haribhau Nikhare
        </h1>
        <h1 className="text-6xl sm:text-3xl text-white font-semibold">
          FullStack Developer
        </h1>
        <p className="text-white w-3/4">
          Full Stack Software Engineer with 4.5 Years of Experience . I
          specialize in building scalable and user-friendly web applications
          using modern frontend and backend technologies. Currently working at
          Livelytics, I bring a strong foundation in React along with hands-on
          full stack development experience.
        </p>
        <button className="border-2 border-tertiary text-tertiary px-10 py-3 rounded">
          Get Started
        </button>
      </div>
    </>
  );
};

export default Intro;
