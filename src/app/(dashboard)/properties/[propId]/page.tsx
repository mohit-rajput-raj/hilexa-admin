'use client'
import React, { useState } from 'react';
import {
  Building2, MapPin, Globe, CreditCard, ShieldAlert,
  CheckCircle2, Wifi, Utensils, Dumbbell, ParkingCircle,
  ExternalLink, Users, Calendar, Image as ImageIcon,
  Landmark,
  FileCheck
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { usePropertyDetails } from './queryes';
import { WarningDialog } from '@/components/overlay/warnings';
import { approveProperty, rejectProperty } from './dash.service';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useProperty } from '../_calls/queryies';
export interface VendorResponse {
  success: boolean;
  data: VendorData;
}

export interface VendorData {
  vendor: VendorInfo;
  user: UserInfo;
  businessDetails: BusinessDetails;
  documents: Document[];
  bankDetails: BankDetails;
  hotelDetails: HotelDetails;
}

export interface VendorInfo {
  _id: string;
  status: 'pending' | 'approved' | 'rejected'; // Adjusted based on context
  submittedAt: string;
  serviceType: string;
}

export interface UserInfo {
  name: string;
  email: string;
}

export interface BusinessDetails {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  panNumber: string;
  aadhaarNumber: string;
}

export interface Document {
  docName: string;
  docUrl: string;
  isVerified: boolean;
  _id: string;
  id: string;
}

export interface CloudinaryAsset {
  url: string;
  public_id: string;
  resource_type: string;
  _id?: string; // Optional as seen in different objects
}

export interface BankDetails {
  accountHolderName: string;
  bankName: string;
  branchName: string;
  proof: CloudinaryAsset;
  verificationStatus: string;
}

export interface HotelDocument extends CloudinaryAsset {
  docName: string;
  isVerified: boolean;
}

export interface Accessibility {
  wheelchairAccessible: boolean;
  grabBars: boolean;
  hearingSupport: boolean;
  elevator: boolean;
}

export interface HotelDetails {
  name: string;
  description: string;
  address: string;
  city: string;
  images: CloudinaryAsset[];
  documents: HotelDocument[];
  amenities: string[];
  accessibility: Accessibility;
  verificationStatus: string;
}
const PropertyDetail = () => {
  const { propId } = useParams();
  const id = Array.isArray(propId) ? propId[0] : propId || "";

  const { data, isLoading } = usePropertyDetails(id);
  const vendorData = (data as VendorResponse)?.data;

  if (isLoading || !vendorData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading property details...</div>
      </div>
    );
  }

  const {
    vendor,
    user,
    businessDetails,
    documents,
    bankDetails,
    hotelDetails,
  } = vendorData;

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
    <div className="min-h-screen bg-background p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {hotelDetails?.name}
              </h1>
              <span
                className={`px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border ${vendor?.status === 'approved'
                  ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                  : vendor?.status === 'rejected'
                    ? 'bg-red-100 text-red-700 border-red-200'
                    : 'bg-amber-100 text-amber-700 border-amber-200'
                  }`}
              >
                {vendor?.status.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="text-primary" size={20} />
              <span className="text-lg">
                {hotelDetails?.address}, {hotelDetails?.city}
              </span>
            </div>
          </div>

          <div className="bg-muted/50 border border-border rounded-2xl px-7 py-5 text-center min-w-[180px]">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Request ID
            </p>
            <p className="font-mono text-2xl font-bold text-foreground tracking-tight">
              #{vendor._id.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hotel Images */}
            {hotelDetails.images?.length > 0 && (
              <section className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border flex items-center gap-3">
                  <ImageIcon className="text-primary" size={22} />
                  <h2 className="text-xl font-semibold">Property Gallery</h2>
                </div>
                <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotelDetails.images.map((img: CloudinaryAsset, index) => (
                    <div
                      key={index}
                      className="aspect-video rounded-2xl overflow-hidden border border-border group"
                    >
                      <img
                        src={img.url}
                        alt={`Hotel view ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}


            {/* Business Details */}
            <section className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="text-primary" size={24} />
                  <h2 className="text-xl font-semibold">Business Details</h2>
                </div>
                <span className="text-xs font-medium px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                  Verified Entity
                </span>
              </div>

              <div className="p-8 grid md:grid-cols-2 gap-x-16 gap-y-10">
                <div className="space-y-7">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Legal Name</p>
                    <p className="text-lg font-semibold mt-1">{businessDetails.businessName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Business Email</p>
                    <p className="mt-1 text-foreground">{businessDetails.businessEmail}</p>
                  </div>
                </div>

                <div className="space-y-7">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">PAN Number</p>
                    <p className="font-mono text-lg font-bold text-primary tracking-wider mt-1">
                      {businessDetails.panNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Phone</p>
                    <p className="mt-1">{businessDetails.businessPhone}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Compliance Documents */}
            <section className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <FileCheck className="text-primary" size={24} />
                <h2 className="text-xl font-semibold">Compliance Documents</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {documents.map((doc: Document) => (
                  <div
                    key={doc._id || doc.id}
                    className="group p-6 rounded-2xl border border-border hover:border-primary/30 bg-muted/30 hover:bg-card transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-card rounded-2xl shadow-sm border group-hover:text-primary transition-colors">
                        <CreditCard size={26} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground capitalize">
                          {doc.docName.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <a
                          href={doc.docUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline font-medium mt-1 block"
                        >
                          View Document →
                        </a>
                      </div>
                    </div>
                    {doc.isVerified ? (
                      <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                    ) : (
                      <ShieldAlert className="w-7 h-7 text-amber-500" />
                    )}
                  </div>
                ))}
              </div>
            </section>
            {<section className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <ApproveCard id={id} />
            </section>}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Account Holder */}
            <div className="bg-gradient-to-br from-slate-950 to-indigo-950 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-8">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-3xl font-bold shadow-inner">
                    {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-indigo-300 tracking-widest">ACCOUNT HOLDER</p>
                    <h3 className="text-2xl font-semibold mt-1">
                      {user.name && !user.name.includes("undefined") ? user.name : "Vendor"}
                    </h3>
                  </div>
                </div>

                <div className="space-y-5 text-sm">
                  <div className="flex justify-between pb-3 border-b border-white/10">
                    <span className="text-slate-400">Email</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Service</span>
                    <span className="bg-white/10 px-4 py-1 rounded-full text-xs font-medium">
                      {vendor.serviceType}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Landmark className="text-primary" size={24} />
                <h3 className="text-xl font-semibold">Payout Settings</h3>
              </div>

              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-6">
                <p className="text-xs font-medium text-primary uppercase tracking-widest">Bank</p>
                <p className="text-2xl font-bold text-foreground mt-1">{bankDetails.bankName}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Branch: <span className="font-medium">{bankDetails.branchName}</span>
                </p>
              </div>

              <a
                href={bankDetails.proof.url}
                target="_blank"
                className="flex items-center justify-center gap-3 w-full py-4 border-2 border-dashed border-border hover:border-primary rounded-2xl text-sm font-semibold hover:text-primary transition-colors"
              >
                <ExternalLink size={18} /> View Bank Proof
              </a>
            </div>

            {/* Amenities */}
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Wifi className="text-primary" size={24} />
                <h3 className="text-xl font-semibold">Amenities</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {hotelDetails.amenities?.map((amenity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-5 py-3 bg-muted rounded-2xl text-sm font-medium"
                  >
                    <AmenityIcon name={amenity} />
                    <span className="capitalize">{amenity.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accessibility */}
            {hotelDetails.accessibility && (
              <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="text-primary" size={24} />
                  <h3 className="text-xl font-semibold">Accessibility</h3>
                </div>
                <div className="space-y-4">
                  {Object.entries(hotelDetails.accessibility).map(([key, enabled]) => (
                    <div key={key} className="flex justify-between items-center py-2">
                      <span className="capitalize text-muted-foreground">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span
                        className={`px-4 py-1 text-xs font-semibold rounded-full ${enabled
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-muted text-muted-foreground'
                          }`}
                      >
                        {enabled ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;




const ApproveCard = ({ id }: { id: string }) => {
  const { refetch, isRefetching } = usePropertyDetails(id);
  const [close, setClose] = useState(false)
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { refetch: r, isLoading: l } = useProperty()
  const handleRefresh = () => {
    r()
  }
  const handleAction = async (type: 'approve' | 'reject') => {
    setIsLoading(true);
    try {
      const res = type === 'approve'
        ? await approveProperty(id)
        : await rejectProperty(id);

      if (res.success) {
        toast.success(res.message || `${type} successful`);
        refetch();
        handleRefresh();
      }
    } catch (error: any) {
      toast.error(error?.message || `Failed to ${type} property`);
    } finally {
      setIsLoading(false);
      setActionType(null); // Close dialog
    }
  };

  return (
    <>
      {/* Approve / Reject Action Card */}
      <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center">
            <ShieldAlert className="text-amber-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">Review & Take Action</h3>
            <p className="text-sm text-muted-foreground">Approve or reject this vendor registration</p>
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Reject Button */}
          <WarningDialog
            open={actionType === 'reject'}
            onOpenChange={(open) => !open && setActionType(null)}
            loading={isLoading}
            title="Reject Request"
            description="This vendor will not be approved. This action cannot be undone."
            func={() => handleAction('reject')}
            trigger={
              <button onClick={() => setActionType('reject')} className="group flex items-center justify-center gap-3 bg-white border-2 border-red-200 hover:border-red-300 hover:bg-red-50 text-red-600 hover:text-red-700 font-semibold py-6 rounded-2xl transition-all active:scale-[0.985] w-full">
                <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <ShieldAlert size={22} />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold">Reject Request</div>
                  <div className="text-xs text-red-500/70">This vendor will not be approved</div>
                </div>
              </button>
            }
          />

          {/* Approve Button */}
          <WarningDialog
            open={actionType === 'approve'}
            onOpenChange={(open) => !open && setActionType(null)}
            loading={isLoading}
            title="Approve Request"
            description="This vendor will be live on the platform."
            func={() => handleAction('approve')}
            trigger={
              <button onClick={() => setActionType('approve')} className="group flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-6 rounded-2xl transition-all active:scale-[0.985] shadow-lg shadow-emerald-500/20 w-full">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <CheckCircle2 size={22} />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold">Approve Request</div>
                  <div className="text-xs text-emerald-100/80">This vendor will be live on platform</div>
                </div>
              </button>
            }
          />
        </div>


        <p className="text-center text-xs text-muted-foreground mt-6">
          This action is irreversible. Please review all details carefully before proceeding.
        </p>
      </div></>
  )
}