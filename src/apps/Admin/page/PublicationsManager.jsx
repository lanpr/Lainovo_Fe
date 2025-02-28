import * as React from "react";
import { useState, useEffect, useRef } from "react";
import PublicData from "../Services/PublicationData";
import Select from "react-tailwindcss-select";
import CoverData from "../Services/CoverData";
import GenreData from "../Services/GenreData";
import TypeData from "../Services/TypeData";
import GiftData from "../Services/GiftData";
import axios from "axios";
import { AlertAdmin } from "../components/Alert";
import FormButton from "../components/FormButton";

function AdminProduct() {
  const [vali, setVali] = useState("");
  const [info, setInfo] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [newImageUrls, setNewImageUrls] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCovers, setSelectedCovers] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedGifts, setSelectedGifts] = useState([]);
  const { coversSL, GetCoverSelect } = CoverData();
  const { genresSL, GetGenreSelect } = GenreData();
  const { typesSL, GetTypeSelect } = TypeData();
  const { GiftsSL, GetGiftSelect } = GiftData();
  const [imageClick, setImageClick] = useState([]);
  const { publics, addPublics, updatePublics, findPublic } = PublicData();
  const [idPublic, setIdPublic] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [formData, setFormData] = useState({
    publicationsName: "",
    unitPrice: "",
    stock: "",
    author: "",
    publisher: "",
    publicationYear: "",
    summary: "",
    arrivalDay: "",
  });
  const handleGenreSLChange = (value) => {
    setSelectedGenres(value);
  };
  const handleCoverSLChange = (value) => {
    setSelectedCovers(value);
  };
  const handleTypeSLChange = (value) => {
    setSelectedTypes(value);
  };
  const handleGiftSLChange = (value) => {
    setSelectedGifts(value);
  };
  const handleImageChange = (e) => {
    setImageClick([]);
    setSelectedImages([]);
    const files = Array.from(e.target.files);
    const imagePaths = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imagePath = event.target.result;
        imagePaths.push(imagePath);
        if (imagePaths.length === files.length) {
          setNewImageUrls(imagePaths);
        }
      };
      reader.readAsDataURL(file);
    });
    setImageUrls((prevImageUrls) => [...prevImageUrls, ...imagePaths]);
    setSelectedImages([...selectedImages, ...files]);
  };
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    // Đảm bảo rằng ngày và tháng có độ dài 2 chữ số
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    return year + "-" + formattedMonth + "-" + formattedDay;
  };
  const fileInputRef = useRef(null);

  const handleRowClick = async (id) => {
    const selected = publics.find((p) => p.publicationsID === id);
    if (selected) {
      const formattedArrivalDay = formatDate(selected.arrivalDay);
      setFormData((prevFormData) => ({
        ...prevFormData,
        arrivalDay: formattedArrivalDay,
        publicationsName: selected.publicationsName,
        unitPrice: selected.unitPrice,
        stock: selected.stock,
        author: selected.author,
        publisher: selected.publisher,
        publicationYear: selected.publicationYear,
        summary: selected.summary,
      }));
      setIdPublic(id);
      const imageEP = await axios.get(
        "http://localhost:8080/api/v1/images/getAllImage/" + id,
        {}
      );
      setImageClick(imageEP.data.data);
      // Gửi yêu cầu HTTP để lấy thông tin về các thể loại của cuốn sách
      const genresEP = await GetGenreSelect(id);
      const matchingGenresSL = genresSL.filter((genreSL) => {
        // Tìm một phần tử trong genresSLF có genreID giống với value trong genreSL
        return genresEP.some(
          (genreEP) => parseInt(genreEP.genreID) === parseInt(genreSL.value)
        );
      });
      setSelectedGenres(matchingGenresSL);
      const coversEP = await GetCoverSelect(id);
      const matchingCoversSL = coversSL.filter((coverSL) => {
        return coversEP.some(
          (coverEP) => parseInt(coverEP.coverID) === parseInt(coverSL.value)
        );
      });
      setSelectedCovers(matchingCoversSL);
      const typesEP = await GetTypeSelect(id);
      const matchingTypesSL = typesSL.filter((typeSL) => {
        return typesEP.some(
          (typeEP) => parseInt(typeEP.typeID) === parseInt(typeSL.value)
        );
      });
      setSelectedTypes(matchingTypesSL);
      const giftsEP = await GetGiftSelect(id);
      const matchingGiftsSL = GiftsSL.filter((GiftSL) => {
        return giftsEP.some(
          (giftEP) =>
            parseInt(giftEP.promotionalGiftID) === parseInt(GiftSL.value)
        );
      });
      setSelectedGifts(matchingGiftsSL);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages];
    const updatedUrls = [...imageUrls];
    const updateNewImageUrls = [...newImageUrls];
    updatedImages.splice(index, 1);
    updatedUrls.splice(index, 1);
    updateNewImageUrls.splice(index, 1);
    setNewImageUrls(updateNewImageUrls);
    setSelectedImages(updatedImages);
    setImageUrls(updatedUrls);
    URL.revokeObjectURL(imageUrls[index]);
  };
  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const isPublicExist = () => {
    return publics.some(
      (item) =>
        item.publicationsName.toLowerCase() ===
        formData.publicationsName.toLowerCase()
    );
  };
  useEffect(() => {
    // Xác định hàm để ẩn AlertAdmin sau 5 giây
    const hideAlert = setTimeout(() => {
      setVali("");
      setInfo("");
    }, 5000);

    // Clear timeout khi component unmount để tránh memory leaks
    return () => clearTimeout(hideAlert);
  }, [vali, info]);
  const validForm = () => {
    let isValid = true;
    Object.values(formData).forEach((value) => {
      if (value === "") {
        isValid = false;
        setVali("error");
        setInfo("Please fill in all fields!");
        return false;
      }
    });
    if (formData.publicationsName.length < 15) {
      setVali("error");
      setInfo("Please fill in all fields and Publication Name longer than 15!");
      return false;
    } else if (parseInt(formData.unitPrice) < 0) {
      setVali("error");
      setInfo("Please do not enter negative numbers!");
      return false;
    } else if (parseInt(formData.stock) < 0) {
      setVali("error");
      setInfo("Please do not enter negative numbers!");
      return false;
    } else {
      return isValid;
    }
  };
  const handleAddPublic = async () => {
    if (!validForm()) {
      setVali("error");
    } else if (newImageUrls.length === 0) {
      // Hiển thị cảnh báo nếu không có hình ảnh được chọn
      setVali("error");
      setInfo("Please select at least one image");
    }
    // Kiểm tra các phần tử trong selectedGenres
    else if (selectedGenres.length === 0) {
      // Hiển thị cảnh báo nếu không có thể loại được chọn
      setVali("error");
      setInfo("Please select at least one genre");
    }
    // Kiểm tra các phần tử trong selectedCovers
    else if (selectedCovers.length === 0) {
      // Hiển thị cảnh báo nếu không có bìa sách được chọn
      setVali("error");
      setInfo("Please select at least one cover");
    }
    // Kiểm tra các phần tử trong selectedTypes
    else if (selectedTypes.length === 0) {
      // Hiển thị cảnh báo nếu không có loại sách được chọn
      setVali("error");
      setInfo("Please select at least one type");
    } else {
      if (isPublicExist()) {
        setVali("error");
        setInfo("Publication name is exist!");
      } else {
        await addPublics(
          formData,
          newImageUrls,
          selectedGenres,
          selectedCovers,
          selectedTypes,
          selectedGifts
        );
        setVali("success");
        setInfo("Adding complete!");
        setFormData({
          publicationsName: "",
          unitPrice: "",
          stock: "",
          author: "",
          publisher: "",
          publicationYear: "",
          summary: "",
          arrivalDay: "",
        });
        setNewImageUrls([]);
        setSelectedImages([]);
        setSelectedGenres([]);
        setSelectedCovers([]);
        setSelectedGifts([]);
        setSelectedTypes([]);
        fileInputRef.current.value = "";
      }
    }
  };
  const handleUpdatePublic = async () => {
    if (
      !formData.publicationsName ||
      !formData.unitPrice ||
      !formData.stock ||
      !formData.author ||
      !formData.publisher ||
      !formData.publicationYear ||
      !formData.summary ||
      !formData.arrivalDay
    ) {
      setVali("error");
      setInfo("Please fill in all fields");
    } else if (!validForm()) {
      setVali("error");
    }
    // Kiểm tra các phần tử trong selectedGenres
    else if (selectedGenres.length === 0) {
      // Hiển thị cảnh báo nếu không có thể loại được chọn
      setVali("error");
      setInfo("Please select at least one genre");
    }

    // Kiểm tra các phần tử trong selectedCovers
    else if (selectedCovers.length === 0) {
      // Hiển thị cảnh báo nếu không có bìa sách được chọn
      setVali("error");
      setInfo("Please select at least one cover");
    }

    // Kiểm tra các phần tử trong selectedTypes
    else if (selectedTypes.length === 0) {
      // Hiển thị cảnh báo nếu không có loại sách được chọn
      setVali("error");
      setInfo("Please select at least one type");
    } else {
      await updatePublics(
        idPublic,
        formData,
        newImageUrls,
        selectedGenres,
        selectedCovers,
        selectedTypes,
        selectedGifts
      );
      setVali("success");
      setInfo("Update complete!");
      setFormData({
        publicationsName: "",
        unitPrice: "",
        stock: "",
        author: "",
        publisher: "",
        publicationYear: "",
        summary: "",
        arrivalDay: "",
      });
      setIdPublic("");
      setNewImageUrls([]);
      setSelectedImages([]);
      setSelectedImages([]);
      setSelectedGenres([]);
      setSelectedCovers([]);
      setSelectedGifts([]);
      setSelectedTypes([]);
      fileInputRef.current.value = "";
    }
  };
  const handleSearchChange = async (e) => {
    const searchValue = e.target.value;
    await findPublic(searchValue);
  };
  const product = [
    {
      type: "text",
      names: "publicationsName",
      id: "product",
      placeholder: "Title",
    },
    { type: "number", names: "unitPrice", id: "product", placeholder: "Price" },
    { type: "number", names: "stock", id: "product", placeholder: "Stock" },
    { type: "text", names: "author", id: "product", placeholder: "Author" },
    {
      type: "text",
      names: "publisher",
      id: "product",
      placeholder: "Publisher",
    },
    {
      type: "number",
      names: "publicationYear",
      id: "product",
      placeholder: "PublicYear",
    },
    { type: "text", names: "summary", id: "product", placeholder: "Summary" },
    {
      type: "date",
      names: "arrivalDay",
      id: "product",
      placeholder: "ArrivalDay",
    },
  ];
  const TH = [
    { names: "Title" },
    { names: "UnitPrice" },
    { names: "Stock" },
    { names: "Author" },
    { names: "Publisher" },
    { names: "PublicYear" },
    { names: "Image" },
  ];
  const buttons = [{ names: "Add" }, { names: "Update" }, { names: "Xoá" }];

  return (
    <div className="h-full">
      <div className="mt-4">
        <div className="text-black text-start">
          <h3 className="font-bold">Manage Book</h3>
        </div>
      </div>
      <div>
        <div>
          {product.map((field) => (
            <div className="py-2 flex-col inline-block w-3/12 ms-2">
              <div className=" w-12/12 py-1">
                <div className="relative w-full h-10 ">
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.names}
                    value={formData[field.names]}
                    onChange={handleFormDataChange}
                    className="shadow-black peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=""
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                    {field.placeholder}
                  </label>
                </div>
              </div>
            </div>
          ))}
          <input
            className="ms-2"
            type="file"
            id="image"
            ref={fileInputRef}
            name="imageProduct"
            multiple
            onChange={handleImageChange}
          />
          <br />
          <div className="flex">
            <div className="py-2 flex-col  ms-1 w-2/12 ">
              <label>Genres</label>
              <Select
                isMultiple
                isSearchable
                value={selectedGenres}
                onChange={handleGenreSLChange}
                options={genresSL}
              />
            </div>
            <div className="py-2 flex-col  ms-1 w-2/12 ">
              <label htmlFor="">Covers</label>
              <Select
                isMultiple
                isSearchable
                value={selectedCovers}
                onChange={handleCoverSLChange}
                options={coversSL}
              />
            </div>
            <div className="py-2 flex-col  ms-1 w-2/12 ">
              <label htmlFor="">Type</label>
              <Select
                isMultiple
                isSearchable
                value={selectedTypes}
                onChange={handleTypeSLChange}
                options={typesSL}
              />
            </div>
            <div className="py-2 flex-col ms-1 w-2/12 ">
              <label htmlFor="">Gift</label>
              <Select
                isMultiple
                isSearchable
                value={selectedGifts}
                onChange={handleGiftSLChange}
                options={GiftsSL}
              />
            </div>
          </div>
        </div>
        <div></div>

        <div className="flex gap-1">
          <FormButton onClick={handleAddPublic} content={"Add"} />
          <FormButton onClick={handleUpdatePublic} content={"Update"} />
          <FormButton onClick={() => setShowModal(true)} content={"Image"} />
        </div>
        <AlertAdmin vali={vali} info={info} />
        <div className="w-12/12 h-1/2 mb-1 py-1">
          <form className="max-w-sm w-7/12">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
              <input
                type="search"
                onChange={handleSearchChange}
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
            </div>
          </form>
        </div>

        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">List Image Book</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    {imageClick.length === 0
                      ? selectedImages.map((image, index) => (
                          <div
                            key={index}
                            className="selected-image w-2/12 relative inline-block border-black border-2 ms-1 "
                            style={{ width: "170px", height: "180px" }}
                          >
                            <img
                              src={URL.createObjectURL(image)}
                              style={{ width: "100%", height: "100%" }}
                            />
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-0 right-0 bg w-1/12 bg-gray-500 border-10"
                              type="button"
                            >
                              X
                            </button>
                          </div>
                        ))
                      : imageClick.map((image, index) => (
                          <div
                            key={index}
                            className="selected-image w-2/12 relative inline-block border-black border-2 ms-1 "
                            style={{ width: "170px", height: "180px" }}
                          >
                            <img
                              src={image.imageURL}
                              style={{ width: "100%", height: "100%" }}
                            />
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-0 right-0 bg w-1/12 bg-gray-500 border-10"
                              type="button"
                            >
                              X
                            </button>
                          </div>
                        ))}
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        <div className="w-12/12 h-80 border-2 border-black overflow-y-scroll">
          <table className="w-full h-full overflow-y-scroll border-black">
            <thead className="border-b border-black bg-[#c2aa67] uppercase">
              <tr className="">
                {TH.map((item, index) => (
                  <th
                    className="text-center font-bold border-r border-black h-10"
                    key={index}
                  >
                    {item.names}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {publics.map((publication, rowIndex) => (
                <tr
                  key={rowIndex}
                  name={rowIndex}
                  onClick={() => handleRowClick(publication.publicationsID)}
                  className="cursor-pointer border-b  border-[#c2aa67] hover:bg-gray-400"
                >
                  <td className="text-center border-r border-[#c2aa67]">
                    {publication.publicationsName}
                  </td>
                  <td className="text-center border-r border-[#c2aa67]">
                    {publication.unitPrice}
                  </td>
                  <td className="text-center border-r border-[#c2aa67]">
                    {publication.stock}
                  </td>
                  <td className="text-center border-r border-[#c2aa67]">
                    {publication.author}
                  </td>
                  <td className="text-center border-r border-[#c2aa67]">
                    {publication.publisher}
                  </td>
                  <td className="text-center border-r border-[#c2aa67]">
                    {publication.publicationYear}
                  </td>
                  <td className="text-center border-r border-[#c2aa67] px-auto">
                    <img
                      className="mx-auto"
                      src={publication.images[0].imageURL}
                      alt=""
                      width={"150px"}
                      height={"200px"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default AdminProduct;
