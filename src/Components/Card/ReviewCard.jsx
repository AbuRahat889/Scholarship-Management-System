import { Rating } from "@smastrom/react-rating";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSequre";

const ReviewCard = ({ item, refetch }) => {
  const axiosSequre = useAxiosSecure();

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
      <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex justify-center -mt-16 md:justify-end">
          {item?.Reviewer_image ? (
            <img
              className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
              alt="Reviewer"
              src={item?.Reviewer_image}
            />
          ) : (
            <img
              className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
              alt="Reviewer"
              src="https://i.ibb.co/QQtCMqv/avater.png"
            />
          )}
        </div>
        <Rating
          className="my-4"
          style={{ maxWidth: 100 }}
          value={item.Rating_point}
          readOnly
        />
        <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
          {item.Reviewer_name}
        </h2>
        <h2 className="mt-2 text-lg  text-gray-800 dark:text-white md:mt-0">
          {item.University_name}
        </h2>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
          {item.Review_comment}
        </p>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => handleDelete(item._id)}
            className="btn btn-outline btn-xs"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
