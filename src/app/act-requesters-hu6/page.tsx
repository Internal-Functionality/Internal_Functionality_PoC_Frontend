import FixerCard from "@/components/components-h6/FixerCard";
import JobOffersBox from "@/components/components-h6/JobOffersBox";
import JobRegisterBox from "@/components/components-h6/JobRegisterBox";
export default function page() {
    return (
        <> 
        <div className="flex">
            <div className="max-w-2xl w-full p-6">
                <FixerCard />
            </div>
        </div>
        <div className="flex space-x-9 ">
            <div className="max-w-2xl w-full p-6">
                <JobOffersBox />
            </div>
            <div className="max-w-2xl w-full p-6">
                <JobRegisterBox />
            </div>
        </div>
        </>
    );
}