import { useEffect, useState } from "react";
import Categories from "./Categories";
import Content from "./Content";
import SearchBar from "./SearchBar";
import mainPublicationsStyle from "../scss/MainPublications.module.scss"

import {
  fetchAllPublications,
  fetchPublicationContentPagingate,
  fetchPublicationsBySearch,
  fetchPublictionsFromGenre,
} from "../../../services/Service";
function MainPublications() {
  const [pageCount, setPageCount] = useState(1);
  const [initalPageCount, setInitalPageCount] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  // const [publicationsList, setPublictionsList] = useState([]);
  const [publications, setPublications] = useState([]);
  const [forcePage, setForcePage] = useState(null);
  const [search, setSearch] = useState("");
  const handleSelectGenre = async (genreId) => {
    setSelectedGenre(genreId);
    if (genreId == null) {
      const response = await fetchPublicationContentPagingate(0);
      setPublications(response.data.data.content);
      setPageCount(initalPageCount);
      setForcePage(0);
    } else {
      setForcePage(0);
      // Bổ sung thêm api search sản phẩm bằng genre
      const fetchDataFromGenre = await fetchPublictionsFromGenre(genreId);
      setPageCount(
        Math.ceil(fetchDataFromGenre.data.data.publications.length / 18)
      );
      const response = await fetchPublicationContentPagingate(0, genreId);
      setPublications(response.data.data.content);
    }
  };
  useEffect(() => {
    const fetchAllPublicationsToSetPageCount = async () => {
      const response = await fetchAllPublications();
      if (
        response &&
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        setPageCount(Math.ceil(response.data.data.length / 18));
        setInitalPageCount(Math.ceil(response.data.data.length / 18));
      } else {
        console.log("Error pagecount not an integer: ", response);
      }
    };
    fetchAllPublicationsToSetPageCount();
  }, []);
  useEffect(() => {
    const getPublicationsFirstPage = async () => {
      const response = await fetchPublicationContentPagingate(0);
      setPublications(response.data.data.content);
    };
    getPublicationsFirstPage();
  }, []);
  const handlePageChange = async (e) => {
    if (selectedGenre) {
      const fetchData = await fetchPublicationContentPagingate(
        e.selected,
        selectedGenre
      );
      setForcePage(null);
      setPublications(fetchData.data.data.content);
    } else {
      const fetchData = await fetchPublicationContentPagingate(
        e.selected,
        selectedGenre
      );
      setForcePage(null);
      setPublications(fetchData.data.data.content);
    }
  };
  // Thay đổi giá trị tìm kiếm của người dùng nhập
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    // được render lại mỗi khi search state thay đổi
    const searchPublictions = async (searchName) => {
      // tạo ra một function rồi gọi lại ngay chính trong useEffect()
      const response = await fetchPublicationsBySearch(searchName); // Mỗi khi mà render lại thì sẽ call api để tìm ra được dữ liệu của sản phẩm
      setPublications(response.data.data); // đưa mảng dữ liệu vừa tiềm được cho publications và đưa mảng đó cho content để render ra sản phẩm
      if (response.data.data.length > 9) {
        // nếu sản phẩm tìm được lớn hơn 9 sản phẩm thì sẽ chia ra các page tương ứng với số lượng sản phẩm được tìm thấy
        setPageCount(Math.ceil(response.data.data.length / 9));
        setForcePage(0);
      } else {
        setPageCount(1);
      }
    };
    if (search !== "") {
      searchPublictions(search);
    } else if (search == "") {
      const getPublicationsFirstPage = async () => {
        const response = await fetchPublicationContentPagingate(0);
        setPublications(response.data.data.content);
      };
      getPublicationsFirstPage();
    }
  }, [search]);
  return (
    <div>
      <div className={mainPublicationsStyle.search_filter}>
        <SearchBar handleSearch={handleSearch} />
        <Categories onCategorySelect={handleSelectGenre} />
      </div>
      <Content
        pageCount={pageCount}
        handlePageChange={handlePageChange}
        publications={publications}
        forcePage={forcePage}
      />
    </div>
  );
}

export default MainPublications;
