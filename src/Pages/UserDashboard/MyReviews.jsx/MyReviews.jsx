import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Contex/AuthProvaider";
import useAxiosSecure from "../../../Hooks/useAxiosSequre";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import EditReview from "./EditReview";
import { Link } from "react-router-dom";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const axiosSequre = useAxiosSecure();
  const {
    refetch,
    isPending,
    data: reviews = [],
  } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSequre.get(`/review?email=${user.email}`);
      return res.data;
    },
  });
  console.log("reviews are ", reviews);

  //handle delete review
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSequre.delete(`/review/${id}`).then((res) => {
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
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Scholarship name</th>
              <th>university name</th>
              <th>Review date</th>
              <th>Review comments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {reviews.map((item, index) => (
              <tr key={item._id} className="bg-base-200">
                <th>{index + 1}</th>
                <td>{item.Scholarship_name}</td>
                <td>{item.University_name}</td>
                <td>{item.Review_date}</td>
                <td>{item.Review_comment}</td>
                <td>
                  <div className="text-xl flex gap-3 items-center">
                    <button onClick={() => handleDelete(item._id)}>
                      <MdDelete />
                    </button>
                    <Link to={`/dashbord/editreview/${item._id}`}>
                      <FaEdit />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReviews;
