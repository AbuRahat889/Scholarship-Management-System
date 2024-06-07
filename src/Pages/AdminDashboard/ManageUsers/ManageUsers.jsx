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
  const statusComplete = (user) => {
    axiosSequre
      .patch(`/users/admin/${user._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is admin`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .then((error) => {
        console.log(error);
      });
  };

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
                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">
                      {user.role ? user.role : "user"}
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mb-10"
                    >
                      <li onClick={() => statusComplete(user)}>
                        <a>Admin</a>
                      </li>
                      <li>
                        <a>Moderator</a>
                      </li>
                    </ul>
                  </div>
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
