// import React from 'react';
// import { 
//   MapPin, Building2, ShieldCheck, CheckCircle, 
//   ExternalLink, XCircle 
// } from 'lucide-react';

// // --- TypeScript Interfaces ---
// interface Document {
//   docName: string;
//   docUrl: string;
// }

// interface VendorData {
//   success: boolean;
//   data: {
//     vendor: {
//       status: string;
//       submittedAt: string;
//     };
//     businessDetails: {
//       businessName: string;
//       businessEmail: string;
//       businessPhone: string;
//       address: string;
//       city: string;
//       state: string;
//       panNumber: string;
//       aadhaarNumber: string;
//     };
//     documents: Document[];
//     bankDetails: {
//       accountHolderName: string;
//       bankName: string;
//       proof: { url: string };
//     };
//     hotelDetails: {
//       name: string;
//       description: string;
//       address: string;
//       images: { url: string }[];
//       amenities: string[];
//     };
//   };
// }

// const AdminPropertyDetail: React.FC = () => {
//   // Backend Response Data Mapping
//   const vendorResponse: VendorData = {
//     success: true,
//     data: {
//       vendor: {
//         status: "pending",
//         submittedAt: "2026-04-12T13:50:00.211Z"
//       },
//       businessDetails: {
//         businessName: "manson",
//         businessEmail: "hvendor@gmail.com",
//         businessPhone: "9876543210",
//         address: "Parasia",
//         city: "Parasia",
//         state: "Madhya Pradesh",
//         panNumber: "ASDFGHJK12",
//         aadhaarNumber: "[REDACTED]"
//       },
//       documents: [
//         {
//           docName: "PAN Card",
//           docUrl: "https://res.cloudinary.com/dwfolqpht/image/upload/v1776001577/profiles/xj0hzd4jsbdbdec3plsj.webp"
//         },
//         {
//           docName: "Aadhaar Front",
//           docUrl: "https://res.cloudinary.com/dwfolqpht/image/upload/v1776001582/profiles/xpc8teklgqvnf4n5zibe.webp"
//         }
//       ],
//       bankDetails: {
//         accountHolderName: "Hvendor",
//         bankName: "SBI",
//         proof: {
//           url: "https://res.cloudinary.com/dwfolqpht/image/upload/v1776001681/profiles/cam9cldpbchejfzc5i35.webp"
//         }
//       },
//       hotelDetails: {
//         name: "The Subtle",
//         description: "The art of not giving a ....",
//         address: "Parasia, Madhya Pradesh, India",
//         images: [
//           { url: "https://res.cloudinary.com/dwfolqpht/image/upload/v1776001760/profiles/kzvganw8oxduphkd7gij.webp" }
//         ],
//         amenities: ["restaurant", "free_wifi", "hearing_aid", "gym", "free_parking"]
//       }
//     }
//   };

//   // FIX: Destructure from vendorResponse.data
//   const { hotelDetails, businessDetails, documents, bankDetails, vendor } = vendorResponse.data;

//   return (
//     <div className="min-h-screen bg-[#0a0a0a] text-gray-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-8">

//         {/* Top Header Status */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#141414] p-6 rounded-2xl border border-white/5">
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight">{hotelDetails.name}</h1>
//             <p className="text-gray-500 flex items-center mt-1">
//               <MapPin size={16} className="mr-1 text-red-500" /> {hotelDetails.address}
//             </p>
//           </div>
//           <div className="mt-4 md:mt-0 flex items-center gap-3">
//             <span className="px-4 py-1.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-sm font-medium uppercase">
//               {vendor.status} Verification
//             </span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//           {/* Main Content Column */}
//           <div className="lg:col-span-2 space-y-8">

//             {/* Image Preview */}
//             <div className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
//               <img 
//                 src={hotelDetails.images[0]?.url} 
//                 alt="Hotel" 
//                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//             </div>

//             {/* Info Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <section className="bg-[#141414] p-6 rounded-2xl border border-white/5">
//                 <h3 className="text-red-500 font-semibold mb-4 flex items-center">
//                   <Building2 size={18} className="mr-2"/> Business Details
//                 </h3>
//                 <div className="space-y-3 text-sm">
//                   <p><span className="text-gray-500">Legal Name:</span> {businessDetails.businessName}</p>
//                   <p><span className="text-gray-500">PAN:</span> {businessDetails.panNumber}</p>
//                   <p><span className="text-gray-500">Contact:</span> {businessDetails.businessPhone}</p>
//                   <p><span className="text-gray-500">Email:</span> {businessDetails.businessEmail}</p>
//                 </div>
//               </section>

//               <section className="bg-[#141414] p-6 rounded-2xl border border-white/5">
//                 <h3 className="text-red-500 font-semibold mb-4 flex items-center">
//                   <ShieldCheck size={18} className="mr-2"/> Bank Details
//                 </h3>
//                 <div className="space-y-3 text-sm">
//                   <p><span className="text-gray-500">Bank:</span> {bankDetails.bankName}</p>
//                   <p><span className="text-gray-500">Holder:</span> {bankDetails.accountHolderName}</p>
//                   <a href={bankDetails.proof.url} target="_blank" rel="noreferrer" className="text-blue-400 flex items-center mt-2 hover:underline">
//                     View Passbook/Cheque <ExternalLink size={14} className="ml-1"/>
//                   </a>
//                 </div>
//               </section>
//             </div>

//             {/* Amenities Section */}
//             <section className="bg-[#141414] p-6 rounded-2xl border border-white/5">
//               <h3 className="text-lg font-semibold mb-6">Property Amenities</h3>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                 {hotelDetails.amenities.map((item) => (
//                   <div key={item} className="flex items-center p-3 bg-white/5 rounded-xl border border-white/5 capitalize text-sm">
//                     <CheckCircle size={14} className="mr-2 text-green-500" /> {item.replace('_', ' ')}
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             <div className="bg-[#141414] p-6 rounded-3xl border border-white/5">
//               <h3 className="text-lg font-semibold mb-4">KYC Documents</h3>
//               <div className="space-y-4">
//                 {documents.map((doc, idx) => (
//                   <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
//                     <span className="text-sm font-medium">{doc.docName}</span>
//                     <a href={doc.docUrl} target="_blank" rel="noreferrer" className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
//                       <ExternalLink size={16} />
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-[#141414] p-6 rounded-3xl border border-white/5 space-y-4">
//               <button className="w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-bold flex items-center justify-center transition-all shadow-lg shadow-green-900/20">
//                 <CheckCircle className="mr-2" size={20} /> Approve Listing
//               </button>

//               <button className="w-full py-4 bg-transparent border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl font-bold flex items-center justify-center transition-all">
//                 <XCircle className="mr-2" size={20} /> Reject Listing
//               </button>

//               <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest mt-4">
//                 Action will notify {businessDetails.businessEmail}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPropertyDetail;
'use client'
import React from 'react';
import {
  Building2, MapPin, Globe, CreditCard, Landmark,
  FileCheck, ShieldAlert, CheckCircle2, Wifi,
  Utensils, Accessibility, Dumbbell, ParkingCircle, ExternalLink
} from 'lucide-react';
import { useParams } from 'next/navigation';

// --- 1. Interfaces ---
interface Document {
  docName: string;
  docUrl: string;
  isVerified: boolean;
  _id: string;
}

interface VendorData {
  success: boolean;
  data: {
    vendor: { status: string; submittedAt: string };
    user: { name: string; email: string };
    businessDetails: {
      businessName: string;
      businessEmail: string;
      businessPhone: string;
      address: string;
      city: string;
      state: string;
      panNumber: string;
      aadhaarNumber: string;
    };
    documents: Document[];
    bankDetails: {
      accountHolderName: string;
      bankName: string;
      branchName: string;
      proof: { url: string };
    };
    hotelDetails: {
      name: string;
      description: string;
      address: string;
      city: string;
      images: { url: string; _id: string }[];
      amenities: string[];
      accessibility: {
        wheelchairAccessible: boolean;
        grabBars: boolean;
        hearingSupport: boolean;
        elevator: boolean;
      };
    };
  };
}

// --- 2. Dummy Data (As per your screenshots) ---
const MOCK_VENDOR_DATA: VendorData = {
  success: true,
  data: {
    vendor: {
      status: "pending",
      submittedAt: "2026-04-12T13:50:00.211Z",
    },
    user: {
      name: "undefined undefined", // Testing fallback logic
      email: "hvendor@gmail.com",
    },
    businessDetails: {
      businessName: "Manson",
      businessEmail: "hvendor@gmail.com",
      businessPhone: "9876543210",
      address: "Parasia",
      city: "Parasia",
      state: "Madhya Pradesh",
      panNumber: "ASDFGHJK12",
      aadhaarNumber: "213456789012",
    },
    documents: [
      {
        _id: "69dba231a7cf30c7da308096",
        docName: "panCard",
        docUrl: "https://res.cloudinary.com/dwfolqpht/image/upload/v1776001790/profiles/kxblzyscjxoc2mt131hw.webp",
        isVerified: false,
      },
      {
        _id: "69dba231a7cf30c7da308097",
        docName: "aadhaarFront",
        docUrl: "https://res.cloudinary.com/dwfolqpht/image/upload/v1776001790/profiles/kxblzyscjxoc2mt131hw.webp",
        isVerified: false,
      }
    ],
    bankDetails: {
      accountHolderName: "Hvendor",
      bankName: "SBI",
      branchName: "Art",
      proof: { url: "https://res.cloudinary.com/dwfolqpht/image/upload/v1776001790/profiles/kxblzyscjxoc2mt131hw.webp" },
    },
    hotelDetails: {
      name: "The Subtle",
      description: "The art of not giving a ....",
      address: "Parasia, Madhya Pradesh, India",
      city: "Parasia",
      images: [
        { url: "https://res.cloudinary.com/dwfolqpht/image/upload/v1776001790/profiles/kxblzyscjxoc2mt131hw.webp", _id: "69dba306a7cf30c7da3080c3" }
      ],
      amenities: ["restaurant", "free_wifi", "hearing_aid", "gym", "free_parking"],
      accessibility: {
        wheelchairAccessible: false,
        grabBars: false,
        hearingSupport: false,
        elevator: false
      }
    }
  }
};

// --- 3. Component ---
const PropertyDetail = () => {

  const { propId } = useParams();
  const id = Array.isArray(propId)
    ? propId[0]
    : propId || "";
  // Use mock data for testing
  const { vendor, user, businessDetails, documents, bankDetails, hotelDetails } = MOCK_VENDOR_DATA.data;

  const AmenityIcon = ({ name }: { name: string }) => {
    const icons: Record<string, React.ReactNode> = {
      restaurant: <Utensils className="w-4 h-4" />,
      free_wifi: <Wifi className="w-4 h-4" />,
      gym: <Dumbbell className="w-4 h-4" />,
      free_parking: <ParkingCircle className="w-4 h-4" />,
    };
    return icons[name] || <CheckCircle2 className="w-4 h-4" />;
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header Block */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{hotelDetails.name}</h1>
              <span className="bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {vendor.status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <MapPin size={16} className="text-indigo-500" />
              <span className="text-sm font-medium">{hotelDetails.address}</span>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2">
            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Request ID</span>
            <span className="text-sm font-mono font-bold text-slate-700">#PROP-69DBA1</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">

            {/* Business Card */}
            <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-50 flex items-center justify-between">
                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                  <Building2 size={18} className="text-indigo-600" /> Business Details
                </h2>
                <span className="text-xs font-semibold text-slate-400">Verified Entity</span>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Legal Name</label>
                    <p className="font-semibold text-slate-700">{businessDetails.businessName}</p>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Email</label>
                    <p className="font-semibold text-slate-700">{businessDetails.businessEmail}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase">PAN Number</label>
                    <p className="font-mono font-bold text-indigo-600">{businessDetails.panNumber}</p>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Phone</label>
                    <p className="font-semibold text-slate-700">{businessDetails.businessPhone}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Documents Section */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                <FileCheck size={18} className="text-indigo-600" /> Compliance Documents
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <div key={doc._id} className="group p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-200 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100 group-hover:text-indigo-600 transition-colors">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold capitalize text-slate-700">{doc.docName.replace(/([A-Z])/g, ' $1')}</p>
                        <a href={doc.docUrl} target="_blank" className="text-[10px] text-indigo-500 font-bold hover:underline">VIEW ATTACHMENT</a>
                      </div>
                    </div>
                    {doc.isVerified ? <CheckCircle2 className="text-emerald-500" /> : <ShieldAlert className="text-slate-300" />}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <aside className="space-y-6">

            {/* Owner Details */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xl">
                    {user.email[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Account Holder</p>
                    <h3 className="text-lg font-bold leading-none">{user.name.includes("undefined") ? "Vendor #080b" : user.name}</h3>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800">
                    <span className="text-slate-500">Email</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-2">
                    <span className="text-slate-500">Service</span>
                    <span className="font-medium bg-indigo-500/20 px-2 rounded text-indigo-300">Hotel</span>
                  </div>
                </div>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-5 transition-transform group-hover:scale-110">
                <Building2 size={200} />
              </div>
            </div>

            {/* Bank Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Landmark size={18} className="text-indigo-600" /> Payout Settings
              </h3>
              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl mb-4">
                <p className="text-[10px] font-bold text-indigo-400 uppercase mb-1">Bank Institution</p>
                <p className="text-xl font-black text-indigo-900">{bankDetails.bankName}</p>
                <p className="text-xs text-indigo-700/60 font-medium">Branch: {bankDetails.branchName}</p>
              </div>
              <a href={bankDetails.proof.url} target="_blank" className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-slate-200 text-slate-400 rounded-xl text-xs font-bold hover:border-indigo-300 hover:text-indigo-500 transition-all">
                <ExternalLink size={14} /> View Bank Proof
              </a>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Wifi size={18} className="text-indigo-600" /> Amenities
              </h3>
              <div className="flex flex-wrap gap-2">
                {hotelDetails.amenities.map(a => (
                  <div key={a} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 capitalize">
                    <AmenityIcon name={a} /> {a.replace('_', ' ')}
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;