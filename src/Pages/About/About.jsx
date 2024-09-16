/* eslint-disable react/no-unescaped-entities */
import sabry from '../../assets/sabry.jpg';
import saman from '../../assets/elsaman.jpg';
import tareq from '../../assets/tareq.jpg';

export default function About() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-12 text-center text-gray-800">About Us</h1>
          <p className="text-xl mb-8 text-center text-gray-700">
            At MovieLand, our mission is to bring the magic of cinema right to your screen. Founded by a team of movie enthusiasts, we strive to offer the latest movie releases, insightful reviews, and engaging content to help you find your next favorite film.
          </p>
          <p className="text-xl mb-12 text-center text-gray-700">
            We believe in the power of movies to inspire, entertain, and educate. Our platform provides an easy way for you to explore movies across genres and decades. Whether you're a casual viewer or a dedicated cinephile, MovieLand has something for everyone.
          </p>
          <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white shadow-xl rounded-xl p-8 transform transition-all duration-300 hover:scale-105">
              <img
                src={sabry}
                alt="Ahmed Sabry"
                className="w-32 h-32 rounded-full mx-auto mb-6"
              />
              <h3 className="text-2xl font-semibold mb-2 text-center text-gray-800">
                Ahmed Sabry
              </h3>
              <p className="text-gray-600 text-center">Founder & CEO</p>
            </div>
            <div className="bg-white shadow-xl rounded-xl p-8 transform transition-all duration-300 hover:scale-105">
              <img
                src={saman}
                alt="Ahmed Elsaman"
                className="w-32 h-32 rounded-full mx-auto mb-6"
              />
              <h3 className="text-2xl font-semibold mb-2 text-center text-gray-800">
                Ahmed Elsaman
              </h3>
              <p className="text-gray-600 text-center">Content Director</p>
            </div>
            <div className="bg-white shadow-xl rounded-xl p-8 transform transition-all duration-300 hover:scale-105">
              <img
                src={tareq}
                alt="Tareq Araby"
                className="w-32 h-32 rounded-full mx-auto mb-6"
              />
              <h3 className="text-2xl font-semibold mb-2 text-center text-gray-800">
                Tareq Araby
              </h3>
              <p className="text-gray-600 text-center">Community Manager</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
