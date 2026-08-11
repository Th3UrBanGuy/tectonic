"use client";
import React, { useState, useRef } from 'react';
import { Save, Plus, Trash2, Upload, Link as LinkIcon, Image as ImageIcon, Eye, EyeOff, GripVertical, ExternalLink, Award } from 'lucide-react';
import { useContent } from '../ContentContext';

interface GalleryItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl: string;
  link: string;
  category: string;
  orderIndex: number;
  isActive: boolean;
}

const CertificationGalleryManager: React.FC = () => {
  const { certificationGallery, setCertificationGallery } = useContent();
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const items = certificationGallery as GalleryItem[];

  const updateItem = (id: string, field: keyof GalleryItem, value: any) => {
    setCertificationGallery(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    const newItem: GalleryItem = {
      id: `gallery-${Date.now()}`,
      title: '',
      issuer: '',
      date: '',
      description: '',
      imageUrl: '',
      link: '',
      category: 'certification',
      orderIndex: items.length,
      isActive: true,
    };
    setCertificationGallery([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setCertificationGallery(items.filter(item => item.id !== id));
  };

  const handleImageUpload = async (id: string, file: File) => {
    setUploadingId(id);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('title', 'temp');

      const res = await fetch('/api/certification-gallery', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        // Get the image URL from the created item, then update our local item
        const imageUrl = data.data?.imageUrl || '';
        // Remove the temp item created by the POST
        await fetch(`/api/certification-gallery?id=${data.data.id}`, { method: 'DELETE' });
        // Update local state with the image URL
        updateItem(id, 'imageUrl', imageUrl);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploadingId(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setCertificationGallery(items);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Certification Gallery</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Upload certificate images or add links to showcase credentials</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addItem} className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 rounded-lg text-sm font-medium hover:bg-green-500/20 transition-colors">
            <Plus size={16} /> Add Certificate
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/30 rounded-lg text-sm font-medium hover:bg-brand-500/20 transition-colors disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </div>

      {/* Gallery Items */}
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={item.id} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
            {/* Card Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <GripVertical size={16} className="text-slate-300 dark:text-slate-600 cursor-grab" />
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 font-mono">#{idx + 1}</span>
                {item.imageUrl && <ImageIcon size={14} className="text-green-500" />}
                {item.link && !item.imageUrl && <LinkIcon size={14} className="text-blue-500" />}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateItem(item.id, 'isActive', !item.isActive)}
                  className={`p-1.5 rounded-lg transition-colors ${item.isActive ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                  title={item.isActive ? 'Active' : 'Inactive'}
                >
                  {item.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => removeItem(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-4">
              {/* Title + Issuer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Certificate Title *</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                    placeholder="e.g., AWS Solutions Architect"
                    className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Issuer</label>
                  <input
                    type="text"
                    value={item.issuer}
                    onChange={(e) => updateItem(item.id, 'issuer', e.target.value)}
                    placeholder="e.g., Amazon Web Services"
                    className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50"
                  />
                </div>
              </div>

              {/* Date + Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={item.date}
                    onChange={(e) => updateItem(item.id, 'date', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Category</label>
                  <select
                    value={item.category}
                    onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 appearance-none cursor-pointer"
                  >
                    <option value="certification">Certification</option>
                    <option value="award">Award</option>
                    <option value="license">License</option>
                    <option value="completion">Completion</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Order</label>
                  <input
                    type="number"
                    value={item.orderIndex}
                    onChange={(e) => updateItem(item.id, 'orderIndex', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  placeholder="Brief description of the certification"
                  className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>

              {/* Image Upload OR Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Image Upload */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    <Upload size={12} className="inline mr-1" />
                    Certificate Image
                  </label>
                  {item.imageUrl ? (
                    <div className="relative group/img">
                      <div className="w-full h-32 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <label className="cursor-pointer px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-medium rounded-lg transition-colors">
                          Replace
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(item.id, file);
                          }} />
                        </label>
                        <button onClick={() => updateItem(item.id, 'imageUrl', '')} className="px-3 py-1.5 bg-red-500/50 hover:bg-red-500/70 text-white text-xs font-medium rounded-lg transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed border-slate-200 dark:border-white/10 hover:border-brand-400 dark:hover:border-brand-500 cursor-pointer transition-colors bg-slate-50 dark:bg-white/[0.02]">
                      <Upload size={20} className="text-slate-400 mb-1" />
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {uploadingId === item.id ? 'Uploading...' : 'Click to upload'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingId === item.id}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(item.id, file);
                        }}
                      />
                    </label>
                  )}
                </div>

                {/* Link */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    <LinkIcon size={12} className="inline mr-1" />
                    Certificate Link
                  </label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={item.link}
                      onChange={(e) => updateItem(item.id, 'link', e.target.value)}
                      placeholder="https://verify.example.com/cert/..."
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50"
                    />
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-brand-500 hover:text-brand-600 transition-colors"
                      >
                        <ExternalLink size={12} /> Open link
                      </a>
                    )}
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">Paste a link to verify or view the certificate online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <Award size={48} className="mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium mb-1">No certificates yet</p>
            <p className="text-sm">Add your first certificate to showcase on the Company page.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationGalleryManager;
