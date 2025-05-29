
import { Search } from "lucide-react"
import { useState } from "react";

const SearchIcon = () => {

    const [iconClicked, setIconClicked] = useState(false);

    const handleClick = () => {
        setIconClicked(!iconClicked);
    };

    return (
        <div className="relative flex items-center gap-4">
            {iconClicked && (
                <input type="search" placeholder="Search" className="input" />
            )}
            <Search onClick={handleClick} className="cursor-pointer" />
        </div>
    )
}

export default SearchIcon