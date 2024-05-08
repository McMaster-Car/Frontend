import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const UserTable = ({ Users }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 200,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 250,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'contact_no',
        header: 'Contact No',
        size: 150,
      },
      {
        accessorKey: 'isAdmin',
        header: 'Admin',
        size: 100,
      },
    ],
    [],
  );

  // Map data from Users to match the structure expected by MaterialReactTable
  const data = useMemo(() => {
    return Users.map(user => ({
      name: user.name,
      email: user.email,
      address: user.address || 'N/A', // Handle missing address
      contact_no: user.contact_no || 'N/A', // Handle missing contact_no
      isAdmin: user.isAdmin ? 'Yes' : 'No',
    }));
  }, [Users]);

  const table = useMaterialReactTable({
    columns,
    data,
  });

  return <MaterialReactTable table={table} />;
};

export default UserTable;
