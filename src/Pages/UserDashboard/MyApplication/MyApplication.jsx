import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import useAxiosSecure from "../../../Hooks/useAxiosSequre";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Contex/AuthProvaider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AddReviews from "../Reviews/AddReviews";

const MyApplication = () => {
  const { user } = useContext(AuthContext);
  const axiosSequre = useAxiosSecure();
  const navigate = useNavigate();

  const {
    refetch,
    isPending,
    data: application = [],
  } = useQuery({
    queryKey: ["application", user?.email],
    queryFn: async () => {
      const res = await axiosSequre.get(`/application?email=${user.email}`);
      return res.data;
    },
  });
  console.log("application data : ", application);
  //handle Details page
  const handleDetails = (id) => {
    navigate(`/details/${id}`);
  };

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
  if (isPending) return "Loading...";

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
              <th>Reviwe</th>
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
                      <button
                        onClick={() => handleDetails(item.Scholarship_id)}
                      >
                        <TbListDetails />
                      </button>
                    </li>
                    <li className="tooltip" data-tip="edit">
                      {item.Status == "pending" ? (
                        <Link to={`/dashbord/update/${item._id}`}>
                          <button>
                            <FaEdit />
                          </button>
                        </Link>
                      ) : (
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "You can not Edit application is processing",
                          footer: '<a href="#">Why do I have this issue?</a>',
                        })
                      )}
                    </li>
                    <li className="tooltip" data-tip="delete">
                      <button onClick={() => handleDelete(item._id)}>
                        <MdDelete />
                      </button>
                    </li>
                  </ul>
                </td>
                <td>
                  <Link to={`/dashbord/review/${item._id}`}
                  // onClick={() => document.getElementById("my_modal_4").showModal()}
                   className="btn btn-outline">add review</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        // onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <AddReviews></AddReviews>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyApplication;
