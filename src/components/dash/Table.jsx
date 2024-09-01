import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function Table({ onEdit, onDelete, data }) {
  return (
    <table className="min-w-full table-auto">
      <thead className="bg-gray-800">
        <tr>
          <th className="py-2">
            <span className="text-gray-200">Image</span>
          </th>
          <th className="py-2">
            <span className="text-gray-200">Brand</span>
          </th>
          <th className="py-2">
            <span className="text-gray-200">Model</span>
          </th>
          <th className="py-2">
            <span className="text-gray-200">Year</span>
          </th>
          <th className="py-2">
            <span className="text-gray-200">Price</span>
          </th>
          <th className="py-2">
            <span className="text-gray-200">Available</span>
          </th>
          <th className="py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data &&
          data.map((item) => {
            return (
              <tr
                className="bg-gray-50 text-center py-32 border-b-2"
                key={item._id}
              >
                <td className="relative py-2 text-gray-600 w-[160px] h-[90px]">
                  <Image
                    src={item.image}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    alt=""
                  />
                </td>
                <td className="py-2 text-gray-600">
                  <span className="text-center">{item.brand}</span>
                </td>
                <td className="py-2 text-gray-600">
                  <span className="text-center">{item.model}</span>
                </td>
                <td className="py-2 text-gray-600">
                  <span className="text-center">{item.year}</span>
                </td>
                <td className="py-2 text-gray-600">
                  <span className="text-center">
                    &#8373;{item.price}
                    <sub>/day</sub>
                  </span>
                </td>
                <td className="py-2 text-gray-600">
                  <span
                    className={`${
                      item.available === true ? "bg-green-500" : "bg-red-500"
                    } text-center text-white px-5 py-1 rounded-full`}
                  >
                    {item.available === true ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-2 text-gray-600">
                  <div className="flex items-center space-x-3">
                    <button
                      className="text-green-500"
                      onClick={() => onEdit(item)}
                    >
                      <TbEdit size={23} />
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => onDelete(item)}
                    >
                      <MdOutlineDeleteOutline size={23} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
