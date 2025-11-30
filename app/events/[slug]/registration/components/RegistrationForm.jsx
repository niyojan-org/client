import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DynamicField from "../../../components/DynamicField";
import GroupMultiStepForm from "../../../components/GroupMultiStepForm";
import TicketCardSelectable from "../../../components/TicketCardSelectable";
import CouponManager from "../../../components/CouponManager";
import useEventStore from "@/store/eventStore";

export default function RegistrationForm({
  registrationForm,
  selectedTicket,
  setSelectedTicket,
  formData,
  setFormData,
  groupName,
  setGroupName,
  submitting,
  onSubmitSingle,
  onSubmitGroup,
  slug,
  onCouponChange,
  couponDiscount,
  originalPrice,
  finalPrice,
}) {
  const allFields = [
    ...(registrationForm?.defaultFields || []),
    ...(registrationForm?.customFields || []),
  ];

  const { couponFinalPrice } = useEventStore();

  return (
    <Card className="shadow-md border border-border rounded-xl bg-card text-card-foreground mb-10">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">
          {registrationForm?.eventDetails?.title || "Register"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {registrationForm?.tickets?.map((t) => (
            <TicketCardSelectable
              key={t._id}
              ticketName={t.type}
              price={t.price}
              soldOut={t.soldOut}
              selected={selectedTicket?._id === t._id}
              onClick={() => setSelectedTicket(t)}
            />
          ))}
        </div>

        {/* INDIVIDUAL FORM */}
        {!selectedTicket || !selectedTicket.isGroupTicket ? (
          <form onSubmit={onSubmitSingle} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allFields.map((f) => (
                <DynamicField
                  key={f.name}
                  field={f}
                  value={formData[f.name] || ""}
                  onChange={(name, val) =>
                    setFormData((prev) => ({ ...prev, [name]: val }))
                  }
                />
              ))}

              {/* Coupon Manager */}
              <CouponManager
                slug={slug}
                selectedTicket={selectedTicket}
                onCouponChange={onCouponChange}
                allowCoupons={registrationForm?.allowCoupons}
                className={"sm:col-span-2 w-full"}
              />
            </div>

            {/* Terms notice */}
            <p className="text-sm text-gray-500 my-2">
              By proceeding, you agree to our{" "}
              <a  href="/terms-and-conditions" className="underline text-primary" target="_blank">
                T&C{" "}
              </a>
              ,{" "}
              <a href="/refund-policy" className="underline text-primary" target="_blank">
                Refund Policy
              </a>
              , and{" "}
              <a href="/delivery-policy" className="underline text-primary" target="_blank">
                Delivery Policy
              </a>
            </p>

            <Button
              type="submit"
              disabled={submitting || !selectedTicket}
              className="w-full rounded-full"
            >
              {submitting
                ? "Submitting..."
                : couponDiscount > 0
                ? `Pay ₹${originalPrice} → ₹${couponFinalPrice} after coupon`
                : selectedTicket
                ? `Submit & Pay ₹${originalPrice}`
                : "Please select a ticket"}
            </Button>
          </form>
        ) : (
          <GroupMultiStepForm
            allFields={allFields}
            groupSettings={selectedTicket.groupSettings}
            leaderData={formData}
            groupName={groupName}
            setGroupName={setGroupName}
            onSubmit={onSubmitGroup}
            slug={slug}
            selectedTicket={selectedTicket}
            couponManager={
              <CouponManager
                slug={slug}
                selectedTicket={selectedTicket}
                onCouponChange={onCouponChange}
                allowCoupons={registrationForm?.allowCoupons}
              />
            }
          />
        )}
      </CardContent>
    </Card>
  );
}
