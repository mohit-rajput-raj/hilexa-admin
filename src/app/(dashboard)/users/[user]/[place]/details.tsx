"use client";

import React from "react";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Calendar, 
  Globe, 
  CreditCard, 
  Hotel, 
  MapPin, 
  Star,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BookingDetail } from "./page";

export default function BookingDetailView({ data }: { data: BookingDetail }) {
  const { bookingInfo, service, pricing, payment, vendor } = data;

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="p-3 bg-background 0 min-h-screen space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        
        {/* LEFT COLUMN: Profile & Vendor */}
        <div className="md:col-span-3 space-y-3">
          {/* Profile Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Profile</CardTitle>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center space-y-2">
                <Avatar className="h-20 w-20 bg-purple-500">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-xl text-white">
                    {bookingInfo.primaryGuest.firstName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg capitalize">
                    {bookingInfo.primaryGuest.firstName} {bookingInfo.primaryGuest.lastName}
                  </h3>
                  <p className="text-xs text-muted-foreground">ID: {bookingInfo.bookingId.slice(-8).toUpperCase()}</p>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{bookingInfo.primaryGuest.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 overflow-hidden">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="truncate">{bookingInfo.primaryGuest.email}</span>
                </div>
              </div>

              <Separator />
              
              <div className="grid grid-cols-2 gap-4 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                <div>
                  <p>Gender</p>
                  <p className="text-foreground mt-1">Male</p>
                </div>
                <div>
                  <p>Nationality</p>
                  <p className="text-foreground mt-1">American</p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-100">Account Active</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Vendor</CardTitle>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Hotel className="h-4 w-4 text-primary" />
                <span className="font-bold text-sm">{vendor.businessName}</span>
              </div>
              <div className="text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className="h-5 text-[10px] bg-emerald-500">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">City:</span>
                  <span className="font-medium">{service.hotel.city}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CENTER COLUMN: Booking Info & Pricing */}
        <div className="md:col-span-6 space-y-3">
          {/* Main Booking Card */}
          <Card>
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-2">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Booking Confirmed
                  </Badge>
                  <CardTitle className="text-2xl font-black tracking-tight">
                    Booking ID: {bookingInfo.bookingReference}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">{formatDate(bookingInfo.createdAt)}</p>
                </div>
                <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Check-In</p>
                  <p className="font-bold">{formatDate(bookingInfo.checkIn)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Room Number</p>
                  <p className="font-bold">{bookingInfo.roomNumber || "TBA"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="font-bold">₹{pricing.pricePerNight} / night</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Guests</p>
                  <p className="font-bold">{bookingInfo.guests.adults} Adults, {bookingInfo.guests.children} Children</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-bold">{bookingInfo.nights} Nights</p>
                </div>
              </div>

              {bookingInfo.refund.refundStatus === "none" && (
                <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 flex items-center justify-between">
                   <div className="flex items-center gap-2 text-orange-800 text-xs font-medium">
                     <AlertCircle className="h-4 w-4" />
                     No Refund Requested
                   </div>
                   <Badge variant="outline" className="bg-white text-orange-600 border-orange-200">Standard Policy</Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing & Payment Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Price Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price per night</span>
                  <span>₹{pricing.pricePerNight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax amount</span>
                  <span>₹{pricing.taxAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cleaning Fee</span>
                  <span>₹{pricing.cleaningFee}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{pricing.totalAmount}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm">Payment</CardTitle>
                <Badge className="bg-emerald-500">{payment.status}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-[10px] space-y-1">
                  <p className="text-muted-foreground uppercase font-bold">Razorpay Order ID</p>
                  <p className="font-mono text-foreground break-all">{payment.razorpayOrderId}</p>
                </div>
                <div className="text-[10px] space-y-1">
                  <p className="text-muted-foreground uppercase font-bold">Transaction ID</p>
                  <p className="font-mono text-foreground break-all">{payment.razorpayPaymentId}</p>
                </div>
                <div className="pt-2">
                   <p className="text-xs font-bold text-orange-600">Pending Admin Approval</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* RIGHT COLUMN: Hotel Info */}
        <div className="md:col-span-3 space-y-3">
          <Card className="overflow-hidden">
            <div className="h-48 w-full relative">
              <img 
                src={service.hotel.image} 
                className="w-full h-full object-cover" 
                alt={service.hotel.name}
              />
            </div>
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-bold text-lg leading-tight">{service.hotel.name}</h3>
                <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="text-xs">{service.hotel.city}, India</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-3 w-3 ${i < 4 ? 'fill-orange-400 text-orange-400' : 'text-slate-300'}`} />
                ))}
                <span className="text-xs font-bold ml-1">{service.hotel.rating}</span>
                <span className="text-[10px] text-muted-foreground">({service.hotel.numReviews} Reviews)</span>
              </div>

              <div className="text-[11px] text-muted-foreground space-y-2">
                <div className="flex gap-2">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span>{service.hotel.address}</span>
                </div>
                <div className="flex gap-2">
                  <Mail className="h-3 w-3 shrink-0" />
                  <span className="truncate">omar.faris@oasis-retreats.com</span>
                </div>
              </div>

              <Button className="w-full bg-indigo-900 hover:bg-indigo-950">
                View Full Booking
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}