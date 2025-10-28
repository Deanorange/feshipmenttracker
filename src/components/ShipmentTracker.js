import React, { useState, useEffect } from 'react';
import { Package, Truck, RefreshCw, Calendar, MapPin, AlertCircle } from 'lucide-react';
import ApiService from '../services/api';

export default function ShipmentTracker() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  const loadShipments = async () => {
    setLoading(true);
    setError(null);
    try {
      const { shipments: data, usingMockData: mock } = await ApiService.fetchAllShipments();
      setShipments(data);
      setUsingMockData(mock);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to load shipments. Please try again.');
      console.error('Error fetching shipments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShipments();
  }, []);

  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('deliver')) return 'bg-green-100 text-green-800';
    if (statusLower.includes('transit')) return 'bg-blue-100 text-blue-800';
    if (statusLower.includes('customs') || statusLower.includes('clearance')) return 'bg-yellow-100 text-yellow-800';
    if (statusLower.includes('arrived') || statusLower.includes('facility')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  const summary = {
    total: shipments.length,
    fedex: shipments.filter(s => s.carrier === 'FedEx').length,
    dhl: shipments.filter(s => s.carrier === 'DHL').length,
    deliveryToday: shipments.filter(s => s.estimatedDelivery === '2025-10-27').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              Inbound Shipments
            </h1>
            {lastUpdated && (
              <p className="text-sm text-slate-500 mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          <button
            onClick={loadShipments}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Environment Info Banner */}
        {process.env.NODE_ENV === 'production' && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
            <Package className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-blue-900">Production Mode</p>
              <p className="text-sm text-blue-800 mt-1">
                Connected to backend: {process.env.REACT_APP_BACKEND_URL || 'Default'}
              </p>
            </div>
          </div>
        )}

        {/* Mock Data Warning */}
        {usingMockData && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-900">Using Mock Data</p>
              <p className="text-sm text-amber-800 mt-1">
                Unable to connect to API backend. Displaying sample data for demonstration purposes.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-red-900">Error</p>
              <p className="text-sm text-red-800 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="text-slate-600 text-sm font-medium mb-1">Total Shipments</div>
            <div className="text-3xl font-bold text-slate-800">{summary.total}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="text-slate-600 text-sm font-medium mb-1">FedEx</div>
            <div className="text-3xl font-bold text-purple-600">{summary.fedex}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="text-slate-600 text-sm font-medium mb-1">DHL</div>
            <div className="text-3xl font-bold text-yellow-600">{summary.dhl}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="text-slate-600 text-sm font-medium mb-1">Arriving Today</div>
            <div className="text-3xl font-bold text-green-600">{summary.deliveryToday}</div>
          </div>
        </div>

        {/* Shipments List */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Loading shipments...</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700">Tracking ID</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700">Carrier</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700">Origin</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700">Weight</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700">Est. Delivery</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {shipments.map((shipment) => (
                    <tr key={shipment.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="font-mono text-sm font-medium text-slate-800">
                          {shipment.id}
                        </div>
                        {shipment.note && (
                          <div className="text-xs text-amber-600 mt-1">{shipment.note}</div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-slate-400" />
                          <span className={`font-semibold ${
                            shipment.carrier === 'FedEx' ? 'text-purple-600' : 'text-yellow-600'
                          }`}>
                            {shipment.carrier}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin className="w-4 h-4" />
                          {shipment.origin}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                          {shipment.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-slate-600">
                        {shipment.weight}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="w-4 h-4" />
                          {formatDate(shipment.estimatedDelivery)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
