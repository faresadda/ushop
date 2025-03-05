import headphone from "../../public/headphone.png";

export default function Home() {
  const date = new Date();
  date.setUTCHours(0);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);
  date.setUTCDate(date.getDate() + 2);
  return (
    <div className="bg-yellow-300 flex items-center justify-evenly h-[100vh] pt-[100px]! max-[630px]:justify-start relative pl-5!">
      <div>
        <h1 className="text-7xl font-extrabold uppercase mb-5! max-[920px]:text-6xl max-[570px]:text-5xl">
          welcome<br></br>to ushop
        </h1>
        <p>Sale end on : {date.toUTCString()}</p>
        <p>Discounts up to 80%</p>
        <a href="#product"><button className="border-solid border-2 bg-white rounded-2xl p-4! mt-4! w-[200px] border-white font-extrabold">
          SHOP NOW
        </button></a>
      </div>
      <img src={headphone} className="w-[450px] max-[920px]:w-[350px] right-10 bottom-5 max-[760px]:w-[250px] max-[630px]:absolute
       max-[570px]:w-[200px] max-[460px]:w-[150px] max-[410px]:bottom-0"></img>
      
    </div>
  );
}
