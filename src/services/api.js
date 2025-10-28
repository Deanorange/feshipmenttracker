// API Service for backend communication
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
    console.log('🔗 API Service initialized with URL:', this.baseUrl);
  }

  async fetchFedExShipments() {
    try {
      console.log('📡 Calling FedEx API:', `${this.baseUrl}/api/fedex/track`);
      
      const response = await fetch(`${this.baseUrl}/api/fedex/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trackingNumbers: ['123456789012', '123456789013', '123456789014']
        })
      });

      console.log('📥 FedEx Response status:', response.status);

      if (!response.ok) {
        throw new Error(`FedEx API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ FedEx data received:', data);
      
      if (data.success && data.shipments) {
        return data.shipments;
      }
      
      throw new Error('Invalid response format');
      
    } catch (error) {
      console.error('❌ FedEx API Error:', error);
      console.log('Using mock FedEx data as fallback');
      return this.getMockFedExData();
    }
  }

  async fetchDHLShipments() {
    try {
      const trackingNumbers = ['1234567890', '1234567891'];
      console.log('📡 Calling DHL API:', `${this.baseUrl}/api/dhl/track`);
      
      const response = await fetch(
        `${this.baseUrl}/api/dhl/track?trackingNumbers=${trackingNumbers.join(',')}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('📥 DHL Response status:', response.status);

      if (!response.ok) {
        throw new Error(`DHL API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ DHL data received:', data);
      
      if (data.success && data.shipments) {
        return data.shipments;
      }
      
      throw new Error('Invalid response format');
      
    } catch (error) {
      console.error('❌ DHL API Error:', error);
      console.log('Using mock DHL data as fallback');
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

      const usingMockData = allShipments.some(s => s.note);

      return {
        shipments: allShipments,
        usingMockData
      };
    } catch (error) {
      console.error('❌ Error fetching all shipments:', error);
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
