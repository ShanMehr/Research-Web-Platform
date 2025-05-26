import Search from "@/components/search/Search";
export default function Home() {
  
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <h1 className="text-2xl font-bold text-foreground">
        What Would You Like to Know?
      </h1>
      <div className="w-1/2">
        <Search/>
      </div>
    </div>
  );
}
