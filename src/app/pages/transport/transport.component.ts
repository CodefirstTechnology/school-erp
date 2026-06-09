import { Component } from '@angular/core';

type TransportModule = 'routes' | 'vehicles' | 'drivers' | 'allocation';
type MapView = 'live' | 'routes' | 'gps';

interface TransportKpi {
  title: string;
  value: string;
  subtitle: string;
  change?: string;
  trendUp?: boolean;
  icon: string;
  color: string;
}

interface Vehicle {
  id: string;
  regNo: string;
  model: string;
  capacity: number;
  route: string;
  driver: string;
  status: 'Active' | 'Maintenance' | 'Idle';
  gpsStatus: 'Online' | 'Offline';
  lastService: string;
  fuelLevel: number;
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNo: string;
  licenseExpiry: string;
  assignedVehicle: string;
  route: string;
  experience: string;
  status: 'On Duty' | 'Off Duty' | 'Leave';
  avatar: string;
}

interface RouteDetail {
  id: string;
  name: string;
  code: string;
  startPoint: string;
  endPoint: string;
  stops: number;
  distance: string;
  duration: string;
  students: number;
  vehicle: string;
  driver: string;
  status: 'Active' | 'Inactive';
}

interface StudentAllocation {
  id: string;
  studentName: string;
  class: string;
  rollNo: string;
  route: string;
  stop: string;
  pickupTime: string;
  dropTime: string;
  fee: number;
  status: 'Assigned' | 'Pending' | 'Waitlisted';
  avatar: string;
}

interface LiveBus {
  id: string;
  regNo: string;
  route: string;
  x: number;
  y: number;
  speed: number;
  status: 'Moving' | 'Stopped' | 'Delayed';
  students: number;
}

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent {
  activeModule: TransportModule = 'vehicles';
  mapView: MapView = 'live';
  searchQuery = '';
  selectedRoute = 'All Routes';
  selectedStatus = 'All Status';

  routes = ['All Routes', 'Route A — North', 'Route B — South', 'Route C — East', 'Route D — West', 'Route E — Central'];
  statuses = ['All Status', 'Active', 'Inactive', 'Maintenance', 'On Duty', 'Off Duty'];

  modules: { id: TransportModule; label: string; icon: string; count?: number }[] = [
    { id: 'routes', label: 'Route Management', icon: 'routes', count: 12 },
    { id: 'vehicles', label: 'Vehicle Management', icon: 'vehicles', count: 18 },
    { id: 'drivers', label: 'Driver Management', icon: 'drivers', count: 22 },
    { id: 'allocation', label: 'Student Allocation', icon: 'allocation', count: 842 }
  ];

  kpiCards: TransportKpi[] = [
    { title: 'Total Buses', value: '18', subtitle: '16 active · 2 in maintenance', change: '+2', trendUp: true, icon: 'buses', color: 'purple' },
    { title: 'Active Routes', value: '12', subtitle: 'Covering 48 km total', change: '+1', trendUp: true, icon: 'routes', color: 'success' },
    { title: 'Students Assigned', value: '842', subtitle: '94.6% of transport users', change: '+28', trendUp: true, icon: 'students', color: 'info' },
    { title: 'GPS Tracking Status', value: '16/18', subtitle: '2 devices offline', change: '88.9%', trendUp: true, icon: 'gps', color: 'warning' }
  ];

  liveBuses: LiveBus[] = [
    { id: 'B01', regNo: 'DL-01-AB-1234', route: 'Route A — North', x: 22, y: 35, speed: 32, status: 'Moving', students: 42 },
    { id: 'B02', regNo: 'DL-01-CD-5678', route: 'Route B — South', x: 45, y: 62, speed: 28, status: 'Moving', students: 38 },
    { id: 'B03', regNo: 'DL-01-EF-9012', route: 'Route C — East', x: 72, y: 28, speed: 0, status: 'Stopped', students: 45 },
    { id: 'B04', regNo: 'DL-01-GH-3456', route: 'Route D — West', x: 58, y: 48, speed: 18, status: 'Delayed', students: 40 },
    { id: 'B05', regNo: 'DL-01-IJ-7890', route: 'Route E — Central', x: 35, y: 72, speed: 35, status: 'Moving', students: 36 },
    { id: 'B06', regNo: 'DL-01-KL-2345', route: 'Route A — North', x: 68, y: 55, speed: 30, status: 'Moving', students: 44 }
  ];

  routePaths = [
    { id: 'A', name: 'North', color: '#8B5CF6', path: 'M 15 40 Q 30 20, 50 30 T 85 25' },
    { id: 'B', name: 'South', color: '#22C55E', path: 'M 20 70 Q 40 55, 55 65 T 90 75' },
    { id: 'C', name: 'East', color: '#3B82F6', path: 'M 60 15 Q 75 35, 70 50 T 80 85' },
    { id: 'D', name: 'West', color: '#F59E0B', path: 'M 10 50 Q 25 45, 40 50 T 65 45' }
  ];

  gpsDevices = [
    { id: 'GPS-001', vehicle: 'DL-01-AB-1234', signal: 98, battery: 87, lastPing: '2 sec ago', status: 'Online' },
    { id: 'GPS-002', vehicle: 'DL-01-CD-5678', signal: 95, battery: 72, lastPing: '5 sec ago', status: 'Online' },
    { id: 'GPS-003', vehicle: 'DL-01-EF-9012', signal: 92, battery: 65, lastPing: '3 sec ago', status: 'Online' },
    { id: 'GPS-004', vehicle: 'DL-01-GH-3456', signal: 45, battery: 34, lastPing: '2 min ago', status: 'Online' },
    { id: 'GPS-005', vehicle: 'DL-01-IJ-7890', signal: 0, battery: 12, lastPing: '45 min ago', status: 'Offline' },
    { id: 'GPS-006', vehicle: 'DL-01-KL-2345', signal: 0, battery: 8, lastPing: '1 hr ago', status: 'Offline' }
  ];

  vehicles: Vehicle[] = [
    { id: 'V001', regNo: 'DL-01-AB-1234', model: 'Tata Starbus Ultra', capacity: 52, route: 'Route A — North', driver: 'Ramesh Kumar', status: 'Active', gpsStatus: 'Online', lastService: 'May 12, 2026', fuelLevel: 78 },
    { id: 'V002', regNo: 'DL-01-CD-5678', model: 'Ashok Leyland Viking', capacity: 48, route: 'Route B — South', driver: 'Suresh Yadav', status: 'Active', gpsStatus: 'Online', lastService: 'Apr 28, 2026', fuelLevel: 65 },
    { id: 'V003', regNo: 'DL-01-EF-9012', model: 'Tata Starbus Ultra', capacity: 52, route: 'Route C — East', driver: 'Mohan Singh', status: 'Active', gpsStatus: 'Online', lastService: 'Jun 1, 2026', fuelLevel: 92 },
    { id: 'V004', regNo: 'DL-01-GH-3456', model: 'Force Traveller', capacity: 32, route: 'Route D — West', driver: 'Vijay Sharma', status: 'Active', gpsStatus: 'Online', lastService: 'May 20, 2026', fuelLevel: 45 },
    { id: 'V005', regNo: 'DL-01-IJ-7890', model: 'Ashok Leyland Viking', capacity: 48, route: 'Route E — Central', driver: 'Anil Verma', status: 'Active', gpsStatus: 'Offline', lastService: 'Apr 15, 2026', fuelLevel: 30 },
    { id: 'V006', regNo: 'DL-01-KL-2345', model: 'Tata Starbus Ultra', capacity: 52, route: 'Route A — North', driver: 'Rajesh Patel', status: 'Active', gpsStatus: 'Offline', lastService: 'May 5, 2026', fuelLevel: 88 },
    { id: 'V007', regNo: 'DL-01-MN-6789', model: 'Force Traveller', capacity: 32, route: '—', driver: '—', status: 'Maintenance', gpsStatus: 'Offline', lastService: 'Jun 6, 2026', fuelLevel: 0 },
    { id: 'V008', regNo: 'DL-01-OP-0123', model: 'Tata Starbus Ultra', capacity: 52, route: '—', driver: '—', status: 'Idle', gpsStatus: 'Online', lastService: 'Mar 22, 2026', fuelLevel: 100 }
  ];

  drivers: Driver[] = [
    { id: 'D001', name: 'Ramesh Kumar', phone: '+91 98765 11101', licenseNo: 'DL-0420110012345', licenseExpiry: 'Dec 2028', assignedVehicle: 'DL-01-AB-1234', route: 'Route A — North', experience: '12 yrs', status: 'On Duty', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh' },
    { id: 'D002', name: 'Suresh Yadav', phone: '+91 98765 11102', licenseNo: 'DL-0420110023456', licenseExpiry: 'Mar 2027', assignedVehicle: 'DL-01-CD-5678', route: 'Route B — South', experience: '8 yrs', status: 'On Duty', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh' },
    { id: 'D003', name: 'Mohan Singh', phone: '+91 98765 11103', licenseNo: 'DL-0420110034567', licenseExpiry: 'Aug 2029', assignedVehicle: 'DL-01-EF-9012', route: 'Route C — East', experience: '15 yrs', status: 'On Duty', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohan' },
    { id: 'D004', name: 'Vijay Sharma', phone: '+91 98765 11104', licenseNo: 'DL-0420110045678', licenseExpiry: 'Jan 2028', assignedVehicle: 'DL-01-GH-3456', route: 'Route D — West', experience: '6 yrs', status: 'On Duty', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vijay' },
    { id: 'D005', name: 'Anil Verma', phone: '+91 98765 11105', licenseNo: 'DL-0420110056789', licenseExpiry: 'Jun 2026', assignedVehicle: 'DL-01-IJ-7890', route: 'Route E — Central', experience: '10 yrs', status: 'Off Duty', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anil' },
    { id: 'D006', name: 'Rajesh Patel', phone: '+91 98765 11106', licenseNo: 'DL-0420110067890', licenseExpiry: 'Nov 2027', assignedVehicle: 'DL-01-KL-2345', route: 'Route A — North', experience: '9 yrs', status: 'On Duty', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RajeshD' },
    { id: 'D007', name: 'Deepak Gupta', phone: '+91 98765 11107', licenseNo: 'DL-0420110078901', licenseExpiry: 'Feb 2028', assignedVehicle: '—', route: '—', experience: '4 yrs', status: 'Leave', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Deepak' }
  ];

  routeDetails: RouteDetail[] = [
    { id: 'R001', name: 'Route A — North', code: 'RT-A', startPoint: 'Greenwood Gate', endPoint: 'Sector 62 Metro', stops: 8, distance: '12.4 km', duration: '45 min', students: 84, vehicle: 'DL-01-AB-1234', driver: 'Ramesh Kumar', status: 'Active' },
    { id: 'R002', name: 'Route B — South', code: 'RT-B', startPoint: 'Greenwood Gate', endPoint: 'Greater Noida West', stops: 10, distance: '14.2 km', duration: '52 min', students: 76, vehicle: 'DL-01-CD-5678', driver: 'Suresh Yadav', status: 'Active' },
    { id: 'R003', name: 'Route C — East', code: 'RT-C', startPoint: 'Greenwood Gate', endPoint: 'Indirapuram', stops: 7, distance: '11.8 km', duration: '42 min', students: 90, vehicle: 'DL-01-EF-9012', driver: 'Mohan Singh', status: 'Active' },
    { id: 'R004', name: 'Route D — West', code: 'RT-D', startPoint: 'Greenwood Gate', endPoint: 'Noida City Centre', stops: 9, distance: '10.5 km', duration: '38 min', students: 68, vehicle: 'DL-01-GH-3456', driver: 'Vijay Sharma', status: 'Active' },
    { id: 'R005', name: 'Route E — Central', code: 'RT-E', startPoint: 'Greenwood Gate', endPoint: 'Sector 18 Market', stops: 6, distance: '8.2 km', duration: '32 min', students: 72, vehicle: 'DL-01-IJ-7890', driver: 'Anil Verma', status: 'Active' },
    { id: 'R006', name: 'Route F — Express', code: 'RT-F', startPoint: 'Greenwood Gate', endPoint: 'Delhi Connaught', stops: 4, distance: '18.6 km', duration: '55 min', students: 0, vehicle: '—', driver: '—', status: 'Inactive' }
  ];

  studentAllocations: StudentAllocation[] = [
    { id: 'SA001', studentName: 'Aarav Sharma', class: 'Class 10-A', rollNo: '1001', route: 'Route A — North', stop: 'Sector 15', pickupTime: '7:15 AM', dropTime: '3:45 PM', fee: 4500, status: 'Assigned', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav' },
    { id: 'SA002', studentName: 'Isha Patel', class: 'Class 8-B', rollNo: '802', route: 'Route B — South', stop: 'Pari Chowk', pickupTime: '7:00 AM', dropTime: '3:30 PM', fee: 5200, status: 'Assigned', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isha' },
    { id: 'SA003', studentName: 'Rohan Mehta', class: 'Class 12-C', rollNo: '1205', route: 'Route C — East', stop: 'Vaishali Metro', pickupTime: '6:50 AM', dropTime: '3:50 PM', fee: 4800, status: 'Assigned', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan' },
    { id: 'SA004', studentName: 'Sneha Reddy', class: 'Class 6-A', rollNo: '601', route: 'Route D — West', stop: 'City Centre', pickupTime: '7:20 AM', dropTime: '3:40 PM', fee: 4200, status: 'Assigned', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SnehaR' },
    { id: 'SA005', studentName: 'Kabir Khan', class: 'Class 9-B', rollNo: '905', route: 'Route E — Central', stop: 'Sector 18', pickupTime: '7:30 AM', dropTime: '3:35 PM', fee: 3800, status: 'Pending', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kabir' },
    { id: 'SA006', studentName: 'Priya Nair', class: 'Class 11-A', rollNo: '1103', route: 'Route A — North', stop: 'Sector 62', pickupTime: '7:05 AM', dropTime: '3:55 PM', fee: 4500, status: 'Assigned', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaT' },
    { id: 'SA007', studentName: 'Arjun Desai', class: 'Class 7-C', rollNo: '703', route: 'Route B — South', stop: 'Knowledge Park', pickupTime: '7:10 AM', dropTime: '3:42 PM', fee: 5200, status: 'Waitlisted', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun' }
  ];

  selectedBus: LiveBus | null = this.liveBuses[0];

  setModule(id: TransportModule): void {
    this.activeModule = id;
    this.searchQuery = '';
  }

  setMapView(view: MapView): void {
    this.mapView = view;
  }

  selectBus(bus: LiveBus): void {
    this.selectedBus = bus;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      Active: 'badge-success', 'On Duty': 'badge-success', Moving: 'badge-success', Assigned: 'badge-success', Online: 'badge-success',
      Maintenance: 'badge-warning', Delayed: 'badge-warning', Pending: 'badge-warning', Stopped: 'badge-warning', Leave: 'badge-warning',
      Idle: 'badge-info', 'Off Duty': 'badge-info', Waitlisted: 'badge-info',
      Inactive: 'badge-danger', Offline: 'badge-danger'
    };
    return map[status] || 'badge-purple';
  }

  getFuelClass(level: number): string {
    if (level >= 60) return 'fuel-high';
    if (level >= 30) return 'fuel-mid';
    return 'fuel-low';
  }
}
