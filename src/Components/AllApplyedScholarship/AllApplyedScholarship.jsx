import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSequre";
import { TbListDetails } from "react-icons/tb";
import { MdDelete, MdFeedback } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Feedback from "../Feedback/Feedback";
import { useState } from "react";
// import useScholarship from "../../Hooks/useScholarship";

const AllApplyedScholarship = () => {
  const axiosSequre = useAxiosSecure();

  const [modal, setModal] = useState();

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

  //handle status of application
  const statusProcess = (item) => {
    axiosSequre
      .patch(`/applicationp/${item._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "now status is change",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .then((error) => {
        console.log(error);
      });
  };
  const statusComplete = (item) => {
    axiosSequre
      .patch(`/applicationc/${item._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "now status is change",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .then((error) => {
        console.log(error);
      });
  };
  //handle feedback
  const handleFeedback = (item) => {
    axiosSequre.get(`applications/${item._id}`).then((res) => {
      setModal(res.data);
    });
    document.getElementById("my_modal_2").showModal();
  };
  console.log("modal info", modal);

  return (
    <div>
      <div className="overflow-x-auto">
        <h1>this is the header</h1>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>University Name</th>
              <th>Scholarship Name</th>
              <th>Scholarship Category</th>
              <th>Subject Category</th>

              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {applications.map((item, index) => (
              <tr className="mb-10" key={item._id}>
                <th>{index + 1}</th>
                {/* <td>{item.Status}</td> */}
                <td>{item.University_Name}</td>
                <td>{item.Scholarship_Name}</td>
                <td>{item.Scholarship_category}</td>
                <td>{item.Subject_Category}</td>

                <td>
                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">
                      {item.Status}
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mb-10"
                    >
                      <li onClick={() => statusProcess(item)}>
                        <a>processing</a>
                      </li>
                      <li onClick={() => statusComplete(item)}>
                        <a>complete</a>
                      </li>
                    </ul>
                  </div>
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
                        <button onClick={() => handleFeedback(item)}>
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

                      <li className="py-1">S.S.C Result : {item.SSC_result}</li>
                      <li className="py-1">H.S.C Result : {item.HSC_result}</li>
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

      {/* show feedback modal  */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <Feedback modal={modal}></Feedback>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllApplyedScholarship;
