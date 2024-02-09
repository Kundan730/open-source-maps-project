import dynamic from "next/dynamic";
import Convert from "./components/Convert";
import Location from "./components/Location";

const Map = dynamic(() => import("./components/Map"), { ssr: false });

const Home = () => {
    const indiaCenter = [22.3511, 78.6677];
    const zoom = 5;

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-2xl font-bold mt-4 mb-2">Multiple Point Representations</h1>
            <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mb-8">
                <Map center={indiaCenter} zoom={zoom} />
            </div>
            {/* <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                <Convert />
            </div> */}
        </div>
    );
};

export default Home;


// import dynamic from "next/dynamic";
// import Convert from "./components/Convert";

// const Map = dynamic(() => import("./components/Map"), { ssr: false });

// const Home = () => {
//     const indiaCenter = [22.3511, 78.6677];
//     const zoom = 5;

//     return (
//         <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
//             <h1 className="text-2xl font-bold mt-4">Multiple Point Representations</h1>
//             <div className="w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mb-8">
//                 <Map center={indiaCenter} zoom={zoom} />
//             </div>
//             <div className="w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
//                 <Convert />
//             </div>
//         </div>
//     );
// };

// export default Home;
