import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSequre";
import { TbListDetails } from "react-icons/tb";
import { MdDelete, MdFeedback } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FeedBack from "./ApplicationDetails";
// import useScholarship from "../../Hooks/useScholarship";

const AllApplyedScholarship = () => {
  const axiosSequre = useAxiosSecure();
  const navigate = useNavigate();

  const { refetch, data: applications = [] } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSequre.get(`/applications`);
      return res.data;
    },
  });

  //handle delete application
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSequre.delete(`/application/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>University Name</th>
              <th>Scholarship Name</th>
              <th>Scholarship Category</th>
              <th>Subject Category</th>
              <th>Applied Degree</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {applications.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.University_Name}</td>
                <td>{item.Scholarship_Name}</td>
                <td>{item.Scholarship_category}</td>
                <td>{item.Subject_Category}</td>
                <td>{item.Degree}</td>
                <td>
                  <select
                    defaultValue="default"
                    className="select select-bordered"
                  >
                    <option disabled value={"default"}>
                      pending
                    </option>
                    <option value="processing">processing</option>
                    <option value="completed">completed</option>
                  </select>
                </td>
                <td>
                  <ul className="flex items-center gap-1 text-xl">
                    <li className="tooltip" data-tip="details">
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
                      >
                        <TbListDetails />
                      </button>
                    </li>
                    <li className="tooltip" data-tip="Feedback">
                      <Link>
                        <button>
                          <MdFeedback />
                        </button>
                      </Link>
                    </li>
                    <li className="tooltip" data-tip="delete">
                      <button onClick={() => handleDelete(item._id)}>
                        <MdDelete />
                      </button>
                    </li>
                  </ul>
                </td>
                {/* use modal for applicatin details */}
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">
                      {item.University_Name}
                    </h3>
                    <ul>
                      <li className="py-1">
                        Applicant Name : {item.Applicant_name}
                      </li>
                      <li className="py-1">
                        Applicant Email : {item.Applicant_email}
                      </li>
                      <li className="py-1">{item.Scholarship_Name}</li>
                      <li className="py-1">{item.Scholarship_category}</li>
                      <li className="py-1">{item.Degree}</li>
                      <li className="py-1">{item.Scholarship_Name}</li>
                      <li className="py-1">
                        Application Fee : {item.Application_fees}
                      </li>
                    </ul>

                    <div className="modal-action">
                      <form method="dialog">
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllApplyedScholarship;
