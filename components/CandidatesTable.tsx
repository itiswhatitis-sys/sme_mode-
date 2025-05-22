// CandidatesTable.tsx
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
  SortingState,
  ColumnMeta,
  Header,
  Table
} from '@tanstack/react-table';
import { MoreVertical, ChevronDown, ChevronUp, Search, ChevronLeft, ChevronRight } from 'lucide-react';

// Dummy data for candidates
const defaultData: Candidate[] = [
  {
    id: '1',
    regNumber: 'REG001',
    jobRole: 'Frontend Developer',
    roundsPassed: 2,
    status: 'In Progress'
  },
  {
    id: '2',
    regNumber: 'REG002',
    jobRole: 'Backend Developer',
    roundsPassed: 3,
    status: 'Selected'
  },
  {
    id: '3',
    regNumber: 'REG003',
    jobRole: 'UI/UX Designer',
    roundsPassed: 1,
    status: 'In Progress'
  },
  {
    id: '4',
    regNumber: 'REG004',
    jobRole: 'Full Stack Developer',
    roundsPassed: 0,
    status: 'Rejected'
  },
  {
    id: '5',
    regNumber: 'REG005',
    jobRole: 'Data Scientist',
    roundsPassed: 2,
    status: 'In Progress'
  },
  {
    id: '6',
    regNumber: 'REG006',
    jobRole: 'Product Manager',
    roundsPassed: 3,
    status: 'Selected'
  },
  {
    id: '7',
    regNumber: 'REG007',
    jobRole: 'DevOps Engineer',
    roundsPassed: 1,
    status: 'In Progress'
  },
  {
    id: '8',
    regNumber: 'REG008',
    jobRole: 'QA Engineer',
    roundsPassed: 2,
    status: 'In Progress'
  }
];

// Define candidate interface
interface Candidate {
  id: string;
  regNumber: string;
  jobRole: string;
  roundsPassed: number;
  status: 'Selected' | 'Rejected' | 'In Progress';
}

const CandidatesTable = () => {
  const [data] = useState<Candidate[]>(defaultData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  // Define columns
  const columns: ColumnDef<Candidate>[] = [
    {
      accessorKey: 'regNumber',
      header: ({ column }) => {
        return (
          <button
            className="flex items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Reg. Number
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="h-4 w-4" />
            ) : null}
          </button>
        );
      }
    },
    {
      accessorKey: 'jobRole',
      header: ({ column }) => {
        return (
          <button
            className="flex items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Job Role
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="h-4 w-4" />
            ) : null}
          </button>
        );
      }
    },
    {
      accessorKey: 'roundsPassed',
      header: ({ column }) => {
        return (
          <button
            className="flex items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Rounds Passed
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="h-4 w-4" />
            ) : null}
          </button>
        );
      }
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as Candidate['status'];
        let statusClass = '';
        
        switch(status) {
          case 'Selected':
            statusClass = 'bg-green-400 text-white dark:bg-green-800 dark:text-white';
            break;
          case 'Rejected':
            statusClass = 'bg-red-500 text-white dark:bg-red-800 dark:text-white';
            break;
          case 'In Progress':
            statusClass = 'bg-blue-500 text-white dark:bg-blue-700 dark:text-white';
            break;
          default:
            statusClass = 'bg-gray-700 text-white dark:bg-gray-700 dark:text-white';
        }
        
        return (
          <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${statusClass}`}>
            {status}
          </div>
        );
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const rowId = row.original.id;
        
        const handleActions = (action: string) => {
          if (action === 'view') {
            // Navigate to student dashboard
            console.log(`Navigating to student dashboard for ID: ${rowId}`);
            // Replace with your navigation logic
            // Example: router.push(`/student-dashboard/${rowId}`);
          }
          setDropdownOpen(null);
        };
        
        return (
          <div className="relative">
            <button
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                setDropdownOpen(dropdownOpen === rowId ? null : rowId);
              }}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            
            {dropdownOpen === rowId && (
              <div 
                className="absolute right-0 z-10 mt-1 w-36 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                onBlur={() => setDropdownOpen(null)}
              >
                <div className="py-1">
                  <button
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation();
                      handleActions('view');
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    View Dashboard
                  </button>
                </div>
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
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Search bar */}
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
      
      {/* Table */}
      <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 font-medium">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
      
      {/* Pagination */}
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