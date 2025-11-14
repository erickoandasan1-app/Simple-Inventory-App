
import React, { useState, useEffect } from 'react';
import { EquipmentItem } from '../types';
import { generateDescription } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface EquipmentFormProps {
  item: EquipmentItem | null;
  onSave: (item: Omit<EquipmentItem, 'id'> & { id?: string }) => void;
  onCancel: () => void;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<EquipmentItem, 'id'>>({
    name: '',
    category: '',
    quantity: 1,
    purchaseDate: '',
    description: '',
  });
  
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        name: '',
        category: '',
        quantity: 1,
        purchaseDate: new Date().toISOString().split('T')[0],
        description: '',
      });
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'quantity' ? parseInt(value) : value }));
  };

  const handleGenerateDescription = async () => {
    if (!formData.name || !formData.category) {
      alert("Please enter a name and category first.");
      return;
    }
    setIsGenerating(true);
    try {
      const desc = await generateDescription(formData.name, formData.category);
      setFormData(prev => ({ ...prev, description: desc }));
    } catch (error) {
      console.error(error);
      alert("Failed to generate description.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: item?.id });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">{item ? 'Edit Equipment' : 'Add New Equipment'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-slate-700">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="purchaseDate" className="block text-sm font-medium text-slate-700">Purchase Date</label>
          <input
            type="date"
            id="purchaseDate"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
            <button
                type="button"
                onClick={handleGenerateDescription}
                disabled={isGenerating}
                className="flex items-center gap-1.5 text-sm text-indigo-600 font-semibold hover:text-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <SparklesIcon />
                {isGenerating ? 'Generating...' : 'Generate with AI'}
            </button>
        </div>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EquipmentForm;
