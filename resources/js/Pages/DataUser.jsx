import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Navbar from '../Components/Navbar';

export default function DataUser() {
    const { props } = usePage();
    const { user, users, flash } = props;

    // State untuk flash message
    const [flashMessage, setFlashMessage] = useState(flash || null);

    // Handler untuk hapus user
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this data pengguna?')) {
            router.delete(route('users.destroy', id), {
                onSuccess: () => {
                    setFlashMessage({ type: 'success', message: 'Data pengguna berhasil dihapus' });
                },
                onError: (errors) => {
                    setFlashMessage({
                        type: 'error',
                        message: errors.message || 'Gagal menghapus data pengguna.',
                    });
                },
            });
        }
    };

    return (
        <div className="min-h-screen bg-blue-50">
            <Navbar />
            <div className="p-6">
                <p className="mb-2">Selamat datang, {user.name}!</p>
                <h1 className="text-xl font-semibold mb-4">Daftar Pengguna</h1>

                {/* Tampilkan flash message */}
                {flashMessage && (
                    <div
                        className={`mb-4 p-4 rounded ${
                            flashMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}
                    >
                        {flashMessage.message}
                    </div>
                )}

                <div className="overflow-x-auto bg-white rounded-lg w-full">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead style={{ backgroundColor: '#27548A' }} className="text-white">
                            <tr>
                                <th scope="col" className="py-3 px-4 sm:px-6 text-left">
                                    No.
                                </th>
                                <th scope="col" className="py-3 px-4 sm:px-6 text-left">
                                    Nama Pengguna
                                </th>
                                <th scope="col" className="py-3 px-4 sm:px-6 text-left">
                                    Email
                                </th>
                                <th scope="col" className="py-3 px-4 sm:px-6 text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.length > 0 ? (
                                users.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="bg-white hover:bg-gray-100 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{index + 1}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="ml-2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-3 py-1.5 focus:outline-none"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-6 py-4 text-center text-sm text-gray-500"
                                    >
                                        Belum ada pengguna.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}