import { deleteUser } from "../../../services/systemUserService";

const SystemUserList = ({ users, refreshList, setEditingId }) => {
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const res = await deleteUser(id);
      if (res.ok) refreshList();
      else alert("Failed to delete user");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">System User List</h2>
      <table className="w-full text-sm text-black bg-white border border-gray-300 rounded-2xl shadow-lg mt-8">
        <thead className="bg-black text-white">
          <tr>
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Last Login</th>
            <th className="border p-2">Articles Published</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id} className="text-center">
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">{user.status}</td>
              <td className="border p-2">
                {user.last_login
                  ? new Date(user.last_login).toLocaleString()
                  : "-"}
              </td>
              <td className="border p-2">{user.articles_published_count}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setEditingId(user.user_id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.user_id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SystemUserList;
