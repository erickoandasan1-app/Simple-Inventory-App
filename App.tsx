
import React, { useState, useEffect } from 'react';
import { EquipmentItem } from './types';
import Header from './components/Header';
import EquipmentTable from './components/EquipmentTable';
import EquipmentForm from './components/EquipmentForm';
import Modal from './components/Modal';
import { PlusIcon } from './components/icons/PlusIcon';

const App: React.FC = () => {
  const [equipment, setEquipment] = useState<EquipmentItem[]>(() => {
    try {
      const savedEquipment = localStorage.getItem('equipmentInventory');
      return savedEquipment ? JSON.parse(savedEquipment) : [
        {
          id: '1',
          name: 'MacBook Pro 16"',
          category: 'Laptop',
          quantity: 1,
          purchaseDate: '2023-10-15',
          description: 'A powerful laptop for development and design work, featuring the M2 Pro chip.'
        },
        {
          id: '2',
          name: 'Dell UltraSharp 27"',
          category: 'Monitor',
          quantity: 2,
          purchaseDate: '2023-09-20',
          description: 'A 4K monitor with excellent color accuracy, ideal for creative professionals.'
        },
        {
          id: '3',
          name: 'Logitech MX Master 3S',
          category: 'Mouse',
          quantity: 1,
          purchaseDate: '2023-11-01',
          description: 'An ergonomic wireless mouse with quiet clicks and a MagSpeed scroll wheel.'
        },
      ];
    } catch (error) {
      console.error("Failed to parse equipment from localStorage", error);
      return [];
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EquipmentItem | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('equipmentInventory', JSON.stringify(equipment));
    } catch (error) {
      console.error("Failed to save equipment to localStorage", error);
    }
  }, [equipment]);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: EquipmentItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSaveItem = (item: Omit<EquipmentItem, 'id'> & { id?: string }) => {
    if (item.id) {
      setEquipment(equipment.map(e => e.id === item.id ? { ...item, id: item.id } as EquipmentItem : e));
    } else {
      setEquipment([...equipment, { ...item, id: new Date().getTime().toString() }]);
    }
    handleCloseModal();
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setEquipment(equipment.filter(e => e.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-700">Inventory</h1>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
          >
            <PlusIcon />
            Add Equipment
          </button>
        </div>

        <EquipmentTable
          equipment={equipment}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteItem}
        />
      </main>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <EquipmentForm
            item={editingItem}
            onSave={handleSaveItem}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default App;
