import React, { useEffect, useState } from "react";
import InputAdmin from "../components/InputAdmin";
import { AlertAdmin } from "../components/Alert";
import ReveData from "../Services/ReveneuData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";
import { height } from "@mui/system";
import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function Reveneu() {
  const [formDate, setFormDate] = useState({
    dayFrom: null,
    dayTo: null,
  });
  const [formYear, setFormYear] = useState({
    yearStart: null,
    yearEnd: null,
  });
  const [vali, setVali] = useState("");
  const [info, setInfo] = useState("");
  const [data, setData] = useState([]);
  const { fetchReve, order, getOrderDate, getOrderYear } = ReveData();
  const options = {
    responsive: true,
  };
  const [labels, setLabels] = useState([]);
  const chart = {
    labels: labels,
    datasets: [
      {
        label: "Total",
        data: data,
        fill: true,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const input = [
    { type: "month", names: "dayFrom", id: "DayFrom", placeholder: "Day From" },
    { type: "month", names: "dayTo", id: "DayTo", placeholder: "Day To" },
  ];
  const inputYear = [
    {
      type: "year",
      names: "yearStart",
      id: "YearFrom",
      placeholder: "Year Start",
    },
    { type: "year", names: "yearEnd", id: "YearTo", placeholder: "Year End" },
  ];
  const handleDayToChange = (e) => {
    const { name, value } = e.target;
    setFormDate((prevFormDate) => ({ ...prevFormDate, [name]: value }));
  };
  const handleYearToChange = (e) => {
    const { name, value } = e.target;
    setFormYear((prevFormYear) => ({ ...prevFormYear, [name]: value }));
  };
  const handleMonthClick = async () => {
    const newData = [];
    if (formDate.dayFrom !== null) {
      if (formDate.dayTo !== null) {
        if (formDate.dayFrom > formDate.dayTo) {
          setVali("error");
          setInfo("The start date must be less than the end date!");
        } else {
          const start = new Date(formDate.dayFrom);
          const end = new Date(formDate.dayTo);
          const monthsBetween =
            (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth());
          // Kiểm tra nếu khoảng cách lớn hơn 15 tháng
          if (monthsBetween > 20) {
            // Thực hiện các hành động cần thiết
            setVali("error");
            setInfo("The gap between two months must be less than 20!");
          } else {
            try {
              const response = await getOrderDate(formDate); // Đợi promise getOrderDate hoàn thành và lấy kết quả
              newData.push(...response);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        }
      } else {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Thêm '0' phía trước nếu tháng chỉ có 1 chữ số
        const dayTo = `${year}-${month}`;

        // Cập nhật formDate với dayTo mới
        formDate.dayTo = dayTo;
        const start = new Date(formDate.dayFrom);
        const end = new Date(dayTo);
        const monthsBetween =
          (end.getFullYear() - start.getFullYear()) * 12 +
          (end.getMonth() - start.getMonth());
        // Kiểm tra nếu khoảng cách lớn hơn 15 tháng
        if (monthsBetween > 20) {
          // Thực hiện các hành động cần thiết
          setVali("error");
          setInfo("The gap between two months must be less than 20!");
        } else {
          try {
            const response = await getOrderDate(formDate); // Đợi promise getOrderDate hoàn thành và lấy kết quả
            newData.push(...response);
            // Xử lý dữ liệu response ở đây nếu cần
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      }
    }
    if (newData.length > 0) {
      const label = [];
      const total = [];
      newData.forEach((item) => {
        label.push(item.label);
        total.push(item.total);
      });
      setLabels(label);
      setData(total);
    }
  };

  const handleYearClick = async () => {
    const newData = [];
    if (formYear.yearStart !== null) {
      if (formYear.yearEnd !== null) {
        if (formYear.yearStart > formYear.yearEnd) {
          setVali("error");
          setInfo("The start year must be less than the end year!");
        } else {
          if (parseInt(formYear.yearEnd) - parseInt(formYear.yearStart) > 10) {
            setVali("error");
            setInfo("The gap between two years must be less than 10!");
          } else {
            try {
              const response = await getOrderYear(formYear); // Đợi promise getOrderDate hoàn thành và lấy kết quả
              newData.push(...response);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        }
      } else {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const YearEnd = `${year}`;
        // Cập nhật formDate với dayTo mới
        formYear.yearEnd = YearEnd;
        if (parseInt(YearEnd) - parseInt(formYear.yearStart) > 10) {
          setVali("error");
          setInfo("The gap between two years must be less than 10!");
        } else {
          try {
            const response = await getOrderYear(formYear); // Đợi promise getOrderDate hoàn thành và lấy kết quả
            newData.push(...response);
            // Xử lý dữ liệu response ở đây nếu cần
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      }
    } else {
      setVali("error");
      setInfo("Fill in start year!");
    }
    if (newData.length > 0) {
      const label = [];
      const total = [];
      newData.forEach((item) => {
        label.push(item.label);
        total.push(item.total);
      });
      setLabels(label);
      setData(total);
    }
    await getOrderYear(formYear);
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
  return (
    <div className="h-4/5">
      <div className="mt-4 mb-3">
        <div className="text-black text-start">
          <h3 className="font-bold">Reveneu Statistics</h3>
        </div>
      </div>
      <div>
        <div className="w-full h-">
          <div className=" w-12/12 mb-3 ">
            <div>
              <span className="font-sans">Month and Year</span>
              <br />
              <div className="w-12/12 flex">
                {input.map((field, index) => (
                  <InputAdmin
                    key={index}
                    type={field.type}
                    name={field.names}
                    id={field.id}
                    placeholder={field.placeholder}
                    onChange={handleDayToChange}
                  />
                ))}
                <div className="py-3 px-2">
                  <button
                    type="button"
                    className=" w-30 h-10 text-white bg-[#92814d] hover:bg-[#c2aa67] focus:ring-4 focus:ring-blue-300 font-sans rounded-lg text-sm px-5 py-1 me-2 mb-2"
                    onClick={handleMonthClick}
                  >
                    Month
                  </button>
                </div>
                {inputYear.map((field, index) => (
                  <div className="py-2 flex-col inline-block w-1/12 ms-2">
                    <div className=" w-12/12 py-1">
                      <div className="relative w-full h-10">
                        <input
                          key={index}
                          type="number"
                          min={1990}
                          step="1"
                          id={field.id}
                          name={field.names}
                          className="shadow-black peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                          placeholder=""
                          onChange={handleYearToChange}
                        />
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                          {field.placeholder}
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="py-3 px-2">
                  <button
                    type="button"
                    className=" w-30 h-10 text-white bg-[#92814d] hover:bg-[#c2aa67] focus:ring-4 focus:ring-blue-300 font-sans rounded-lg text-sm px-5 py-1 me-2 mb-2  "
                    onClick={handleYearClick}
                  >
                    Year
                  </button>
                </div>
              </div>
              <AlertAdmin vali={vali} info={info} />
            </div>
            <div className="w-12/12 py-5 mx-auto ">
              <Line options={options} data={chart} />;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Reveneu;
