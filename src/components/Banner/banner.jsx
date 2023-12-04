import { useNavigate } from 'react-router-dom'

const Banner = () => {

  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/all-items')
  }
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(/banner.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
          Culinary Harmony: Empower Your Restaurant with Precision Management
          </h1>
          <p className="mb-5">
          Unlock Seamless Operations, Delightful Dining Experiences, and Culinary Excellence with Our Restaurant Management Platform!
          </p>
          <button onClick={handleClick} className="btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
