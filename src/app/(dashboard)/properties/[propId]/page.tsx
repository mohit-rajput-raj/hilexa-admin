'use client'
import React, { Suspense, useState } from 'react';
import {
  Building2, MapPin, CreditCard, ShieldAlert,
  CheckCircle2, Wifi, ImageIcon, Landmark, FileCheck, ExternalLink, Users
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { usePropertyDetails } from './queryes';
import { WarningDialog } from '@/components/overlay/warnings';
import { approveProperty, rejectProperty } from './dash.service';
import { toast } from 'sonner';
import { useProperty } from '../_calls/queryies';
import { ErrorBoundary } from 'react-error-boundary';
import { PageSkeleton } from '@/components/loaders/loader/skeleton';
import { MessageModal } from '@/components/messagemodal';
import { amenityIconMap } from '@/components/ui/icons';
import { ImagePreview } from '@/components/ui/image-preview';

const PropertyDetail = () => {
  const { propId } = useParams();
  const id = Array.isArray(propId) ? propId[0] : propId || "";

  const { data, isLoading } = usePropertyDetails(id);
  const vendorData = (data as any)?.data;

  if (isLoading || !vendorData) return <PageSkeleton />;

  const { vendor, user, businessDetails, documents, bankDetails, hotelDetails } = vendorData;

  return (
    <ErrorBoundary fallback={<MessageModal title="Error" description="Something went wrong" />}>
      <Suspense fallback={<PageSkeleton />}>
        <div className="min-h-screen  font-sans selection:bg-primary/10">
          <div className="w-full mx-auto space-y-3">
            
            {/* Header */}
            <header className="rounded-2xl p-4 md:p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-3 ">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">{hotelDetails?.name}</h1>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                    vendor?.status === 'approved' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200' : 
                    vendor?.status === 'rejected' ? 'bg-red-500/10 text-red-600 border-red-200' : 'bg-amber-500/10 text-amber-600 border-amber-200'
                  }`}>{vendor?.status}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin size={14} className="text-primary" />
                  <span className="text-xs font-medium">{hotelDetails?.address}, {hotelDetails?.city}</span>
                </div>
              </div>
              <div className="bg-muted/50 border border-border rounded-xl px-4 py-2 text-center">
                <p className="text-[9px] font-bold uppercase text-muted-foreground leading-none">ID</p>
                <p className="font-mono text-base font-bold text-foreground">#{vendor._id.slice(-8).toUpperCase()}</p>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              <div className="lg:col-span-8 space-y-3">
                {/* Gallery */}
                <section className="rounded-2xl  shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                    <ImageIcon size={16} className="text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-tight">Gallery</h2>
                  </div>
                  <div className="p-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {hotelDetails.images?.map((img: any, i: number) => (
                      <ImagePreview key={i} src={img.url}>
                        <div className="aspect-square rounded-lg overflow-hidden border border-border cursor-zoom-in group">
                          <img src={img.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        </div>
                      </ImagePreview>
                    ))}
                  </div>
                </section>

                {/* Business Info */}
                <section className="rounded-2xl  shadow-sm">
                  <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                    <Building2 size={16} className="text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-tight">Business Profile</h2>
                  </div>
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Legal Name</p>
                        <p className="text-sm font-semibold">{businessDetails.businessName}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Contact</p>
                        <p className="text-xs font-medium">{businessDetails.businessEmail}</p>
                        <p className="text-xs text-muted-foreground">{businessDetails.businessPhone}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">PAN</p>
                        <p className="font-mono text-sm font-bold text-primary">{businessDetails.panNumber}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">National ID</p>
                        <p className="font-mono text-xs font-medium">Verified System Record</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Documents */}
                <section className="rounded-2xl r p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <FileCheck size={16} className="text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-tight">Documents</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {documents.map((doc: any) => (
                      <div key={doc.id} className="p-3 rounded-xl bg-muted/30 border border-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-card rounded-lg border border-border"><CreditCard size={16} /></div>
                          <div>
                            <p className="text-xs font-bold truncate max-w-[120px]">{doc.docName}</p>
                            <a href={doc.docUrl} target="_blank" className="text-[10px] text-primary hover:underline font-bold">View File</a>
                          </div>
                        </div>
                        {doc.isVerified ? <CheckCircle2 size={14} className="text-emerald-500" /> : <ShieldAlert size={14} className="text-amber-500" />}
                      </div>
                    ))}
                  </div>
                </section>

                <ApproveCard VendorInfo={vendorData?.vendor} id={id} />
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-3">
                <div className="bg-slate-950 rounded-2xl p-5 text-white border border-white/5 relative overflow-hidden">
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-sm font-black uppercase">
                        {user.name?.[0] || 'V'}
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-indigo-300 uppercase tracking-widest leading-none">Owner</p>
                        <h3 className="text-sm font-bold truncate">{user.name || "Manager"}</h3>
                      </div>
                    </div>
                    <div className="text-[11px] font-medium space-y-2">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-slate-400">Email</span><span className="truncate ml-2">{user.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Service</span><span className="bg-white/10 px-2 rounded uppercase text-[9px]">{vendor.serviceType}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl  p-4 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <Landmark size={16} className="text-primary" />
                    <h3 className="text-xs font-bold uppercase">Settlement</h3>
                  </div>
                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-3">
                    <p className="text-[9px] font-bold text-primary uppercase">Bank</p>
                    <p className="text-sm font-black leading-tight">{bankDetails?.bankName}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 font-medium">{bankDetails?.branchName}</p>
                  </div>
                  <a href={bankDetails?.proof.url} target="_blank" className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-border rounded-xl text-[10px] font-bold hover:bg-primary/5 transition-all">
                    <ExternalLink size={12} /> PROOF
                  </a>
                </div>

                <div className="rounded-2xl  p-4 shadow-sm space-y-3">
                  <div className="flex items-center gap-2"><Wifi size={16} className="text-primary" /><h3 className="text-xs font-bold uppercase">Amenities</h3></div>
                  <div className="flex flex-wrap gap-1.5">
                    {hotelDetails.amenities?.map((a: string) => (
                      <div key={a} className="text-[10px] font-bold bg-muted px-2 py-1 rounded-lg border border-border">{a}</div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

const ApproveCard = ({ id, VendorInfo }: { id: string, VendorInfo: any }) => {
  const { refetch } = usePropertyDetails(id);
  const { refetch: r } = useProperty();
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (type: 'approve' | 'reject') => {
    setIsLoading(true);
    try {
      const res = type === 'approve' ? await approveProperty(id) : await rejectProperty(id);
      if (res.success) { toast.success(`${type} successful`); refetch(); r(); }
    } catch (e) { toast.error("Action failed"); } finally { setIsLoading(false); setActionType(null); }
  };

  return (
    <div className="rounded-2xl p-4 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"><ShieldAlert size={18} className="text-amber-600" /></div>
        <h3 className="text-sm font-bold uppercase tracking-tight">Review Action</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <WarningDialog
          open={actionType === 'reject'} onOpenChange={(o) => !o && setActionType(null)} loading={isLoading}
          title="Reject?" description="Vendor will be notified." func={() => handleAction('reject')}
          trigger={
            <button onClick={() => setActionType('reject')} className="flex items-center gap-2 p-3 rounded-xl border border-red-100 bg-red-50/50 hover:bg-red-50 text-left transition-all active:scale-95">
              <ShieldAlert size={16} className="text-red-600" />
              <div><p className="text-[10px] font-black text-red-600 uppercase">Reject</p></div>
            </button>
          }
        />
        {VendorInfo?.status !== 'approved' && (
          <WarningDialog
            open={actionType === 'approve'} onOpenChange={(o) => !o && setActionType(null)} loading={isLoading}
            title="Approve?" description="Listing goes live." func={() => handleAction('approve')}
            trigger={
              <button onClick={() => setActionType('approve')} className="flex items-center gap-2 p-3 rounded-xl bg-emerald-600 text-white shadow-md active:scale-95 transition-all text-left">
                <CheckCircle2 size={16} />
                <div><p className="text-[10px] font-black uppercase">Approve</p></div>
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}

export default PropertyDetail;