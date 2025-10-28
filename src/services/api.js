// API Service for backend communication
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async fetchFedExShipments() {
    try {
      const response = await fetch(`${this.baseUrl}/api/fedex/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trackingNumbers: ['123456789012', '123456789013', '123456789014']
        })
      });

      if (!response.ok) {
        throw new Error(`FedEx API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.shipments) {
        return data.shipments;
      }
      
      throw new Error('Invalid response format');
      
    } catch (error) {
      console.error('FedEx API Error:', error);
      return this.getMockFedExData();
    }
  }

  async fetchDHLShipments() {
    try {
      const trackingNumbers = ['1234567890', '1234567891'];
      const response = await fetch(
        `${this.baseUrl}/api/dhl/track?trackingNumbers=${trackingNumbers.join(',')}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`DHL API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.shipments) {
        return data.shipments;
      }
      
      throw new Error('Invalid response format');
      
    } catch (error) {
      console.error('DHL API Error:', error);
      return this.getMockDHLData();
    }
  }

  async fetchAllShipments() {
    try {
      const [fedexData, dhlData] = await Promise.all([
        this.fetchFedExShipments(),
        this.fetchDHLShipments()
      ]);

      const allShipments = [...fedexData, ...dhlData].sort((a, b) => 
        new Date(a.estimatedDelivery) - new Date(b.estimatedDelivery)
      );

      return {
        shipments: allShipments,
        usingMockData: allShipments.some(s => s.note)
      };
    } catch (error) {
      console.error('Error fetching all shipments:', error);
      throw error;
    }
  }

  getMockFedExData() {
    return [
      {
        id: 'FDX789012345',
        carrier: 'FedEx',
        origin: 'Los Angeles, CA',
        destination: 'Sydney, NSW',
        status: 'In Transit',
        estimatedDelivery: '2025-10-29',
        weight: '2.5 kg',
        note: 'Using mock data - API unavailable'
      },
      {
        id: 'FDX789012346',
        carrier: 'FedEx',
        origin: 'New York, NY',
        destination: 'Sydney, NSW',
        status: 'Out for Delivery',
        estimatedDelivery: '2025-10-27',
        weight: '1.2 kg',
        note: 'Using mock data - API unavailable'
      },
      {
        id: 'FDX789012347',
        carrier: 'FedEx',
        origin: 'Chicago, IL',
        destination: 'Sydney, NSW',
        status: 'Customs Clearance',
        estimatedDelivery: '2025-10-30',
        weight: '5.0 kg',
        note: 'Using mock data - API unavailable'
      }
    ];
  }

  getMockDHLData() {
    return [
      {
        id: 'DHL456789012',
        carrier: 'DHL',
        origin: 'London, UK',
        destination: 'Sydney, NSW',
        status: 'In Transit',
        estimatedDelivery: '2025-10-28',
        weight: '3.8 kg',
        note: 'Using mock data - API unavailable'
      },
      {
        id: 'DHL456789013',
        carrier: 'DHL',
        origin: 'Singapore',
        destination: 'Sydney, NSW',
        status: 'Arrived at Facility',
        estimatedDelivery: '2025-10-27',
        weight: '0.8 kg',
        note: 'Using mock data - API unavailable'
      }
    ];
  }
}

export default new ApiService();
