import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSequre";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSequre = useAxiosSecure();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSequre.get(`/users`);
      return res.data;
    },
  });
  //handle delete user  axiosSequre.delete(`/users/${id}`);
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
        axiosSequre.delete(`/users/${id}`).then((res) => {
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

  //TODO: handle make admin
  //   const handleAdmin = (id) => {
  //     axiosSequre
  //       .patch(`/users/admin/${id}`)
  //       .then((res) => {
  //         if (res.data.modifiedCount > 0) {
  //           refetch();
  //           Swal.fire({
  //             position: "top-end",
  //             icon: "success",
  //             title: `${users.name} is admin now`,
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //         }
  //       })
  //       .then((error) => {
  //         console.log(error);
  //       });
  //   };

  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="font-bold">{user.name}</div>
                  </div>
                </td>
                <td>{user.email} </td>
                <td>
                  <select
                    defaultValue="default"
                    className="select select-bordered"
                  >
                    <option disabled value={"default"}>
                      User
                    </option>
                    <option value="moderator">Moderator</option>
                    <option>Admin</option>
                  </select>
                </td>
                <th>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-ghost text-xl text-error"
                  >
                    <MdDelete />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
