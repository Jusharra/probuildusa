import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle, 
  XCircle, AlertCircle, Edit, Trash2, Plus, Search, Filter,
  Eye, MessageSquare, RefreshCw, Download, Building2
} from 'lucide-react';
import { BookingService } from '../../services/bookingService';

interface Booking {
  id: string;
  lead_id: string | null;
  contractor_id: string | null;
  booking_type: 'consultation' | 'inspection' | 'project_start' | null;
  scheduled_at: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'canceled' | null;
  notes: string | null;
  created_at: string;
  lead?: {
    client_name: string | null;
    project_type: string | null;
    phone: string | null;
    email: string | null;
    zip_code: string | null;
  };
}

interface BookingManagementProps {
  contractorId: string;
}

const BookingManagement: React.FC<BookingManagementProps> = ({ contractorId }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadBookingData();
  }, [contractorId]);

  const loadBookingData = async () => {
    try {
      setLoading(true);
      const [bookingsData, statsData] = await Promise.all([
        BookingService.getBookingsForContractor(contractorId),
        BookingService.getBookingStats(contractorId)
      ]);
      
      setBookings(bookingsData || []);
      setStats(statsData || {});
    } catch (error) {
      console.error('Error loading booking data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId: string, newStatus: 'confirmed' | 'canceled' | 'completed') => {
    try {
      switch (newStatus) {
        case 'confirmed':
          await BookingService.confirmBooking(bookingId);
          break;
        case 'canceled':
          await BookingService.cancelBooking(bookingId);
          break;
        case 'completed':
          await BookingService.completeBooking(bookingId);
          break;
      }
      await loadBookingData();
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status. Please try again.');
    }
  };

  const handleCreateBooking = () => {
    setFormData({
      booking_type: 'consultation',
      scheduled_at: '',
      notes: '',
      status: 'pending'
    });
    setShowCreateModal(true);
  };

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setFormData({
      booking_type: booking.booking_type,
      scheduled_at: booking.scheduled_at ? new Date(booking.scheduled_at).toISOString().slice(0, 16) : '',
      notes: booking.notes || '',
      status: booking.status
    });
    setShowEditModal(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedBooking) {
        await BookingService.updateBooking(selectedBooking.id, {
          booking_type: formData.booking_type,
          scheduled_at: formData.scheduled_at,
          notes: formData.notes,
          status: formData.status
        });
      } else {
        await BookingService.createBooking({
          contractor_id: contractorId,
          booking_type: formData.booking_type,
          scheduled_at: formData.scheduled_at,
          notes: formData.notes,
          status: formData.status
        });
      }
      
      await loadBookingData();
      setShowCreateModal(false);
      setShowEditModal(false);
      setSelectedBooking(null);
      setFormData({});
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Failed to save booking. Please try again.');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = !searchTerm || 
      booking.lead?.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.lead?.project_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.booking_type?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesType = typeFilter === 'all' || booking.booking_type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/20 text-amber-400';
      case 'confirmed':
        return 'bg-blue-500/20 text-blue-400';
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'canceled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'canceled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string | null) => {
    switch (type) {
      case 'consultation':
        return 'bg-blue-500/20 text-blue-400';
      case 'inspection':
        return 'bg-amber-500/20 text-amber-400';
      case 'project_start':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const formatDateTime = (dateTime: string | null) => {
    if (!dateTime) return 'Not scheduled';
    return new Date(dateTime).toLocaleString();
  };

  const exportBookings = () => {
    const csvContent = [
      ['Date', 'Time', 'Client', 'Type', 'Status', 'Project', 'Notes'].join(','),
      ...filteredBookings.map(booking => [
        booking.scheduled_at ? new Date(booking.scheduled_at).toLocaleDateString() : '',
        booking.scheduled_at ? new Date(booking.scheduled_at).toLocaleTimeString() : '',
        booking.lead?.client_name || 'Unknown',
        booking.booking_type || 'Unknown',
        booking.status || 'Unknown',
        booking.lead?.project_type || 'Unknown',
        booking.notes || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-slate-400">Loading bookings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Booking Management</h2>
          <p className="text-slate-400">Manage your client appointments and project meetings</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportBookings}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button
            onClick={loadBookingData}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleCreateBooking}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-6 h-6 text-blue-400" />
            <span className="text-2xl font-bold">{stats.total}</span>
          </div>
          <div className="text-sm text-slate-400">Total Bookings</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-6 h-6 text-amber-400" />
            <span className="text-2xl font-bold">{stats.pending}</span>
          </div>
          <div className="text-sm text-slate-400">Pending</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-2xl font-bold">{stats.confirmed}</span>
          </div>
          <div className="text-sm text-slate-400">Confirmed</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-2xl font-bold">{stats.completed}</span>
          </div>
          <div className="text-sm text-slate-400">Completed</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="consultation">Consultation</option>
              <option value="inspection">Inspection</option>
              <option value="project_start">Project Start</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left py-4 px-6 font-semibold">Date & Time</th>
                <th className="text-left py-4 px-6 font-semibold">Client</th>
                <th className="text-left py-4 px-6 font-semibold">Type</th>
                <th className="text-center py-4 px-6 font-semibold">Status</th>
                <th className="text-left py-4 px-6 font-semibold">Project</th>
                <th className="text-center py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-slate-700 hover:bg-slate-800/50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <div>
                        <div className="text-white font-semibold">
                          {booking.scheduled_at ? new Date(booking.scheduled_at).toLocaleDateString() : 'Not scheduled'}
                        </div>
                        <div className="text-sm text-slate-400">
                          {booking.scheduled_at ? new Date(booking.scheduled_at).toLocaleTimeString() : ''}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-white flex items-center space-x-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <span>{booking.lead?.client_name || 'Unknown'}</span>
                      </div>
                      <div className="text-sm text-slate-400 space-y-1">
                        {booking.lead?.phone && (
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span>{booking.lead.phone}</span>
                          </div>
                        )}
                        {booking.lead?.email && (
                          <div className="flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span>{booking.lead.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(booking.booking_type)}`}>
                      {booking.booking_type?.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center justify-center space-x-1 ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span>{booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-white">{booking.lead?.project_type || 'Unknown'}</div>
                      {booking.lead?.zip_code && (
                        <div className="text-sm text-slate-400 flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{booking.lead.zip_code}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                            className="p-2 text-slate-400 hover:text-green-400 transition-colors"
                            title="Confirm Booking"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(booking.id, 'canceled')}
                            className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                            title="Cancel Booking"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'completed')}
                          className="p-2 text-slate-400 hover:text-green-400 transition-colors"
                          title="Mark Complete"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleEditBooking(booking)}
                        className="p-2 text-slate-400 hover:text-amber-400 transition-colors"
                        title="Edit Booking"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400">No bookings found</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-slate-700">
            <h3 className="text-2xl font-bold mb-6">Create New Booking</h3>
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Booking Type</label>
                <select
                  value={formData.booking_type}
                  onChange={(e) => setFormData({...formData, booking_type: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  required
                >
                  <option value="consultation">Consultation</option>
                  <option value="inspection">Inspection</option>
                  <option value="project_start">Project Start</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Date & Time</label>
                <input
                  type="datetime-local"
                  value={formData.scheduled_at}
                  onChange={(e) => setFormData({...formData, scheduled_at: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Notes</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Additional notes..."
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border border-slate-600 text-slate-300 px-4 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-4 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Create Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-slate-700">
            <h3 className="text-2xl font-bold mb-6">Edit Booking</h3>
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Booking Type</label>
                <select
                  value={formData.booking_type}
                  onChange={(e) => setFormData({...formData, booking_type: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  required
                >
                  <option value="consultation">Consultation</option>
                  <option value="inspection">Inspection</option>
                  <option value="project_start">Project Start</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Date & Time</label>
                <input
                  type="datetime-local"
                  value={formData.scheduled_at}
                  onChange={(e) => setFormData({...formData, scheduled_at: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Notes</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Additional notes..."
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 border border-slate-600 text-slate-300 px-4 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-4 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Update Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;