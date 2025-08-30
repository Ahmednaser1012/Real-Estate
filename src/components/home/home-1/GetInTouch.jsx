import { useState } from 'react';
import video2 from "../../../assets/HomePage/video2.mp4";
const GetInTouch = () => {
  const [videoReady, setVideoReady] = useState(false);
  return (
    <div className="pt-10 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Media side with autoplaying video */}
        <div className="h-full w-full flex-1 basis-[18rem] relative group overflow-hidden">
          <video
            src={video2}
            autoPlay
            muted
            loop
            playsInline
            controls
            className={`w-full h-full object-fill transition-opacity transition-transform duration-700 ease-out ${videoReady ? 'opacity-100' : 'opacity-0'} group-hover:scale-105`}
            onLoadedData={() => setVideoReady(true)}
          />
        </div>

        {/* Form side with animated card */}
        <div className="flex-1 basis-[18rem] bg-gray-800 py-6 !text-slate-200 flex items-center">
          <div className="max-w-[350px] w-full mx-auto bg-[#27282e55] p-4 rounded-lg shadow-xl transition-all duration-300 hover:-translate-y-0.5 focus-within:-translate-y-0.5 hover:shadow-2xl">
            <h1 className="text-lg font-semibold">Write To Us</h1>
            <p className="mt-1 text-sm text-slate-200/90">
              For more inquiries or deals, just conatct us using the form below,
              we will contact you back!
            </p>

            <div className="mt-4 space-y-3">
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md outline-none bg-gray-600/90 text-slate-100 placeholder:text-slate-300/70 transition-all duration-300 focus:bg-secondary focus:ring-2 focus:ring-blue-400 focus:-translate-y-0.5"
                placeholder="Your name.."
              />
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md outline-none bg-gray-600/90 text-slate-100 placeholder:text-slate-300/70 transition-all duration-300 focus:bg-secondary focus:ring-2 focus:ring-blue-400 focus:-translate-y-0.5"
                placeholder="Your email.."
              />
              <textarea
                type="text"
                className="w-full p-3 rounded-md outline-none bg-gray-600/90 text-slate-100 placeholder:text-slate-300/70 transition-all duration-300 focus:bg-secondary focus:ring-2 focus:ring-blue-400 focus:-translate-y-0.5"
                rows={3}
                placeholder="Your message.."
              ></textarea>
              <button className="w-full mt-2 btn btn-primary transform transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-lg">
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
