import DataTable, { createTheme } from 'react-data-table-component';

createTheme('solarized', {
    text: {
        primary: '#000',
        secondary: '#2aa198',
    },
    background: {
        default: '#fff',
    },
    context: {
        background: '#cb4b16',
        text: '#FFFFFF',
    },
    divider: {
        default: '#000',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
});
// sample data type
const data = [
    {
        userName: 'Aditya',
        mobileNumber: '9876546789',
        dob: '14-Dec-1995',
        flatNo: '202',
        actions: 'button',
    },
    {
        userName: 'Deepak',
        mobileNumber: '9876546789',
        dob: '12-Dec-1996',
        flatNo: '201',
        actions: 'button',
    },
    {
        userName: 'Aditya',
        mobileNumber: '9876546789',
        dob: '14-Jan-1995',
        flatNo: '210',
        actions: 'button',
    },
];

// sample coulumns
const columns = [
    {
        name: 'User Name',
        selector: 'userName',
        sortable: true,
        center: true,
    },
    {
        name: 'Mobile Number',
        selector: 'mobileNumber',
        sortable: true,
        center: true,
    },
    {
        name: 'Date of birth',
        selector: 'dob',
        sortable: true,
        center: true,
    },
    {
        name: 'Flat Number',
        selector: 'flatNo',
        sortable: true,
        center: true,
    },
    {
        name: 'Actions',
        selector: 'actions',
        sortable: true,
        center: true,
    },
];
const MyComponent = () => (
    <DataTable
        title="Users Details"
        columns={columns}
        data={data}
        theme="solarized"
        pagination={true}
    />
);

export default MyComponent;
