import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  IconArrowRight,
  IconInfoCircle,
  IconTicket,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import { PaymentGatewaySelectionMobile } from "./PaymentGatewaySelection";

const OrderSummary = ({
  participant,
  priceSummary,
  orderId,
  selectedGateway,
  onPayment,
  formatAmount,
  gateways,
  onSelectGateway,
  isGroupRegistration = false,
  groupInfo = null,
}) => {
  return (
    <Card className="border-2 h-full gap-2 justify-between">
      <PaymentGatewaySelectionMobile
        gateways={gateways}
        selectedGateway={selectedGateway}
        onSelectGateway={onSelectGateway}
      />

      <CardHeader className="">
        <CardTitle className="text-base sm:text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <IconTicket className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">Ticket:</span>
            <span className="font-medium ml-auto">{participant?.ticket?.type}</span>
          </div>

          {isGroupRegistration && groupInfo && (
            <>
              <Separator />
              <div className="bg-primary/10 rounded-lg p-2.5 space-y-1">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="text-muted-foreground">Group:</span>
                  <span className="font-medium">{groupInfo?.groupName}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="text-muted-foreground">Members:</span>
                  <span className="font-medium">{groupInfo?.totalMembers}</span>
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="space-y-1.5 text-xs">
            {isGroupRegistration && (
              <div className="text-muted-foreground font-medium mb-1">
                Group Leader Details:
              </div>
            )}
            <div className="flex items-start gap-2">
              <IconMail className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
              <span className="break-all">{participant?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconPhone className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span>{participant?.phone}</span>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">Ticket Price</span>
            <span>{formatAmount(priceSummary?.ticketPrice)}</span>
          </div>

          {priceSummary?.discount > 0 && (
            <div className="flex justify-between text-xs sm:text-sm text-green-600">
              <span>Discount</span>
              <span>-{formatAmount(priceSummary?.discount)}</span>
            </div>
          )}

          <Separator className="my-2" />

          <div className="flex justify-between font-bold text-base sm:text-lg">
            <span>Total</span>
            <span className="text-primary">{formatAmount(priceSummary?.total)}</span>
          </div>
        </div>

        <Alert className="flex items-center border-info bg-info/20">
          <IconInfoCircle className="h-full w-full" />
          <AlertDescription className="text-xs leading-tight">
            <div className="font-mono sm:text-xs break-all">{orderId}</div>
          </AlertDescription>
        </Alert>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 p-4 sm:p-6 pt-0">
        <Button onClick={onPayment} disabled={!selectedGateway} className="w-full" size="lg">
          {selectedGateway ? (
            <>
              Pay {formatAmount(priceSummary.total)}
              <IconArrowRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            "Select Payment Method"
          )}
        </Button>

        <p className="text-[10px] sm:text-xs text-center text-muted-foreground leading-tight">
          By proceeding, you agree to our Terms
        </p>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
