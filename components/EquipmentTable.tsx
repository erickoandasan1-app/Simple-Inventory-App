
import React from 'react';
import { EquipmentItem } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';

interface EquipmentTableProps {
  equipment: EquipmentItem[];
  onEdit: (item: EquipmentItem) => void;
  onDelete: (id: string) => void;
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({ equipment, onEdit, onDelete }) => {
  if (equipment.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold text-slate-600">No equipment found.</h2>
        <p className="text-slate-500 mt-2">Add your first piece of equipment to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-slate-700 uppercase bg-slate-100">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Quantity</th>
              <th scope="col" className="px-6 py-3">Purchase Date</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((item) => (
              <tr key={item.id} className="bg-white border-b last:border-b-0 hover:bg-slate-50 transition-colors duration-200">
                <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                  {item.name}
                </th>
                <td className="px-6 py-4">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{item.category}</span>
                </td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">{item.purchaseDate}</td>
                <td className="px-6 py-4 max-w-xs truncate" title={item.description}>
                  {item.description}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center space-x-3">
                    <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-800 transition-colors" title="Edit">
                      <EditIcon />
                    </button>
                    <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-800 transition-colors" title="Delete">
                      <TrashIcon />
                    </button>
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

export default EquipmentTable;
