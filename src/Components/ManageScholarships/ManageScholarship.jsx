import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSequre";
// import useAllScholarship from "../../Hooks/useAllScholarship";

const ManageScholarship = ({ refetch, scholarship }) => {
  //   const scholarship = useAllScholarship();
  const navigate = useNavigate();
  const axiosSequre = useAxiosSecure();

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
        axiosSequre.delete(`/scholarship/${id}`).then((res) => {
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
              <th>Scholarship name</th>
              <th>University Name</th>
              <th>Subject Category</th>
              <th>Applied Degree</th>
              <th>Application Fees</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {scholarship.map((item, index) => (
              <tr key={item._id} className="py-2">
                <th>{index + 1}</th>
                <td>{item.Scholarship_Name}</td>
                <td>{item.University_Name}</td>
                <td>{item.Subject_category}</td>
                <td>{item.Degree}</td>
                <td>{item.Application_fees}</td>
                <td>
                  <ul className="flex items-center gap-1 text-xl">
                    <li className="tooltip" data-tip="details">
                      <button onClick={() => handleDetails(item._id)}>
                        <TbListDetails />
                      </button>
                    </li>
                    <li className="tooltip" data-tip="edit">
                      <Link to={`/dashbord/editscholarship/${item._id}`}>
                        <button>
                          <FaEdit />
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageScholarship;
