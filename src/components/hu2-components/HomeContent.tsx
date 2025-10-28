import { SearchBar } from "./SearchBar"
import { ProfessionalsList } from "./ProfessionalsList"


export const HomeContent = () => {
  return (
    <div>
        <div className="flex justify-center items-center" >
            <SearchBar />
        </div>
        <div>
          <ProfessionalsList />
        </div>
    </div>
  )
}
