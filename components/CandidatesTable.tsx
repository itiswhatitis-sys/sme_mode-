'use client';

import React, { useState, MouseEvent } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState
} from '@tanstack/react-table';
import { MoreVertical, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  regNumber: string;
  dept: string;
  status: 'Active' | 'Inactive' | 'NA';
}

const defaultData: Candidate[] = [
  { id: '1', name: 'Murali', regNumber: 'REG001', dept: 'Computer Science', status: 'Active' },
  { id: '2', name: 'Gowtham', regNumber: 'REG002', dept: 'Information Tech', status: 'Inactive' },
  { id: '3', name: 'Monish', regNumber: 'REG003', dept: 'Electrical Engg', status: 'NA' },
  { id: '4', name: 'Vijayraj', regNumber: 'REG004', dept: 'Mechanical Engg', status: 'Inactive' },
  { id: '5', name: 'Sahana', regNumber: 'REG005', dept: 'Civil Engg', status: 'Active' },
  { id: '6', name: 'Aakash', regNumber: 'REG006', dept: 'Computer Science', status: 'NA' },
  { id: '7', name: 'Divya', regNumber: 'REG007', dept: 'Electronics', status: 'Active' },
  { id: '8', name: 'Karthik', regNumber: 'REG008', dept: 'Information Tech', status: 'Inactive' },
  { id: '9', name: 'Sneha', regNumber: 'REG009', dept: 'Mechanical Engg', status: 'Active' },
  { id: '10', name: 'Pranav', regNumber: 'REG010', dept: 'Electrical Engg', status: 'NA' },
  { id: '11', name: 'Lavanya', regNumber: 'REG011', dept: 'Computer Science', status: 'Active' },
  { id: '12', name: 'Yogesh', regNumber: 'REG012', dept: 'Civil Engg', status: 'Inactive' },
  { id: '13', name: 'Harini', regNumber: 'REG013', dept: 'Electronics', status: 'Active' },
  { id: '14', name: 'Manoj', regNumber: 'REG014', dept: 'Mechanical Engg', status: 'Inactive' },
  { id: '15', name: 'Revathi', regNumber: 'REG015', dept: 'Information Tech', status: 'Active' },
  { id: '16', name: 'Arjun', regNumber: 'REG016', dept: 'Electrical Engg', status: 'NA' },
  { id: '17', name: 'Sathya', regNumber: 'REG017', dept: 'Civil Engg', status: 'Inactive' },
  { id: '18', name: 'Deepak', regNumber: 'REG018', dept: 'Computer Science', status: 'Active' },
  { id: '19', name: 'Meena', regNumber: 'REG019', dept: 'Mechanical Engg', status: 'NA' },
  { id: '20', name: 'Vikram', regNumber: 'REG020', dept: 'Information Tech', status: 'Active' },
  { id: '21', name: 'Anjali', regNumber: 'REG021', dept: 'Electronics', status: 'Inactive' },
  { id: '22', name: 'Rakesh', regNumber: 'REG022', dept: 'Civil Engg', status: 'Active' },
  { id: '23', name: 'Shruti', regNumber: 'REG023', dept: 'Electrical Engg', status: 'Inactive' },
  { id: '24', name: 'Dinesh', regNumber: 'REG024', dept: 'Computer Science', status: 'Active' },
  { id: '25', name: 'Bhavya', regNumber: 'REG025', dept: 'Information Tech', status: 'NA' }
];


const CandidatesTable = () => {
  const [data] = useState<Candidate[]>(defaultData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const columns: ColumnDef<Candidate>[] = [
    {
      header: 'S.No',
      cell: ({ row }) => row.index + 1
    },
    {
      accessorKey: 'name',
      header: 'Name'
    },
    {
      accessorKey: 'regNumber',
      header: 'Reg No'
    },
    {
      accessorKey: 'dept',
      header: 'Dept'
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as Candidate['status'];
        const colorMap = {
          Active: 'bg-green-500',
          Inactive: 'bg-red-500',
          NA: 'bg-blue-500'
        };
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full text-white ${colorMap[status]}`}>
            {status}
          </span>
        );
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const rowId = row.original.id;
        return (
          <div className="relative">
            <button
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                setDropdownOpen(dropdownOpen === rowId ? null : rowId);
              }}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            {dropdownOpen === rowId && (
              <div className="absolute right-0 z-10 mt-1 w-36 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                <button
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    console.log(`View dashboard for ID: ${rowId}`);
                    setDropdownOpen(null);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  View Dashboard
                </button>
              </div>
            )}
          </div>
        );
      }
    }
  ];

  const table = useReactTable<Candidate>({
    data,
    columns,
    state: {
      sorting,
      globalFilter
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          placeholder="Search candidates..."
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-8 pr-4 py-2 w-full md:w-64 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
        />
      </div>

      <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 font-medium">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`border-t border-gray-200 dark:border-gray-700 ${
                    i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'
                  } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-gray-900 dark:text-gray-100">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-6 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900"
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getPrePaginationRowModel().rows.length
          )}{' '}
          of {table.getPrePaginationRowModel().rows.length} candidates
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="p-1 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button
            className="p-1 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidatesTable;
