import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import useAxiosSecure from "../../../Hooks/useAxiosSequre";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Contex/AuthProvaider";

const MyApplication = () => {
  const { user } = useContext(AuthContext);
  const axiosSequre = useAxiosSecure();

  const { data: application = [] } = useQuery({
    queryKey: ["application", user?.email],
    queryFn: async () => {
      const res = await axiosSequre.get(`/application?email=${user.email}`);
      return res.data;
    },
  });
  console.log("application data : ", application);

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto">
        <table className="table mt-10">
          {/* head */}

          <thead>
            <tr>
              <th>#</th>
              <th>University Name</th>
              <th>Subject Category</th>
              <th>Degree</th>
              <th>Scholarship_category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {application.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.University_Name}</td>
                <td>{item.Subject_Category}</td>
                <td>{item.Degree}</td>
                <td>{item.Scholarship_category}</td>
                <td>{item.Status}</td>
                <td>
                  <ul className="flex items-center gap-1 text-xl">
                    <li className="tooltip" data-tip="details">
                      <TbListDetails />
                    </li>
                    <li className="tooltip" data-tip="edit">
                      <FaEdit />
                    </li>
                    <li className="tooltip" data-tip="delete">
                      <MdDelete />
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplication;
