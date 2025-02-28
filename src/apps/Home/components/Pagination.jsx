import { useEffect, useState } from "react";

function PaginationLightNovel() {
    const [posts, setPosts] = useState([]); // Fetch data from server
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [lightNovelPerPage, setLightNovelPerPage] = useState(12);

    useEffect(() => {})
    return ( 
        <div>

        </div>
     );
}

export default PaginationLightNovel;